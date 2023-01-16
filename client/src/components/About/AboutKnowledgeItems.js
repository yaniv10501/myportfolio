import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from '../../blocks/about/about.module.css';
import AboutKnowledgeItem from './AboutKnowledgeItem';

const items = [
  {
    position: 'top',
    title: 'Git',
  },
  {
    position: 'above',
    title: 'Python',
  },
  {
    position: 'up',
    title: 'CI/CD',
  },
  {
    position: 'current',
    title: 'React',
  },
  {
    position: 'down',
    title: 'NodeJS',
  },
  {
    position: 'below',
    title: 'Express',
  },
  {
    position: 'bottom',
    title: 'ES5/ES6',
  },
];

export default function AboutKnowledgeItems() {
  useStyles(styles);
  return (
    <div className={styles['about__knowledge-items']}>
      {items.map(({ position, title }) => (
        <AboutKnowledgeItem key={title} title={title} position={position} />
      ))}
    </div>
  );
}
