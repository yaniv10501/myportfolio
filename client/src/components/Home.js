/* eslint-disable no-param-reassign */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from '../blocks/home/home.module.css';
import { initParticles } from '../utils/particles';
import { useIsWebpSupport } from '../contexts/IsWebpSupportContext';
import homeBackgroundjpg from '../images/IMG_6334_edited_edited.jpg';
import homeBackground from '../images/IMG_6334_edited_edited.webp';
import FlexImg from './FlexImg';

function Home({ setIsPageLoading, setPageLoadText, setFontLoading }) {
  useStyles(styles);
  const isWebpSupport = useIsWebpSupport();
  const handleArrowClick = (event) => {
    const arrowElement = event.target;
    const animation = arrowElement.animate(
      [
        {
          transform: 'scale(1.1)',
        },
        {
          transform: 'scale(1)',
        },
        {
          transform: 'scale(1.1)',
        },
      ],
      { duration: 400, easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)' }
    );
    animation.play();
    const aboutElement = document.querySelector(`#about`);
    aboutElement.scrollIntoView({ behavior: 'smooth' });
  };
  // const handleMouseMove = (event) => {
  //   const {
  //     clientX,
  //     clientY,
  //     target: {
  //       parentElement: { scrollHeight, scrollWidth },
  //     },
  //   } = event;
  //   const x = clientX - 250;
  //   const y = clientY - 250;
  //   console.log(x, y, scrollHeight, scrollWidth);
  // };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('../utils/FontLoader').then(({ default: FontLoader }) => {
        const fontLoader = new FontLoader(
          ['NotoSerif'],
          {
            fontLoaded: () => {
              setFontLoading(false);
            },
            complete: (error) => {
              if (error !== null) {
                // Reached the timeout but not all fonts were loaded
                console.log(error.message);
                console.log(error.notLoadedFonts);
              }
            },
          },
          null
        );
        fontLoader.loadFonts();
      });
    }
    setIsPageLoading(true);
    setPageLoadText('Page Loading...');
    const loadingMessages = [
      'Page Loading...',
      'We are almost ready...',
      'Just a few more seconds...',
    ];
    let i = 0;
    const timer = setInterval(() => {
      setPageLoadText(loadingMessages[i]);
      if (i === loadingMessages.length - 1) {
        i = 1;
        return;
      }
      i += 1;
    }, 5000);
    let loadTime = 1000;
    document.documentElement.style.setProperty('--loadEm', `${loadTime / 100}em`);
    const timer2 = setInterval(() => {
      loadTime -= 1;
      document.documentElement.style.setProperty('--loadEm', `${loadTime / 100}em`);
    }, 10);
    const homeBackgroundUrl = isWebpSupport ? homeBackground : homeBackgroundjpg;
    const img = new Image();
    img.onload = () => {
      const showPage = () => {
        document.documentElement.style.setProperty('--loadEm', '0.1em');
        setIsPageLoading(false);
        setPageLoadText('');
        clearInterval(timer);
        clearInterval(timer2);
      };
      if (i === 0) setTimeout(showPage, 800);
      else showPage();
    };
    img.src = homeBackgroundUrl;
    initParticles();
  }, []);
  return (
    <section className={styles['home']} id="home">
      <div className={styles['home__background']}>
        <h1 className={styles['home__title']}>
          Hey, my name is Yaniv Schweitzer.
          <br />
          Welcome to my portfolio website.
        </h1>
        <FlexImg
          src={homeBackground}
          srcPng={homeBackgroundjpg}
          alt="home background"
          className={styles['home__background-image']}
          width={2000}
          height={1125}
        />
        <div
          className={styles['home__arrow']}
          onClick={handleArrowClick}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
          aria-label="home arrow"
        />
        <div className={styles['particles__container']} />
      </div>
    </section>
  );
}

Home.propTypes = {
  setIsPageLoading: PropTypes.func.isRequired,
  setPageLoadText: PropTypes.func.isRequired,
  setFontLoading: PropTypes.func.isRequired,
};

export default Home;
