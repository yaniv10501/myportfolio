import React from 'react';
import PropsTypes from 'prop-types';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from '../blocks/spinner/spinner.module.css';

export default function Spinner(props) {
  const { isLoading } = props;
  useStyles(styles);
  return (
    <div className={`${styles.spinner}${isLoading ? '' : ` ${styles['spinner_hidden']}`}`}>
      <i />
    </div>
  );
}

Spinner.propTypes = {
  isLoading: PropsTypes.bool,
};

Spinner.defaultProps = {
  isLoading: true,
};
