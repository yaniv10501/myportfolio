import React from 'react';
import gitHubIcon from '../images/GitHub-Mark-Light-32px.png';
import linkedinIcon from '../images/linkedin.png';

const Footer = function Footer() {
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
                <img className="footer__social-icons" src={gitHubIcon} alt="Facebook white logo" />
                GitHub
              </a>
            </li>

            <li className="footer__column-cell">
              <a
                className="footer__column-link link-transition"
                target="_blank"
                href="https://www.linkedin.com"
                rel="noreferrer"
              >
                <img
                  className="footer__social-icons"
                  src={linkedinIcon}
                  alt="Instagram white logo"
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
};

export default Footer;
