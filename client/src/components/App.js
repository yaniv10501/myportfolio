/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import Home from './Home';
import Header from './Header';
import About from './About';
import Portfolio from './Portfolio';
import Contact from './Contact';
import Footer from './Footer';
import getPortraitVh from '../utils/costumVh';

function App() {
  smoothscroll.polyfill();

  const [fontLoading, setFontLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [pageLoadText, setPageLoadText] = useState('');

  useEffect(() => {
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
  return (
    <div className={fontLoading ? 'page page_hidden' : 'page'}>
      <div className={isPageLoading ? 'page-spinner' : 'page-spinner page-spinner_hidden'}>
        <div className="page-spinner__container">
          <i />
        </div>
        <p className="page-spinner__text">{pageLoadText}</p>
      </div>
      <div className={isPageLoading ? 'content content_hidden' : 'content'}>
        <Home
          setIsPageLoading={setIsPageLoading}
          setPageLoadText={setPageLoadText}
          setFontLoading={setFontLoading}
        />
        <main className="main">
          <Header />
          <About />
          <Portfolio />
          <Contact />
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;
