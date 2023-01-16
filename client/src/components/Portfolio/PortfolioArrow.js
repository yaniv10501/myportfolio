import React from 'react';
import PropTypes from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from '../../blocks/portfolio/portfolio.module.css';
import homeStyles from '../../blocks/home/home.module.css';

export default function PortfolioArrow(props) {
  const { direction, handleArrowClick } = props;
  useStyles(styles);
  return (
    <div
      className={`${homeStyles['home__arrow']} ${styles['portfolio__arrow']} ${
        styles[`portfolio__arrow_${direction}`]
      }`}
      id={direction}
      onClick={handleArrowClick}
      onKeyDown={() => {}}
      role="button"
      tabIndex={0}
      aria-label={`${direction} arrow`}
    />
  );
}

PortfolioArrow.propTypes = {
  direction: PropTypes.oneOf(['forwards', 'backwards']).isRequired,
  handleArrowClick: PropTypes.func.isRequired,
};
