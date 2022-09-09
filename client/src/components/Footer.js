import React, { useContext } from 'react';
import ThemeContext from '../contexts/ThemeContext';
import gitHubIconPng from '../images/GitHub-Mark-32px.png';
import gitHubIcon from '../images/GitHub-Mark-32px.webp';
import gitHubIconPngLight from '../images/GitHub-Mark-Light-32px.png';
import gitHubIconLight from '../images/GitHub-Mark-Light-32px.webp';
import linkedinIconPng from '../images/linkedin.png';
import linkedinIcon from '../images/linkedin.webp';
import FlexImg from './FlexImg';

function Footer() {
  const { theme } = useContext(ThemeContext);
  return (
    <footer className="footer">
      <div className="footer__columns">
        <nav className="footer__column footer__column_content_about">
          <h3 className="footer__column-heading">About Me</h3>

          <ul className="footer__list">
            <li className="footer__column-cell">
              <p className="footer__column-link">Yaniv Schweitzer</p>
            </li>

            <li className="footer__column-cell">
              <p className="footer__column-link">Jerusalem, Israel</p>
            </li>

            <li className="footer__column-cell">
              <p className="footer__column-link">yaniv.sch.fullstack@gmail.com</p>
            </li>
          </ul>
        </nav>

        <nav className="footer__column footer__column_content_social">
          <h3 className="footer__column-heading">Social media</h3>

          <ul className="footer__list">
            <li className="footer__column-cell">
              <a
                className="footer__column-link link-transition"
                target="_blank"
                href="https://github.com/yaniv10501"
                rel="noreferrer"
              >
                {theme === 'light' ? (
                  <FlexImg
                    className="footer__social-icons"
                    src={gitHubIcon}
                    srcPng={gitHubIconPng}
                    alt="github logo"
                  />
                ) : (
                  <FlexImg
                    className="footer__social-icons"
                    src={gitHubIconLight}
                    srcPng={gitHubIconPngLight}
                    alt="github logo"
                  />
                )}
                GitHub
              </a>
            </li>

            <li className="footer__column-cell">
              <a
                className="footer__column-link link-transition"
                target="_blank"
                href="https://www.linkedin.com/in/yaniv-schweitzer"
                rel="noreferrer"
              >
                <FlexImg
                  className="footer__social-icons"
                  src={linkedinIcon}
                  srcPng={linkedinIconPng}
                  alt="linkedin logo"
                />
                Linkedin
              </a>
            </li>
          </ul>
        </nav>

        <div className="footer__column footer__column_content_copyright">
          <p className="footer__author">&copy; 2021 Yaniv Schweitzer</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
