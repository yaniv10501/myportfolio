/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { handleTouchStart, handleTouchEnd } from '../utils/touch';
import useWindowDimensions from '../utils/useWindowDimensions';

const Portfolio = function Portfolio() {
  const { windowWidth } = useWindowDimensions();

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
    showCaseItem.style.transform = `rotateY(${targetX}deg) rotateX(${targetY}deg) translate3d(-150px, 0, 50px)`;
    showCaseItem.style.left = `${Number(showCaseItem.id.replace('px', '')) + 10}px`;
    showCaseItem.style.zIndex = 1;
  };

  const handlePortfolioItemMouseOut = (element) => {
    element.style.transform = 'rotateY(30deg) translate3d(0, 0, -200px)';
    element.style.left = element.id;
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

  const handlePortfolioItemTouchStart = (event) =>
    handleTouchStart(event, handlePortfolioItemMouseMove);

  const handlePortfolioItemTouchMove = (event) =>
    handleTouchStart(event, handlePortfolioItemMouseMove);

  const handlePortfolioItemTouchEnd = (event) => handleTouchEnd(event);

  useEffect(() => {
    let leftValue = 300;
    if (windowWidth > 1300) leftValue = 300;
    if (windowWidth <= 1300 && windowWidth > 768) leftValue = 200;
    if (windowWidth <= 768 && windowWidth > 370) leftValue = 100;
    if (windowWidth <= 370) leftValue = 80;

    document.querySelectorAll('.portfolio__showcase-item').forEach((element, index) => {
      element.style.left = `${index === 0 ? 50 : index * leftValue + 50}px`;
      element.id = element.style.left;
      element.onmousemove = (event) => handlePortfolioItemMouseMove(event, element);
      element.onmouseout = () => handlePortfolioItemMouseOut(element);
    });
  }, [windowWidth]);

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
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
