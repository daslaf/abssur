export const randomNumber = (x, y = 0) => Math.round(Math.random() * x + y);

export const getRandomItem = (list, weight) => {
  const totalWeight = weight.reduce((prev, cur) => prev + cur);
  const randomNum = randomNumber(totalWeight);

  let weightSum = 0;

  for (let i = 0; i < list.length; i++) {
    weightSum += weight[i];
    weightSum = +weightSum.toFixed(2);

    if (randomNum <= weightSum) {
      return list[i];
    }
  }
};
