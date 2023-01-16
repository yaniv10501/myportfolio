/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from '../../blocks/about/about.module.css';
import AboutKnowledgeItems from './AboutKnowledgeItems';
import AboutKnowledgeWidget from './AboutKnowledgeWidget';

export default function AboutKnowledge() {
  useStyles(styles);
  return (
    <div className={styles['about__knowledge']}>
      <AboutKnowledgeWidget />
      <AboutKnowledgeItems />
    </div>
  );
}
