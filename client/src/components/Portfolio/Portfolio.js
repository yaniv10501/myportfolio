import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from '../../blocks/portfolio/portfolio.module.css';
// import PortfolioArrows from './PortfolioArrows';
import PortfolioRepos from './PortfolioRepos';
import PortfolioShowcaseItems from './PortfolioShowcaseItems';

function Portfolio() {
  useStyles(styles);
  return (
    <section className={styles['portfolio']} id="portfolio">
      <h2 className={styles['portfolio__title']}>My Portfolio</h2>
      <PortfolioShowcaseItems />
      {/* <PortfolioArrows /> */}
      <PortfolioRepos />
    </section>
  );
}

export default Portfolio;
