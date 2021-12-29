const createParticle = (size, options) => {
  const { color = '50%' } = options;
  const particle = document.createElement('particle');
  document.querySelector('.particles__container').appendChild(particle);
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.background = `hsl(${Math.random() * 5 + 180}, ${color}, ${
    options.extra === 'white' ? 100 - Math.random() * 20 : Math.random() * 100
  }%)`;
  particle.style.boxShadow = `0 0 5px 5px ${particle.style.background}`;
  return particle;
};

const randomAnimate = (particle) => {
  const x = Math.floor(Math.random() * window.innerWidth);
  const y = Math.floor(Math.random() * window.innerHeight);

  return particle.animate(
    [
      {
        transform: `translate(${x + 50}px, ${y - 1000}px)`,
        opacity: 1,
      },
      {
        transform: `translate(${x - 150}px, ${y + 250}px)`,
        opacity: 0,
      },
    ],
    {
      duration: Math.random() * 8000 + Math.random() * 7000,
      easing: 'cubic-bezier(0, .9, .57, 1)',
      delay: Math.random() * 200,
    }
  );
};
const animateParticle = (i) => {
  const size = Math.floor(Math.random() * 10 + 5);
  const particle = createParticle(size, { color: '10%', extra: 'white' });

  const animation = randomAnimate(particle);

  animation.onfinish = () => {
    particle.remove();
    animateParticle(i);
  };
};
const initParticles = () => {
  for (let i = 0; i < 50; i += 1) {
    animateParticle(i);
  }
};

const createPop = (x, y, amount) => {
  for (let i = 0; i < amount; i += 1) {
    const size = Math.floor(Math.random() * amount + 5);

    const particle = createParticle(size, { color: '50%' });

    const destinationX = x + (Math.random() - 0.5) * 20 * 50;
    const destinationY = y + (Math.random() - 0.5) * 20 * 50;

    const animation = particle.animate(
      [
        {
          transform: `translate(${x}px, ${y}px)`,
          opacity: 1,
        },
        {
          transform: `translate(${destinationX}px, ${destinationY}px)`,
          opacity: 0,
        },
      ],
      {
        duration: Math.random() * 5000 + Math.random() * 1000,
        easing: 'cubic-bezier(0, .9, .57, 1)',
        delay: Math.random() * 200,
      }
    );

    animation.onfinish = () => particle.remove();
  }
};

const createBlackHole = (x, y) => {
  for (let i = 0; i < 100; i += 1) {
    const size = Math.floor(Math.random() * 35 + 5);

    const particle = createParticle(size, { color: '20%' });

    const creationX = x + (Math.random() - 0.5) * 40 * 75;
    const creationY = y + (Math.random() - 0.5) * 40 * 75;

    const animation = particle.animate(
      [
        {
          transform: `translate(${creationX}px, ${creationY}px)`,
          opacity: 1,
        },
        {
          transform: `translate(${x}px, ${y}px)`,
          opacity: 0,
        },
      ],
      {
        duration: Math.random() * 500 + Math.random() * 1000,
        easing: 'cubic-bezier(.62, .4, .37, .1)',
        delay: Math.random() * 200,
      }
    );

    animation.onfinish = () => particle.remove();
  }
};

export { createPop, createBlackHole, initParticles };
