import React from 'react';
import PropTypes from 'prop-types';

export default function PortfolioArrow(props) {
  const { direction, handleArrowClick } = props;
  return (
    <div
      className={`home__arrow portfolio__arrow portfolio__arrow_${direction}`}
      id={direction}
      onClick={handleArrowClick}
      onKeyDown={() => {}}
      role="button"
      tabIndex={0}
      label={`${direction} arrow`}
    />
  );
}

PortfolioArrow.propTypes = {
  direction: PropTypes.oneOf(['forwards', 'backwards']).isRequired,
  handleArrowClick: PropTypes.func.isRequired,
};
