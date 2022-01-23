/* eslint-disable no-param-reassign */
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import FontLoader from '../utils/FontLoader';
import { pop } from '../utils/pop';
import vectorA from '../images/Untitled.svg';

function Home({ setIsPageLoading, setPageLoadText, setFontLoading }) {
  const mouseRef = useRef();
  const mouseRef2 = useRef();
  const mouseRef3 = useRef();
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
    const aboutElement = document.querySelector('.about');
    aboutElement.scrollIntoView({ behavior: 'smooth' });
  };
  const handleMouseMove = (event) => {
    const mouseItem = mouseRef.current;
    const mouseItem2 = mouseRef2.current;
    const mouseItem3 = mouseRef3.current;
    const makeAnimation = (mouseElement) => {
      const animation = mouseElement.animate(
        [
          {
            transform: 'rotateZ(180deg)',
          },
          {
            transform: 'rotateZ(360deg)',
          },
        ],
        { duration: 400, easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)' }
      );
      animation.play();
    };
    makeAnimation(mouseItem);
    makeAnimation(mouseItem2);
    makeAnimation(mouseItem3);
    const {
      clientX,
      clientY,
      target: {
        parentElement: { scrollHeight, scrollWidth },
      },
    } = event;
    const x = clientX - 250;
    const y = clientY - 250;
    mouseItem.style.left = `${x}px`;
    mouseItem.style.top = `${y}px`;
    mouseItem2.style.left = `${x}px`;
    mouseItem2.style.top = `${y}px`;
    mouseItem3.style.left = `${x}px`;
    mouseItem3.style.top = `${y}px`;
    console.log(x, y, scrollHeight, scrollWidth);
  };
  useEffect(() => {
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
          } else {
            // All fonts were loaded
            console.log('all fonts were loaded');
          }
        },
      },
      null
    );
    fontLoader.loadFonts();
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
    const homeBackground = document.querySelector('.home__background');
    const homeBackgroundSrc = window.getComputedStyle(homeBackground, ':before').backgroundImage;
    const homeBackgroundUrl = homeBackgroundSrc.match(/https?:\/\/[\w\d.:/]+/)[0];
    const img = new Image();
    img.onload = () => {
      const showPage = () => {
        document.documentElement.style.setProperty('--loadEm', '0.1em');
        setIsPageLoading(false);
        setPageLoadText('');
        clearInterval(timer);
        clearInterval(timer2);
        fetch('/test', { credentials: 'include' }).then((res) => console.log(res));
      };
      if (i === 0) setTimeout(showPage, 800);
      else showPage();
    };
    img.src = homeBackgroundUrl;
  }, []);
  return (
    <section
      className="home"
      id="home"
      onClick={pop}
      onMouseMove={handleMouseMove}
      role="button"
      onKeyDown={() => {}}
      tabIndex={0}
    >
      <div className="home__background">
        <div
          ref={mouseRef}
          className="home__mouse-move"
          style={{
            position: 'absolute',
            height: '500px',
            width: '500px',
            backgroundImage: `url('${vectorA}')`,
            transition:
              'top 0.5s cubic-bezier(0.215, 0.610, 0.355, 1), left 0.5s cubic-bezier(0.215, 0.610, 0.355, 1)',
          }}
        />
        <div
          ref={mouseRef2}
          className="home__mouse-move"
          style={{
            position: 'absolute',
            height: '500px',
            width: '500px',
            backgroundImage: `url('${vectorA}')`,
            transition:
              'top 0.6s cubic-bezier(0.215, 0.610, 0.355, 1), left 0.6s cubic-bezier(0.215, 0.610, 0.355, 1)',
          }}
        />
        <div
          ref={mouseRef3}
          className="home__mouse-move"
          style={{
            position: 'absolute',
            height: '500px',
            width: '500px',
            backgroundImage: `url('${vectorA}')`,
            transition:
              'top 0.7s cubic-bezier(0.215, 0.610, 0.355, 1), left 0.7s cubic-bezier(0.215, 0.610, 0.355, 1)',
          }}
        />
        <h1 className="home__title">
          Hey, my name isYaniv Schweitzer,
          <br />
          Welcome to my portfolio Website.
        </h1>
        <div
          className="home__arrow"
          onClick={handleArrowClick}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
          label="down arrow"
        />
        <div className="particles__container" />
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
