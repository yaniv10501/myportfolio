import React, { useEffect, useMemo, useState } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from '../../blocks/header/header.module.css';
import { useThemeContext } from '../../contexts/ThemeContext';
import lightTheme from '../../images/light.svg';
import darkTheme from '../../images/dark.svg';
import HeaderNavItem from './HeaderNavItem';
import useWindowDimensions from '../../utils/useWindowDimensions';

const items = [
  {
    title: 'Home',
    link: '#home',
  },
  {
    title: 'About',
    link: '#about',
  },
  {
    title: 'Portfolio',
    link: '#portfolio',
  },
  {
    title: 'Contact',
    link: '#contact',
  },
];

export default function HeaderNav() {
  useStyles(styles);
  const { theme, handleSetTheme } = useThemeContext();
  const { windowWidth } = useWindowDimensions();
  const [menuTo, setMenuTo] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuIconClick = () => setIsMenuOpen((menuOpenState) => !menuOpenState);
  const setTheme = (event) => {
    const onAnimationEnd = () => {
      event.target.children[0].classList.remove(styles['animation']);
      event.target.children[0].removeEventListener('animationend', onAnimationEnd);
    };
    event.target.children[0].addEventListener('animationend', onAnimationEnd);
    event.target.children[0].classList.add(styles['animation']);
    setTimeout(() => handleSetTheme(event), 50);
  };
  const themeIconSrc = useMemo(() => (theme === 'light' ? lightTheme : darkTheme), [theme]);
  const handleHeaderItemClick = (event) => {
    event.preventDefault();
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    setMenuTo(event.target.dataset.link);
  };
  useEffect(() => {
    if (!isMenuOpen && menuTo) {
      setTimeout(() => {
        const target = document.querySelector(menuTo.match(/#[\w]*/)[0]);
        const rect = target.getBoundingClientRect();
        window.scrollTo({ top: rect.top + window.scrollY - 80, behavior: 'smooth' });
        setMenuTo('');
      }, 150);
    }
  }, [isMenuOpen, menuTo]);
  useEffect(() => {
    if (windowWidth > 990 && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [windowWidth]);
  return (
    <nav className={`${styles['header__nav']}${isMenuOpen ? ` ${styles['open']}` : ''}`}>
      {windowWidth > 990 ? null : (
        <button
          className={styles['header__menu-button'] + ' ' + styles[theme]}
          type="button"
          onClick={handleMenuIconClick}
          aria-label="mobile menu"
        >
          <div className={styles['header__menu-icon']} />
        </button>
      )}
      <button className={styles['header__theme-button']} type="button" onClick={setTheme}>
        <img
          className={styles['header__theme-icon']}
          src={themeIconSrc}
          alt="theme"
          height={30}
          width={30}
        />
      </button>
      {items.map(({ title, link }) => (
        <HeaderNavItem key={title} title={title} link={link} handleClick={handleHeaderItemClick} />
      ))}
    </nav>
  );
}
