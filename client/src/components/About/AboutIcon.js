import React from 'react';
import PropTypes from 'prop-types';

export default function AboutIcon(props) {
  const { title, text } = props;
  return (
    <div className="about__icon-container">
      <h3 className="about__icon-title">{title}</h3>
      <p className="about__icon-brief">{text}</p>
    </div>
  );
}

AboutIcon.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
