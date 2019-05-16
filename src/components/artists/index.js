import { h, Component } from 'preact';
import debounce from 'lodash/debounce';
import { Link } from 'preact-router/match';

import Artist from '../artist';
import css from './style';

import { getBreakpoint, Breakpoints } from '../../utils/breakpoints';
import { distribute, populateGrid } from './grid';

import Translations from '../../context/translations';

class Artists extends Component {
  redrawGrid = () => {
    const { currentBreakpoint, memoizedDistribution } = this.state;
    const { artists } = this.props;

    const contents = [
      ...artists,
      { __type__: 'LOGO' },
      { __type__: 'NAV' }
    ];

    const breakpoint = getBreakpoint();

    if (breakpoint !== currentBreakpoint) {
      const cached = memoizedDistribution[breakpoint];

      const sorted = cached || distribute(contents.length)(breakpoint);
      const populated = populateGrid(sorted, contents);

      const memo = !cached
        ? {
          memoizedDistribution: {
            ...memoizedDistribution,
            [breakpoint]: sorted
          }
        }
        : {};
  
      this.setState({
        currentBreakpoint: breakpoint,
        populated,
        ...memo
      });
    }
  }

  delayedCallback = debounce(this.redrawGrid, 500);

  constructor(props) {
    super(props);
    
    const contents = [
      ...props.artists,
      { __type__: 'LOGO' },
      { __type__: 'NAV' }
    ];

    const currentBreakpoint = getBreakpoint();
    const memoizedDistribution = Object.keys(Breakpoints).reduce((acc, key) => {
      const value = key === currentBreakpoint
        ? distribute(contents.length)(key)
        : null;

      return {
        ...acc,
        [key]: value
      };
    }, {});

    const populated = populateGrid(
      memoizedDistribution[currentBreakpoint],
      contents
    );

    this.state = {
      currentBreakpoint,
      memoizedDistribution,
      populated
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.delayedCallback);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.delayedCallback);
  }

  renderItem = (item) => {
    if (!item) {
      return null;
    }

    if (item.__type__ === 'LOGO') {
      return (
        <Logo />
      );
    }

    if (item.__type__ === 'NAV') {
      return (
        <Nav />
      );
    }

    return (
      <Artist
        {...item}
      />
    );
  }

  render(props, { populated }) {
    return (
      <div class={css.matrix}>
        {populated.map((item, i) => (
          <div
            key={'row-' + i}
            class={css.matrixRow}
          >
            {item.map((item, j) => (
              <div
                key={'artist-' + j}
                class={css.matrixItem}
              >
                <div class={css.matrixItemContent}>
                  {this.renderItem(item)}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Artists;

const Logo = () => (
  <div class={css.logo}>
    <span>S</span>ur.
  </div>
);

const Nav = () => (
  <Translations.Consumer>
    {tokens => (
      <nav class={css.nav}>
        <a class={css.link} href="/expo">{tokens.NAV_GALLERY}</a>
        <a class={css.link} href="/about">{tokens.NAV_TEAM}</a>
      </nav>
    )}
  </Translations.Consumer>
);
