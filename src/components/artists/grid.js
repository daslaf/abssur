import { Breakpoints } from '../../utils/breakpoints';
import { getRandomItem, randomNumber } from '../../utils/random';

export const distribute = total => breakpoint => {
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

export const populateGrid = (distribution, elements) => {
  let remaining = [ ...elements ]; // Create shallow copy

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