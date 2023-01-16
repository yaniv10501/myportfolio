/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from '../blocks/page/page.module.css';
import Home from './Home';
import Header from './Header/Header';
import About from './About/About';
import Portfolio from './Portfolio/Portfolio';
import Contact from './Contact';
import Footer from './Footer';
import getPortraitVh from '../utils/costumVh';
import isWebpSupport from '../utils/isWebpSupport';
import { IsWebpSupportProvider } from '../contexts/IsWebpSupportContext';
import { ThemeContextProvider } from '../contexts/ThemeContext';

function App() {
  useStyles(styles);
  const isWebpSupportDevice = useMemo(() => isWebpSupport(), []);

  const [fontLoading, setFontLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [pageLoadText, setPageLoadText] = useState('');

  useEffect(() => {
    smoothscroll.polyfill();
    getPortraitVh();
    window.addEventListener('resize', getPortraitVh);
    window.addEventListener('orientationchange', getPortraitVh);
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (event) => {
        event.preventDefault();

        const scrollToElement = document.querySelector(event.target.getAttribute('href'));
        scrollToElement.scrollIntoView({
          behavior: 'smooth',
        });
      });
    });
  }, []);

  const initialMount = useRef(true);

  const [theme, setTheme] = useState('light');
  const handleSetTheme = useCallback(() => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, [theme]);
  useEffect(() => {
    if (!initialMount.current) {
      const currentPrimary = document.documentElement.style.getPropertyValue('--primaryColor');
      const currentSecondary = document.documentElement.style.getPropertyValue('--secondaryColor');
      document.documentElement.style.setProperty('--primaryColor', currentSecondary);
      document.documentElement.style.setProperty('--secondaryColor', currentPrimary);
    } else {
      document.documentElement.style.setProperty('--primaryColor', '#f4f5f4');
      document.documentElement.style.setProperty('--secondaryColor', '#080708');
      initialMount.current = false;
    }
  }, [theme]);
  return (
    <ThemeContextProvider
      value={useMemo(() => ({ theme, handleSetTheme }), [theme, handleSetTheme])}
    >
      <IsWebpSupportProvider value={isWebpSupportDevice}>
        <div
          className={fontLoading ? `${styles['page']} ${styles['page_hidden']}` : styles['page']}
        >
          <div
            className={
              isPageLoading
                ? styles['page-spinner']
                : `${styles['page-spinner']} ${styles['page-spinner_hidden']}`
            }
          >
            <div className={styles['page-spinner__container']}>
              <i />
            </div>
            <p className={styles['page-spinner__text']}>{pageLoadText}</p>
          </div>
          <div
            className={
              isPageLoading ? `${styles['content']} ${styles['content_hidden']}` : styles['content']
            }
          >
            <Home
              setIsPageLoading={setIsPageLoading}
              setPageLoadText={setPageLoadText}
              setFontLoading={setFontLoading}
            />
            <main className={styles['main']}>
              <Header />
              <About />
              <Portfolio />
              <Contact />
              <Footer />
            </main>
          </div>
        </div>
      </IsWebpSupportProvider>
    </ThemeContextProvider>
  );
}

export default App;
