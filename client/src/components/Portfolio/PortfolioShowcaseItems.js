/* eslint-disable no-param-reassign */
import React, { useCallback, useEffect, useState } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from '../../blocks/portfolio/portfolio.module.css';
import { handleTouchEnd, handleTouchStart } from '../../utils/touch';
import PortfolioShowcaseItem from './PortfolioShowcaseItem';
import degreegamesLogo from '../../images/90degreegames-logo.webp';
import degreegamesLogoPng from '../../images/90degreegames-logo.png';
import newsExplorerLogo from '../../images/header-background-tablet.webp';
import newsExplorerLogoPng from '../../images/header-background-tablet.jpg';
import aroundLogo from '../../images/around-cover.webp';
import aroundLogoPng from '../../images/around-cover.png';
import studyLogo from '../../images/how-to-study-eng-cover.webp';
import studyLogoPng from '../../images/how-to-study-eng-cover.png';
import acrossLogo from '../../images/across-usa-cover.webp';
import acrossLogoPng from '../../images/across-usa-cover.png';

const items = [
  { name: '90degreegames', src: degreegamesLogo, srcPng: degreegamesLogoPng },
  { name: 'news-explorer', src: newsExplorerLogo, srcPng: newsExplorerLogoPng },
  { name: 'around', src: aroundLogo, srcPng: aroundLogoPng },
  { name: 'study', src: studyLogo, srcPng: studyLogoPng },
  { name: 'across', src: acrossLogo, srcPng: acrossLogoPng },
];

export default function PortfolioShowcaseItems() {
  useStyles(styles);
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
      className.includes(styles['clicked']) ||
      className.includes(styles['portfolio__showcase-item-details']) ||
      className.includes(styles['portfolio__showcase-item-go'])
    ) {
      if (className.includes(styles['portfolio__showcase-item-details'])) {
        const firstParent = event.target.parentElement;
        if (firstParent.className.includes(styles['portfolio__showcase-item-details'])) {
          firstParent.parentElement.classList.remove(styles['clicked']);
          className = firstParent.parentElement.className;
          classList = firstParent.parentElement.classList;
        } else {
          firstParent.classList.remove(styles['clicked']);
          className = firstParent.className;
          classList = firstParent.classList;
        }
      } else {
        classList.remove(styles['clicked']);
      }
      if (className.includes(styles['portfolio__showcase-item-go'])) {
        const firstParent = event.target.parentElement;
        if (firstParent.className.includes(styles['portfolio__showcase-item-go'])) {
          firstParent.parentElement.classList.remove(styles['clicked']);
          className = firstParent.parentElement.className;
          classList = firstParent.parentElement.classList;
        } else {
          firstParent.classList.remove(styles['clicked']);
          className = firstParent.className;
          classList = firstParent.classList;
        }
        switch (className.split(' ')[1]) {
          case styles['portfolio__showcase-item_study']: {
            window.open('https://yaniv10501.github.io/web_project_1/', '_blank');
            break;
          }
          case styles['portfolio__showcase-item_across']: {
            window.open('https://yaniv10501.github.io/web_project_3/', '_blank');
            break;
          }
          case styles['portfolio__showcase-item_around']: {
            window.open('https://around.yanivportfolio.com', '_blank');
            break;
          }
          case styles['portfolio__showcase-item_news-explorer']: {
            window.open('https://news-explorer.yanivportfolio.com', '_blank');
            break;
          }
          case styles['portfolio__showcase-item_90degreegames']: {
            window.open('https://90degreegames.com', '_blank');
            break;
          }
          default:
            break;
        }
      }
      return false;
    }
    classList.add(styles['clicked']);
    return true;
  };
  const checkItem = useCallback(
    (event) => event.target.className === styles['portfolio__showcase-item'],
    []
  );
  const checkClicked = useCallback(
    (event) => event.target.className.includes(styles['clicked']),
    []
  );
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
    document.querySelectorAll(`.${styles['portfolio__showcase-item']}`).forEach((element) => {
      element.id = element.style.left;
      element.onmousemove = (event) =>
        checkItem(event) && !checkClicked(event) && handlePortfolioItemMouseMove(event, element);
      element.onmouseout = () => handlePortfolioItemMouseOut(element);
    });
  }, []);
  return (
    <div className={styles['portfolio__showcase']}>
      {items.length > 0 &&
        items.map(({ name, src, srcPng }) => (
          <PortfolioShowcaseItem
            key={name}
            name={name}
            src={src}
            srcPng={srcPng}
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
