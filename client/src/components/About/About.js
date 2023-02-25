import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import AboutIcons from './AboutIcons';
import AboutText from './AboutText';
import styles from '../../blocks/about/about.module.css';
import AboutKnowledge from './AboutKnowledge';

function About() {
  useStyles(styles);
  return (
    <section className={styles['about']} id="about">
      <AboutText />
      <AboutIcons />
      <AboutKnowledge />
    </section>
  );
}

export default About;
