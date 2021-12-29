import { createPop, createBlackHole } from './particles';

const checkEvent = (event, amount) => {
  const { top } = event.target.getBoundingClientRect();
  if (top !== 0) return;
  if (event.target.className.includes('home__nav-about')) return;
  createPop(event.clientX, event.clientY, amount);
};

const pop = (event) => checkEvent(event, 10);

// const blackHole = document.querySelector('.home__nav-about');

const popMore = (event, blackHoleActive) =>
  createBlackHole(event.clientX, event.clientY, blackHoleActive);

export { pop, popMore };
