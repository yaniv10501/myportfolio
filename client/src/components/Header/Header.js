import React, { useEffect } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from '../../blocks/header/header.module.css';
import homeStyles from '../../blocks/home/home.module.css';
import pageStyles from '../../blocks/page/page.module.css';
import HeaderNav from './HeaderNav';

function Header() {
  useStyles(styles, pageStyles, homeStyles);
  const handleScroll = () => {
    const homeElement = document.querySelector(`.${homeStyles['home']}`);
    const navElement = document.querySelector(`.${styles['header__nav']}`);
    const mainElement = document.querySelector(`.${pageStyles['main']}`);
    const { top, height } = navElement.getBoundingClientRect();
    const mainPosition = mainElement.getBoundingClientRect();
    if (top <= 0) {
      navElement.style.position = 'fixed';
      navElement.style.top = '0';
      navElement.style.left = '0';
      mainElement.style.top = `${height}px`;
      homeElement.style.visibility = 'hidden';
    }
    if (navElement.style.position === 'fixed' && mainPosition.top >= height) {
      navElement.style.position = 'relative';
      mainElement.style.top = '0';
      homeElement.style.visibility = 'visible';
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <header className={styles['header']}>
      <HeaderNav />
    </header>
  );
}

export default Header;
