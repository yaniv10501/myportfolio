const getPortraitVh = () => {
  const vh = window.outerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

export default getPortraitVh;
