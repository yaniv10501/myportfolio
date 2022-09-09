import React, { useContext, useMemo } from 'react';
import ThemeContext from '../../contexts/ThemeContext';
import lightTheme from '../../images/light.svg';
import darkTheme from '../../images/dark.svg';
import HeaderNavItem from './HeaderNavItem';

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
  const { theme, handleSetTheme } = useContext(ThemeContext);
  const themeIconSrc = useMemo(() => (theme === 'light' ? lightTheme : darkTheme), [theme]);
  return (
    <nav className="header__nav">
      <button className="header__theme-button" type="button" onClick={handleSetTheme}>
        <img className="header__theme-icon" src={themeIconSrc} alt="theme" height={30} width={30} />
      </button>
      {items.map(({ title, link }) => (
        <HeaderNavItem key={title} title={title} link={link} />
      ))}
    </nav>
  );
}
