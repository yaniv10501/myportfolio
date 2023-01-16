import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from '../../blocks/about/about.module.css';

export default function AboutText() {
  useStyles(styles);
  return (
    <div className={styles['about__text']}>
      <h2 className={styles['about__title']}>About me</h2>
      <p className={styles['about__brief']}>
        I am a Full-Stack Web Developer from Jerusalem, Israel.
        <br />I love programming, challenging myself and researching new fields.
        <br />
        Currently working at{' '}
        <a
          className={styles['about__brief_jika']}
          href="https://jika.io"
          target="_blank"
          rel="noreferrer"
        >
          Jika.io
        </a>
      </p>
    </div>
  );
}
