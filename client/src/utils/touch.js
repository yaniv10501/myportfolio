import $ from 'jquery';

const handleTouchStart = (event, callback) => {
  const touches = event.touches[0] || event.changedTouches[0];
  const $div = $(event.target);
  const offset = $div.offset();
  const x = touches.pageX - offset.left;
  const y = touches.pageY - offset.top;
  callback({ target: event.target, offsetX: x, offsetY: y });
};

const handleTouchEnd = (event) => {
  const portfolioControlElement =
    document.querySelector(`.portfolio__showcase-item_${event.target.id.toLowerCase()}`) ||
    event.target;
  if (!portfolioControlElement || !portfolioControlElement.style) return;
  portfolioControlElement.style.transform = 'rotateY(20deg) translate3d(0, 0, -200px)';
  portfolioControlElement.style.zIndex = 0;
};

export { handleTouchStart, handleTouchEnd };
