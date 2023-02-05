import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from '../../blocks/portfolio/portfolio.module.css';
import PortfolioArrow from './PortfolioArrow';

export default function PortfolioArrows() {
  useStyles(styles);
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
    const portfolioElement = document.querySelector(`.${styles['portfolio__showcase']}`);
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
    <div className={styles['portfolio__arrows']}>
      <PortfolioArrow direction="backwards" handleArrowClick={handleArrowClick} />
      <PortfolioArrow direction="forwards" handleArrowClick={handleArrowClick} />
    </div>
  );
}
