import { h, Component } from 'preact';
import debounce from 'lodash/debounce';
import css from './style';

import Artist from '../artist';

import { getBreakpoint, Breakpoints } from '../../utils/breakpoints';
import { distribute, populateGrid } from './grid';

import Translations from '../../context/translations';

const items = [
  { __type__: 'ABSTRACCION' },
  { __type__: 'SUR' },
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

    if (item.__type__ === 'ABSTRACCION') {
      return (
        <Abstraction />
      );
    }

    if (item.__type__ === 'SUR') {
      return (
        <South />
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

const Abstraction = () => (
  <div class={css.abstraction}>
    <span
      class="glitch"
      data-text="Abstracción"
    >
      Abstracción
    </span>
  </div>
);

const South = () => (
  <div class={css.south}>
    <span>S</span>
    <span>ur</span>
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
