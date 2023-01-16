import React from 'react';
import PropTypes from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from '../../blocks/portfolio/portfolio.module.css';

export default function PortfolioArrow(props) {
  const { direction, handleArrowClick } = props;
  useStyles(styles);
  return (
    <div
      className={`${styles['home__arrow portfolio__arrow']} ${
        styles[`portfolio__arrow_${direction}`]
      }`}
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
