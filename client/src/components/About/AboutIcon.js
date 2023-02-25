import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from '../../blocks/about/about.module.css';

export default function AboutIcon(props) {
  const { title, text } = props;
  useStyles(styles);
  const aboutIconRef = useRef();
  useEffect(() => {
    const hideAboutIconObserver = new IntersectionObserver((e) => {
      const [event] = e;
      if (!event.isIntersecting) {
        aboutIconRef.current.classList.remove(styles.animate);
        // eslint-disable-next-line no-use-before-define
        aboutIconObserver.observe(aboutIconRef.current);
      }
    });
    const aboutIconObserver = new IntersectionObserver(
      (e) => {
        const [event] = e;
        if (event.isIntersecting) {
          aboutIconRef.current.classList.add(styles.animate);
          aboutIconRef.current.classList.add(styles.animate);
          aboutIconObserver.disconnect();
          setTimeout(() => {
            hideAboutIconObserver.observe(aboutIconRef.current);
          }, 500);
        }
      },
      { threshold: 0.3 }
    );
    aboutIconObserver.observe(aboutIconRef.current);
  }, []);
  return (
    <div ref={aboutIconRef} className={styles['about__icon-container']}>
      <h3 className={styles['about__icon-title']}>{title}</h3>
      <p className={styles['about__icon-brief']}>{text}</p>
    </div>
  );
}

AboutIcon.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
