import React, { useEffect } from 'react';

function Header() {
  const handleScroll = () => {
    const homeElement = document.querySelector('.home');
    const navElement = document.querySelector('.header__nav');
    const mainElement = document.querySelector('.main');
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
    <header className="header">
      <nav className="header__nav">
        <a className="header__nav-button" href="#home">
          Home
        </a>
        <a className="header__nav-button" href="#about">
          About
        </a>
        <a className="header__nav-button" href="#portfolio">
          Portfolio
        </a>
        <a className="header__nav-button" href="#contact">
          Contact
        </a>
      </nav>
    </header>
  );
}

export default Header;
