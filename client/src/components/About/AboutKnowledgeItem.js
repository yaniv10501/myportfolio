import React from 'react';
import PropTypes from 'prop-types';

export default function AboutKnowledgeItem(props) {
  const { position, title } = props;
  return <p className={`about__knowledge-item about__knowledge-item_${position}`}>{title}</p>;
}

AboutKnowledgeItem.propTypes = {
  position: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
