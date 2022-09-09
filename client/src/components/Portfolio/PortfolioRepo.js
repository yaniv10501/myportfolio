import React from 'react';
import PropTypes from 'prop-types';

export default function PortfolioRepo(props) {
  const { title, link, handleRepoItemClick } = props;
  return (
    <div
      className="portfolio__github-repos-item"
      onClick={handleRepoItemClick}
      onKeyDown={() => {}}
      role="button"
      tabIndex={0}
    >
      <p className="portfolio__github-repo-title">{title} GitHub repository</p>
      <a className="portfolio__github-repo-link" href={link} target="_blank" rel="noreferrer">
        {link}
      </a>
    </div>
  );
}

PortfolioRepo.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  handleRepoItemClick: PropTypes.func.isRequired,
};
