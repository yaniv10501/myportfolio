import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from '../../blocks/header/header.module.css';
import homeStyles from '../../blocks/home/home.module.css';
import pageStyles from '../../blocks/page/page.module.css';
import HeaderNav from './HeaderNav';

function Header() {
  useStyles(styles, pageStyles, homeStyles);
  return (
    <header className={styles['header']}>
      <HeaderNav />
    </header>
  );
}

export default Header;
