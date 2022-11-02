/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useState } from 'react';
import { handleTouchEnd, handleTouchStart } from '../../utils/touch';
import PortfolioShowcaseItem from './PortfolioShowcaseItem';

const items = ['90degreegames', 'news-explorer', 'around', 'study', 'across'];

export default function PortfolioShowcaseItems() {
  const [activeItem, setActiveItem] = useState('');
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
    let { className, classList } = event.target;
    if (
      className.includes('clicked') ||
      className.includes('details') ||
      className.includes('go')
    ) {
      if (className.includes('details')) {
        const firstParent = event.target.parentElement;
        if (firstParent.className.includes('details')) {
          firstParent.parentElement.classList.remove('clicked');
          className = firstParent.parentElement.className;
          classList = firstParent.parentElement.classList;
        } else {
          firstParent.classList.remove('clicked');
          className = firstParent.className;
          classList = firstParent.classList;
        }
      } else {
        classList.remove('clicked');
      }
      if (className.includes('go')) {
        const firstParent = event.target.parentElement;
        if (firstParent.className.includes('go')) {
          firstParent.parentElement.classList.remove('clicked');
          className = firstParent.parentElement.className;
          classList = firstParent.parentElement.classList;
        } else {
          firstParent.classList.remove('clicked');
          className = firstParent.className;
          classList = firstParent.classList;
        }
        switch (className.match(/item_[0-9a-zA-Z-]+/)[0]) {
          case 'item_study': {
            window.open('https://yaniv10501.github.io/web_project_1/', '_blank');
            break;
          }
          case 'item_across': {
            window.open('https://yaniv10501.github.io/web_project_3/', '_blank');
            break;
          }
          case 'item_around': {
            window.open('https://around.yanivportfolio.com', '_blank');
            break;
          }
          case 'item_news-explorer': {
            window.open('https://news-explorer.yanivportfolio.com', '_blank');
            break;
          }
          case 'item_90degreegames': {
            window.open('https://90degreegames.com', '_blank');
            break;
          }
          default:
            break;
        }
      }
      return false;
    }
    classList.add('clicked');
    return true;
  };
  const checkItem = useCallback(
    (event) => /^portfolio__showcase-item /.test(event.target.className),
    []
  );
  const checkClicked = useCallback((event) => event.target.className.includes('clicked'), []);
  const handlePortfolioItemTouchStart = (event) =>
    checkItem(event) &&
    !checkClicked(event) &&
    handleTouchStart(event, handlePortfolioItemMouseMove);

  const handlePortfolioItemTouchMove = (event) =>
    checkItem(event) &&
    !checkClicked(event) &&
    handleTouchStart(event, handlePortfolioItemMouseMove);

  const handlePortfolioItemTouchEnd = (event) =>
    checkItem(event) && !checkClicked(event) && handleTouchEnd(event);
  useEffect(() => {
    document.querySelectorAll('.portfolio__showcase-item').forEach((element) => {
      element.id = element.style.left;
      element.onmousemove = (event) =>
        checkItem(event) && !checkClicked(event) && handlePortfolioItemMouseMove(event, element);
      element.onmouseout = () => handlePortfolioItemMouseOut(element);
    });
  }, []);
  return (
    <div className="portfolio__showcase">
      {items.length > 0 &&
        items.map((item) => (
          <PortfolioShowcaseItem
            key={item}
            name={item}
            handlePortfolioItemClick={handlePortfolioItemClick}
            handlePortfolioItemTouchStart={handlePortfolioItemTouchStart}
            handlePortfolioItemTouchMove={handlePortfolioItemTouchMove}
            handlePortfolioItemTouchEnd={handlePortfolioItemTouchEnd}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
        ))}
    </div>
  );
}
