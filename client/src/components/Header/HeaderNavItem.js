import React from 'react';
import PropTypes from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from '../../blocks/header/header.module.css';

export default function HeaderNavItem(props) {
  const { title, link, handleClick } = props;
  useStyles(styles);
  return (
    <button
      type="button"
      className={styles['header__nav-button']}
      onClick={handleClick}
      data-link={link}
    >
      {title}
    </button>
  );
}

HeaderNavItem.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};
