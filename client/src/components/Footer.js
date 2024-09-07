import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from '../blocks/footer/footer.module.css';
import { useThemeContext } from '../contexts/ThemeContext';
import gitHubIconPng from '../images/GitHub-Mark-32px.png';
import gitHubIcon from '../images/GitHub-Mark-32px.webp';
import gitHubIconPngLight from '../images/GitHub-Mark-Light-32px.png';
import gitHubIconLight from '../images/GitHub-Mark-Light-32px.webp';
import linkedinIconPng from '../images/linkedin.png';
import linkedinIcon from '../images/linkedin.webp';
import FlexImg from './FlexImg';
import { currentYear } from '../assets/date';

function Footer() {
  useStyles(styles);
  const { theme } = useThemeContext();
  return (
    <footer className={styles['footer']}>
      <div className={styles['footer__columns']}>
        <nav className={`${styles['footer__column']} ${styles['footer__column_content_about']}`}>
          <h3 className={styles['footer__column-headcing']}>About Me</h3>

          <ul className={styles['footer__list']}>
            <li className={styles['footer__column-cell']}>
              <p className={styles['footer__column-link']}>Yaniv Schweitzer</p>
            </li>

            <li className={styles['footer__column-cell']}>
              <p className={styles['footer__column-link']}>Jerusalem, Israel</p>
            </li>

            <li className={styles['footer__column-cell']}>
              <p className={styles['footer__column-link']}>yaniv.sch@icloud.com</p>
            </li>
          </ul>
        </nav>
        <nav className={`${styles['footer__column']} ${styles['footer__column_content_social']}`}>
          <h3 className={styles['footer__column-heading']}>Social media</h3>

          <ul className={styles['footer__list']}>
            <li className={styles['footer__column-cell']}>
              <a
                className={`${styles['footer__column-link']} ${styles['link-transition']}`}
                target="_blank"
                href="https://github.com/yaniv10501"
                rel="noreferrer"
              >
                {theme === 'light' ? (
                  <FlexImg
                    className={styles['footer__social-icons']}
                    src={gitHubIcon}
                    srcPng={gitHubIconPng}
                    alt="github logo"
                  />
                ) : (
                  <FlexImg
                    className={styles['footer__social-icons']}
                    src={gitHubIconLight}
                    srcPng={gitHubIconPngLight}
                    alt="github logo"
                  />
                )}
                GitHub
              </a>
            </li>

            <li className={styles['footer__column-cell']}>
              <a
                className={`${styles['footer__column-link']} ${styles['link-transition']}`}
                target="_blank"
                href="https://www.linkedin.com/in/yaniv-schweitzer"
                rel="noreferrer"
              >
                <FlexImg
                  className={styles['footer__social-icons']}
                  src={linkedinIcon}
                  srcPng={linkedinIconPng}
                  alt="linkedin logo"
                />
                Linkedin
              </a>
            </li>
          </ul>
        </nav>

        <div
          className={`${styles['footer__column']} ${styles['footer__column_content_copyright']}`}
        >
          <p className={styles['footer__author']}>&copy; {currentYear} Yaniv Schweitzer</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
