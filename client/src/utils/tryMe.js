import { popMore } from './pop';

const tryMe = (event) => {
  const button = event.target;
  const scaleRand = 1.2 + (Math.random() / 2 + 0.5);
  button.animate(
    [
      {
        opacity: 1,
      },
      {
        transform: `scale(${scaleRand})`,
        opacity: 0,
      },
    ],
    {
      duration: 2 * 1000,
      easing: 'cubic-bezier(0, .9, .2, .1)',
      delay: Math.random() * 200,
    }
  );

  setTimeout(() => popMore(event), 500);
};

export default tryMe;
