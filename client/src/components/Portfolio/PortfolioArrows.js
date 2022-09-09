import React from 'react';
import PortfolioArrow from './PortfolioArrow';

export default function PortfolioArrows() {
  const handleArrowClick = (event) => {
    const arrowElement = event.target;
    const animation = arrowElement.animate(
      [
        {
          transform: 'scale(0.7)',
        },
        {
          transform: 'scale(0.6)',
        },
        {
          transform: 'scale(0.7)',
        },
      ],
      { duration: 400, easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)' }
    );
    const portfolioElement = document.querySelector('.portfolio__showcase');
    const { scrollLeft } = portfolioElement;
    const portfolioScroll = portfolioElement.scrollWidth;
    switch (arrowElement.id) {
      case 'forwards':
        portfolioElement.scroll({
          top: 0,
          left: scrollLeft + portfolioScroll / 3,
          behavior: 'smooth',
        });
        break;
      case 'backwards':
        portfolioElement.scroll({
          top: 0,
          left: portfolioElement.scrollLeft - portfolioScroll / 3,
          behavior: 'smooth',
        });
        break;
      default:
        break;
    }
    animation.play();
  };
  return (
    <div className="portfolio__arrows">
      <PortfolioArrow direction="backwards" handleArrowClick={handleArrowClick} />
      <PortfolioArrow direction="forwards" handleArrowClick={handleArrowClick} />
    </div>
  );
}
