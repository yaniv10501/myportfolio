/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from '../../blocks/portfolio/portfolio.module.css';

export default function PortfolioShowcaseItemDetails(props) {
  const { details } = props;
  useStyles(styles);
  return (
    <div className={styles['portfolio__showcase-item-details']}>
      <p className={styles['portfolio__showcase-item-details-text']}>{details}</p>
    </div>
  );
}

PortfolioShowcaseItemDetails.propTypes = {
  details: PropTypes.string.isRequired,
};
