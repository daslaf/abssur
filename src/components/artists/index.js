import { h, Component } from 'preact';
import debounce from 'lodash/debounce';
import css from './style';

import Artist from '../artist';

import { getBreakpoint, Breakpoints } from '../../utils/breakpoints';
import { distribute, populateGrid } from './grid';

import Translations from '../../context/translations';

const items = [
  { __type__: 'LOGO' },
  { __type__: 'NAV' }
];

class Artists extends Component {
  state = {
    currentBreakpoint: null,
    memoizedDistribution: {},
    populated: []
  };

  drawGrid = () => {
    const contents = [
      ...this.props.artists,
      ...items
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

    this.setState({
      currentBreakpoint,
      memoizedDistribution,
      populated
    });
  }

  redrawGrid = () => {
    const { currentBreakpoint, memoizedDistribution } = this.state;
    const { artists } = this.props;

    const contents = [
      ...artists,
      ...items
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

  componentDidMount() {
    window.addEventListener('resize', this.delayedCallback);

    this.drawGrid();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.artists.length !== this.props.artists.length) {
      this.drawGrid();
    }
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

const divStyle = {
  backgroundImage: 'url(assets/img/logo-white.png)'
};

const Logo = () => (
  <div class={css.abstraction}>
    <div style={divStyle}>
      <img
        src="assets/img/logo-white-yellow.png"
        alt="Logo Abstracción Sur"
      />
    </div>
  </div>
);

const Nav = () => (
  <Translations.Consumer>
    {tokens => (
      <nav class={css.nav}>
        <a class={css.link} href="/expo">
          <span
            class={css.glitch}
            data-text={tokens.NAV_GALLERY}
          >
            {tokens.NAV_GALLERY}
          </span>
        </a>
        <a class={css.link} href="/about">
          <span
            class={css.glitch}
            data-text={tokens.NAV_TEAM}
          >
            {tokens.NAV_TEAM}
          </span>
        </a>
      </nav>
    )}
  </Translations.Consumer>
);
