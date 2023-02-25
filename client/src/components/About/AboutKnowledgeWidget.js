/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import styles from '../../blocks/about/about.module.css';
import { moveKnowledgeDown } from '../../utils/knowledge';

export default function AboutKnowledgeWidget() {
  useStyles(styles);
  const indicatorRef = useRef();
  // eslint-disable-next-line no-unused-vars
  const [timer, setTimer] = useState();
  const [knowledgeSpeed, setKnowledgeSpeed] = useState(10);
  const setKnowledgeTimer = useCallback((speed) => {
    setTimer((currentState) => {
      if (currentState) clearInterval(currentState);
      return setInterval(moveKnowledgeDown, (1000 * speed) / 10);
    });
  }, []);
  const handleKnowledgeSpeedChange = useCallback((event) => {
    const { value } = event.target;
    const speedValue = 19 - (3 + (11 / 100) * Number(value));
    setKnowledgeSpeed(speedValue);
    setKnowledgeTimer(speedValue);
    indicatorRef.current.style.setProperty('--indicator-width', `${value}%`);
  }, []);
  useEffect(() => {
    setTimer(setInterval(moveKnowledgeDown, (1000 * knowledgeSpeed) / 10));
  }, []);
  return (
    <div className={styles['about__knowledge-control']}>
      <label className={styles['about__knowledge-speed-label']} htmlFor="speed-range">
        <input
          className={styles['about__knowledge-speed']}
          name="speed-range"
          id="speed-range"
          type="range"
          min="0"
          max="100"
          onChange={handleKnowledgeSpeedChange}
        />
        <div ref={indicatorRef} className={styles['about__knowledge-speed-indicator']} />
      </label>
    </div>
  );
}
