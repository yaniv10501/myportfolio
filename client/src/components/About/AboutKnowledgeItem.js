import React from 'react';
import PropTypes from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from '../../blocks/about/about.module.css';

export default function AboutKnowledgeItem(props) {
  const { position, title } = props;
  useStyles(styles);
  return (
    <p
      className={`${styles['about__knowledge-item']} ${
        styles[`about__knowledge-item_${position}`]
      }`}
    >
      {title}
    </p>
  );
}

AboutKnowledgeItem.propTypes = {
  position: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
