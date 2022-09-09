/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import AboutKnowledgeItems from './AboutKnowledgeItems';
import AboutKnowledgeWidget from './AboutKnowledgeWidget';

export default function AboutKnowledge() {
  return (
    <div className="about__knowledge">
      <AboutKnowledgeWidget />
      <AboutKnowledgeItems />
    </div>
  );
}
