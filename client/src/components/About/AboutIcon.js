import React from 'react';
import PropTypes from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from '../../blocks/about/about.module.css';

export default function AboutIcon(props) {
  const { title, text } = props;
  useStyles(styles);
  return (
    <div className={styles['about__icon-container']}>
      <h3 className={styles['about__icon-title']}>{title}</h3>
      <p className={styles['about__icon-brief']}>{text}</p>
    </div>
  );
}

AboutIcon.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
