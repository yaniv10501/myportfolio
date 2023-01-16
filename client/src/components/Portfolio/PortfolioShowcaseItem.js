/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from '../../blocks/portfolio/portfolio.module.css';
import PortfolioShowcaseItemDetails from './PortfolioShowcaseItemDetails';
import FlexImg from '../FlexImg';

export default function PortfolioShowcaseItem(props) {
  const {
    name,
    src,
    srcPng,
    handlePortfolioItemClick,
    handlePortfolioItemTouchStart,
    handlePortfolioItemTouchMove,
    handlePortfolioItemTouchEnd,
    activeItem,
    setActiveItem,
  } = props;
  useStyles(styles);
  const itemRef = useRef();
  const [isClicked, setIsClicked] = useState(false);
  const onClick = (event) => {
    if (isClicked) {
      setActiveItem('');
    } else {
      setActiveItem(name);
    }
    setIsClicked(handlePortfolioItemClick(event));
  };
  useEffect(() => {
    if (activeItem !== name && isClicked) {
      setIsClicked(handlePortfolioItemClick({ target: itemRef.current }));
    }
  }, [activeItem]);
  return (
    <div
      ref={itemRef}
      className={`${styles['portfolio__showcase-item']}`}
      onClick={onClick}
      onTouchStart={handlePortfolioItemTouchStart}
      onTouchMove={handlePortfolioItemTouchMove}
      onTouchEnd={handlePortfolioItemTouchEnd}
      onKeyDown={() => {}}
      role="button"
      tabIndex={0}
      aria-label={`${name} item details`}
    >
      <FlexImg
        className={
          styles['portfolio__showcase-item-image'] +
          ' ' +
          styles[`portfolio__showcase-item-image_${name}`]
        }
        src={src}
        srcPng={srcPng}
        alt={name}
        width={450}
        height={650}
      />
      {isClicked && (
        <>
          <PortfolioShowcaseItemDetails details="Frontend - React" />
          <PortfolioShowcaseItemDetails details="Backend - NodeJS" />
          <PortfolioShowcaseItemDetails details="Server - Nginx" />
          <PortfolioShowcaseItemDetails details="DB - Mongo" />
          <PortfolioShowcaseItemDetails details="CI/CD - Node Worker" />
          <div
            className={styles['portfolio__showcase-item-go']}
            role="button"
            tabIndex={0}
            aria-label={`${name} website`}
          >
            <h3 className={styles['portfolio__showcase-item-go-text']}>Go to Website</h3>
          </div>
        </>
      )}
    </div>
  );
}

PortfolioShowcaseItem.propTypes = {
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  srcPng: PropTypes.string.isRequired,
  handlePortfolioItemClick: PropTypes.func.isRequired,
  handlePortfolioItemTouchStart: PropTypes.func.isRequired,
  handlePortfolioItemTouchMove: PropTypes.func.isRequired,
  handlePortfolioItemTouchEnd: PropTypes.func.isRequired,
  activeItem: PropTypes.string.isRequired,
  setActiveItem: PropTypes.func.isRequired,
};
