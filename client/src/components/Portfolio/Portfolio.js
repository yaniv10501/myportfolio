import React from 'react';
import PortfolioArrows from './PortfolioArrows';
import PortfolioRepos from './PortfolioRepos';
import PortfolioShowcaseItems from './PortfolioShowcaseItems';

function Portfolio() {
  return (
    <section className="portfolio" id="portfolio">
      <h2 className="portfolio__title">My Portfolio</h2>
      <PortfolioShowcaseItems />
      <PortfolioArrows />
      <PortfolioRepos />
    </section>
  );
}

export default Portfolio;
