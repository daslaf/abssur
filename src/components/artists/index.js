import { h, Component } from 'preact';
import debounce from 'lodash/debounce';

import Artist from '../artist';
import css from './style';

import { getBreakpoint, Breakpoints } from '../../utils/breakpoints';
import { randomNumber, getRandomItem } from '../../utils/random';

class Artists extends Component {
  handleMouseEnter = id => (e) => {
    this.setState({ active: id });
  }
  
  handleMouseLeave = (e) => {
    this.setState({ active: null });
  }

  redrawGrid = () => {
    const { currentBreakpoint, memoizedDistribution } = this.state;
    const { artists } = this.props;

    const breakpoint = getBreakpoint();

    if (breakpoint !== currentBreakpoint) {
      const cached = memoizedDistribution[breakpoint];

      const sorted = cached || distribute(artists.length)(breakpoint);
      const populated = populateGrid(sorted, artists);

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
    
    const { artists } = props;

    const currentBreakpoint = getBreakpoint();
    const memoizedDistribution = Object.keys(Breakpoints).reduce((acc, key) => {
      const value = key === currentBreakpoint
        ? distribute(artists.length)(key)
        : null;

      return {
        ...acc,
        [key]: value
      };
    }, {});

    const populated = populateGrid(memoizedDistribution[currentBreakpoint], artists);

    this.state = {
      active: null,
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

  render(props, { active, populated }) {
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
                  {item && (
                    <Artist
                      active={active}
                      onMouseEnter={this.handleMouseEnter(item.id)}
                      onMouseLeave={this.handleMouseLeave}
                      {...item}
                    />
                  )}
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

const distribute = total => breakpoint => {
  const distributer = getGridMatrix(total);

  switch (breakpoint) {
  case Breakpoints.Small:
    return distributer(2);
  case Breakpoints.Medium:
    return distributer(3);
  case Breakpoints.Large:
    return distributer(4);
  default:
    return [];
  }
};

const populateGrid = (distribution, elements) => {
  let remaining = [ ...elements ];

  return distribution.map(row => row.map(item => {
    if (!item) {
      return item;
    }

    const selected = randomNumber(remaining.length - 1);
    const element = remaining[selected];

    remaining = [
      ...remaining.slice(0, selected),
      ...remaining.slice(selected + 1)
    ];

    return element;
  }));
};

const getGridMatrix = total => cols => {
  let grid = [];
  let left = total;

  while (left > 0) {
    const row = getRow(left, cols);
    const used = row.filter(i => i).length;

    grid = [
      ...grid,
      row
    ];

    left = left - used;
  }

  return grid;
};

const getRow = (left, cols) => {
  const items = Array(Math.min(left, cols)).fill('x').map((v, index) => index + 1);
  const weight = items.map(v => Math.random());

  const chosen = getRandomItem(items, weight);
  
  let blank = cols - chosen;
  let row = Array(cols).fill('x');

  while (blank > 0) {
    const index = randomNumber(cols);

    if (row[index] !== 'x') {
      continue;
    }

    row[index] = null;
    blank -= 1;
  }

  return row;
};
