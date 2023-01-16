import React from 'react';
import PropTypes from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from '../../blocks/portfolio/portfolio.module.css';

export default function PortfolioRepo(props) {
  const { title, link, handleRepoItemClick } = props;
  useStyles(styles);
  return (
    <div
      className={styles['portfolio__github-repos-item']}
      onClick={handleRepoItemClick}
      onKeyDown={() => {}}
      role="button"
      tabIndex={0}
    >
      <p className={styles['portfolio__github-repo-title']}>{title} GitHub repository</p>
      <a
        className={styles['portfolio__github-repo-link']}
        href={link}
        target="_blank"
        rel="noreferrer"
      >
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
