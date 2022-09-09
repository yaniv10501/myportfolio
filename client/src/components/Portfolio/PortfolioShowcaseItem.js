/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function PortfolioShowcaseItem(props) {
  const {
    name,
    handlePortfolioItemClick,
    handlePortfolioItemTouchStart,
    handlePortfolioItemTouchMove,
    handlePortfolioItemTouchEnd,
  } = props;
  const [isClicked, setIsClicked] = useState(false);
  const onClick = (event) => {
    setIsClicked(handlePortfolioItemClick(event));
  };
  return (
    <div
      className={`portfolio__showcase-item portfolio__showcase-item_${name}`}
      onClick={onClick}
      onTouchStart={handlePortfolioItemTouchStart}
      onTouchMove={handlePortfolioItemTouchMove}
      onTouchEnd={handlePortfolioItemTouchEnd}
      onKeyDown={() => {}}
      role="button"
      tabIndex={0}
    >
      {isClicked && (
        <>
          <div className="portfolio__showcase-item-details">
            <p className="portfolio__showcase-item-details-text">Frontend - React</p>
          </div>
          <div className="portfolio__showcase-item-details">
            <p className="portfolio__showcase-item-details-text">Backend - NodeJS</p>
          </div>
          <div className="portfolio__showcase-item-details">
            <p className="portfolio__showcase-item-details-text">Server - Nginx</p>
          </div>
          <div className="portfolio__showcase-item-details">
            <p className="portfolio__showcase-item-details-text">DB - Mongo</p>
          </div>
          <div className="portfolio__showcase-item-details">
            <p className="portfolio__showcase-item-details-text">CI/CD - Node Worker</p>
          </div>
          <div className="portfolio__showcase-item-go">
            <h3 className="portfolio__showcase-item-go-text">Go to Website</h3>
          </div>
        </>
      )}
    </div>
  );
}

PortfolioShowcaseItem.propTypes = {
  name: PropTypes.string.isRequired,
  handlePortfolioItemClick: PropTypes.func.isRequired,
  handlePortfolioItemTouchStart: PropTypes.func.isRequired,
  handlePortfolioItemTouchMove: PropTypes.func.isRequired,
  handlePortfolioItemTouchEnd: PropTypes.func.isRequired,
};
