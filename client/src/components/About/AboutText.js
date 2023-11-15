import React, { useEffect, useRef } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from '../../blocks/about/about.module.css';

const range = 5230 - 350;

export default function AboutText() {
  useStyles(styles);
  const titleWrapperRef = useRef();
  const textWrapperRef = useRef();
  useEffect(() => {
    const eventListener = () => {
      const { scrollY } = window;
      if (scrollY > 350 && scrollY < 5230) {
        let value = (1 / range) * (5230 - scrollY);
        if (value > 1) {
          value = 1;
        }
        if (value < 0.45) {
          value = 0.45;
        }
        titleWrapperRef.current.style.transform = `scale(${value},${value})`;
        value = 600 - ((value - 0.45) / 0.55) * 500 + 50;
        if (window.innerWidth < 625 && value > 290) {
          value = 290;
        }
        titleWrapperRef.current.style.top = `${value}px`;
        titleWrapperRef.current.children[0].style.top = `${value}px`;
      }
    };
    const titleObserver = new IntersectionObserver((e) => {
      const [event] = e;
      if (event.isIntersecting) {
        window.addEventListener('scroll', eventListener);
      } else {
        window.removeEventListener('scroll', eventListener);
      }
    });
    titleObserver.observe(titleWrapperRef.current);
    const hideTextObserver = new IntersectionObserver((e) => {
      const [event] = e;
      if (!event.isIntersecting) {
        [...textWrapperRef.current.children].forEach((kid) => {
          kid.classList.remove(styles.animate);
          // eslint-disable-next-line no-use-before-define
          textObserver.observe(textWrapperRef.current);
        });
      }
    });
    const textObserver = new IntersectionObserver(
      (e) => {
        const [event] = e;
        if (event.isIntersecting) {
          [...textWrapperRef.current.children].forEach((kid, index) => {
            setTimeout(() => {
              kid.classList.add(styles.animate);
            }, 150 * (index + 1));
          });
          textWrapperRef.current.classList.add(styles.animate);
          textObserver.disconnect();
          setTimeout(() => {
            hideTextObserver.observe(textWrapperRef.current);
          }, 500);
        }
      },
      { threshold: 0.3 }
    );
    textObserver.observe(textWrapperRef.current);
  }, []);
  return (
    <div className={styles['about__text']}>
      <div ref={titleWrapperRef} className={styles['about__title-wrapper']}>
        <h2 className={styles['about__title']}>About me</h2>
      </div>
      <div ref={textWrapperRef} className={styles['about__brief']}>
        <p>I am a Full-Stack Web Developer from Jerusalem, Israel.</p>
        <p>I love programming, challenging myself and researching new fields.</p>
        <p>
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
    </div>
  );
}
