/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { handleTouchStart, handleTouchEnd } from '../utils/touch';

function Portfolio() {
  const handlePortfolioItemMouseMove = (event, element) => {
    const showCaseItem = event.target || element;
    const elementHeight = showCaseItem.offsetHeight;
    const elementWidth = showCaseItem.offsetWidth;
    const positionX = event.offsetX;
    const positionY = event.offsetY;

    if (positionX > elementWidth || positionY > elementHeight || positionX < 0 || positionY < 0)
      return;
    const firstX = (positionX - elementWidth / 2) / elementWidth;
    const firstY = (elementHeight - positionY - elementHeight / 2) / elementHeight;
    const targetX = firstX * firstX * firstX * 100;
    const targetY = firstY * firstY * firstY * 120;
    showCaseItem.style.transform = `rotateY(${targetX}deg) rotateX(${targetY}deg) translate3d(-100px, 0, 0)`;
    showCaseItem.style.zIndex = 1;
  };

  const handlePortfolioItemMouseOut = (element) => {
    element.style.transform = 'rotateY(20deg) translate3d(0, 0, -200px)';
    element.style.zIndex = 0;
  };

  const handlePortfolioItemClick = (event) => {
    const className = event.target.className.replace('portfolio__showcase-item ', '');

    switch (className) {
      case 'portfolio__showcase-item_study': {
        window.open('https://yaniv10501.github.io/web_project_1/', '_blank');
        break;
      }
      case 'portfolio__showcase-item_across': {
        window.open('https://yaniv10501.github.io/web_project_3/', '_blank');
        break;
      }
      case 'portfolio__showcase-item_around': {
        window.open('https://yaniv.students.nomoreparties.site', '_blank');
        break;
      }
      case 'portfolio__showcase-item_news-explorer': {
        window.open('https://yaniv-news-app.students.nomoreparties.sbs', '_blank');
        break;
      }
      default:
        break;
    }
  };

  const handleRepoItemClick = (event) => {
    const repoElement = event.target;
    if (repoElement.className.includes('portfolio__github-repo-link')) return;
    if (repoElement.className.includes('portfolio__github-repo-title')) {
      const repoLink = repoElement.parentNode.querySelector('.portfolio__github-repo-link').href;
      window.open(repoLink, '_blank');
      return;
    }
    const repoLink = repoElement.querySelector('.portfolio__github-repo-link').href;
    window.open(repoLink, '_blank');
  };

  const handleArrowClick = (event) => {
    const arrowElement = event.target;
    const animation = arrowElement.animate(
      [
        {
          transform: 'scale(0.7)',
        },
        {
          transform: 'scale(0.6)',
        },
        {
          transform: 'scale(0.7)',
        },
      ],
      { duration: 400, easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)' }
    );
    const portfolioElement = document.querySelector('.portfolio__showcase');
    const { scrollLeft } = portfolioElement;
    const portfolioWidth = portfolioElement.clientWidth;
    console.log(portfolioElement.clientWidth, portfolioElement.scrollLeft);
    switch (arrowElement.id) {
      case 'forwards':
        portfolioElement.scroll({
          top: 0,
          left: scrollLeft + (portfolioWidth / 2 + 100),
          behavior: 'smooth',
        });
        break;
      case 'backwards':
        portfolioElement.scroll({
          top: 0,
          left: portfolioElement.scrollLeft - (portfolioWidth / 2 + 100),
          behavior: 'smooth',
        });
        break;
      default:
        break;
    }
    animation.play();
  };

  const handlePortfolioItemTouchStart = (event) =>
    handleTouchStart(event, handlePortfolioItemMouseMove);

  const handlePortfolioItemTouchMove = (event) =>
    handleTouchStart(event, handlePortfolioItemMouseMove);

  const handlePortfolioItemTouchEnd = (event) => handleTouchEnd(event);

  useEffect(() => {
    document.querySelectorAll('.portfolio__showcase-item').forEach((element) => {
      element.id = element.style.left;
      element.onmousemove = (event) => handlePortfolioItemMouseMove(event, element);
      element.onmouseout = () => handlePortfolioItemMouseOut(element);
    });
  }, []);

  return (
    <section className="portfolio" id="portfolio">
      <h2 className="portfolio__title">My Portfolio</h2>
      <div className="portfolio__showcase">
        <div
          className="portfolio__showcase-item portfolio__showcase-item_study"
          onClick={handlePortfolioItemClick}
          onTouchStart={handlePortfolioItemTouchStart}
          onTouchMove={handlePortfolioItemTouchMove}
          onTouchEnd={handlePortfolioItemTouchEnd}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
        />
        <div
          className="portfolio__showcase-item portfolio__showcase-item_across"
          onClick={handlePortfolioItemClick}
          onTouchStart={handlePortfolioItemTouchStart}
          onTouchMove={handlePortfolioItemTouchMove}
          onTouchEnd={handlePortfolioItemTouchEnd}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
        />
        <div
          className="portfolio__showcase-item portfolio__showcase-item_around"
          onClick={handlePortfolioItemClick}
          onTouchStart={handlePortfolioItemTouchStart}
          onTouchMove={handlePortfolioItemTouchMove}
          onTouchEnd={handlePortfolioItemTouchEnd}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
        />
        <div
          className="portfolio__showcase-item portfolio__showcase-item_news-explorer"
          onClick={handlePortfolioItemClick}
          onTouchStart={handlePortfolioItemTouchStart}
          onTouchMove={handlePortfolioItemTouchMove}
          onTouchEnd={handlePortfolioItemTouchEnd}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
        />
      </div>
      <div className="portfolio__arrows">
        <div
          className="home__arrow portfolio__arrow portfolio__arrow_backwards"
          id="backwards"
          onClick={handleArrowClick}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
          label="down arrow"
        />
        <div
          className="home__arrow portfolio__arrow portfolio__arrow_forwards"
          id="forwards"
          onClick={handleArrowClick}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
          label="down arrow"
        />
      </div>
      <div className="portfolio__github-repos">
        <h3 className="portfolio__github-repos-title">GitHub Repositories</h3>
        <div className="portfolio__github-repos-grid">
          <div
            className="portfolio__github-repos-item"
            onClick={handleRepoItemClick}
            onKeyDown={() => {}}
            role="button"
            tabIndex={0}
          >
            <p className="portfolio__github-repo-title">How to study GitHub repository</p>
            <a
              className="portfolio__github-repo-link"
              href="https://github.com/yaniv10501/web_project_1"
              target="_blank"
              rel="noreferrer"
            >
              https://github.com/yaniv10501/web_project_1
            </a>
          </div>
          <div
            className="portfolio__github-repos-item"
            onClick={handleRepoItemClick}
            onKeyDown={() => {}}
            role="button"
            tabIndex={0}
          >
            <p className="portfolio__github-repo-title">Across the USA GitHub repository</p>
            <a
              className="portfolio__github-repo-link"
              href="https://github.com/yaniv10501/web_project_3"
              target="_blank"
              rel="noreferrer"
            >
              https://github.com/yaniv10501/web_project_3
            </a>
          </div>
          <div
            className="portfolio__github-repos-item"
            onClick={handleRepoItemClick}
            onKeyDown={() => {}}
            role="button"
            tabIndex={0}
          >
            <p className="portfolio__github-repo-title">Around the USA GitHub repository</p>
            <a
              className="portfolio__github-repo-link"
              href="https://github.com/yaniv10501/react-around-api-full"
              target="_blank"
              rel="noreferrer"
            >
              https://github.com/yaniv10501/react-around-api-full
            </a>
          </div>
          <div
            className="portfolio__github-repos-item"
            onClick={handleRepoItemClick}
            onKeyDown={() => {}}
            role="button"
            tabIndex={0}
          >
            <p className="portfolio__github-repo-title">News Exolorer FrontEnd GitHub repository</p>
            <a
              className="portfolio__github-repo-link"
              href="https://github.com/yaniv10501/news-explorer-frontend"
              target="_blank"
              rel="noreferrer"
            >
              https://github.com/yaniv10501/news-explorer-frontend
            </a>
          </div>
          <div
            className="portfolio__github-repos-item"
            onClick={handleRepoItemClick}
            onKeyDown={() => {}}
            role="button"
            tabIndex={0}
          >
            <p className="portfolio__github-repo-title">News Explorer API GitHub repository</p>
            <a
              className="portfolio__github-repo-link"
              href="https://github.com/yaniv10501/news-explorer-api"
              target="_blank"
              rel="noreferrer"
            >
              https://github.com/yaniv10501/news-explorer-api
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;
