import React from 'react';
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
  return (
    <div className="about__knowledge-items">
      {items.map(({ position, title }) => (
        <AboutKnowledgeItem key={title} title={title} position={position} />
      ))}
    </div>
  );
}
