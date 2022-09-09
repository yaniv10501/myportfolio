import React from 'react';
import PortfolioRepo from './PortfolioRepo';

const repos = [
  {
    repoTitle: 'Main Worker',
    repoLink: 'https://github.com/yaniv10501/main-worker',
  },
  {
    repoTitle: 'How to Study',
    repoLink: 'https://github.com/yaniv10501/web_project_1',
  },
  {
    repoTitle: 'Across the USA',
    repoLink: 'https://github.com/yaniv10501/web_project_3',
  },
  {
    repoTitle: 'Around the USA',
    repoLink: 'https://github.com/yaniv10501/react-around-api-full',
  },
  {
    repoTitle: 'News Exolorer Frontend',
    repoLink: 'https://github.com/yaniv10501/news-explorer-frontend',
  },
  {
    repoTitle: 'News Exolorer API',
    repoLink: 'https://github.com/yaniv10501/news-explorer-api',
  },
];

export default function PortfolioRepos() {
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
  return (
    <div className="portfolio__github-repos">
      <h3 className="portfolio__github-repos-title">GitHub Repositories</h3>
      <div className="portfolio__github-repos-grid">
        {repos.map(({ repoTitle, repoLink }) => (
          <PortfolioRepo
            key={repoLink}
            title={repoTitle}
            link={repoLink}
            handleRepoItemClick={handleRepoItemClick}
          />
        ))}
      </div>
    </div>
  );
}
