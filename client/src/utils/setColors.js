/* eslint-disable no-param-reassign */
const setRandomColors = (itemUp, itemDown) => {
  const randomNums = [Math.random(), Math.random()];
  if (randomNums[0] >= randomNums[1]) {
    itemUp.style.background = `hsl(${randomNums[0] * 1.5 * 7 * 25}, 5%, ${
      (randomNums[1] / 2) * 15 + 10
    }%)`;
    itemDown.style.background = `hsl(${(randomNums[0] / 3) * 7 * 25}, 5%, ${
      randomNums[1] * 1.5 * 10 + 10
    }%)`;
  }
  if (randomNums[1] > randomNums[0]) {
    itemUp.style.background = `hsl(${(randomNums[0] / 3) * 7 * 25}, 5%, ${
      randomNums[1] * 1.5 * 10 + 10
    }%)`;
    itemDown.style.background = `hsl(${randomNums[0] * 1.5 * 7 * 25}, 5%, ${
      (randomNums[1] / 2) * 15 + 10
    }%)`;
  }
};

const setColor = (color, upItem, downItem) => {
  upItem.style.background = color;
  downItem.style.background = color;
};

export { setRandomColors, setColor };
