import React from 'react';
import PropTypes from 'prop-types';

export default function HeaderNavItem(props) {
  const { title, link } = props;
  return (
    <a className="header__nav-button" href={link}>
      {title}
    </a>
  );
}

HeaderNavItem.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};
