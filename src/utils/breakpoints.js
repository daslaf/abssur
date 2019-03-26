import flatten from 'lodash/flatten';

const Breakpoints = {
  Small: 'Small',
  Medium: 'Medium',
  Large: 'Large'
};

const Range = [
  [Breakpoints.Small, 0, 576],
  [Breakpoints.Medium, 577, 1200],
  [Breakpoints.Large, 1201]
];

const getBreakpoint = () => {
  const [ breakpoint ] = flatten(
    Range.filter(([ b, ...boundaries ]) => getRange(...boundaries))
  );

  return breakpoint;
};

const getRange = (min = 0, max) => {
  const queryString = max
    ? `(min-width: ${min}px) and (max-width: ${max}px)`
    : `(min-width: ${min}px)`;

  const { matches } = window.matchMedia(queryString);

  return matches;
};

export { getBreakpoint, Breakpoints };