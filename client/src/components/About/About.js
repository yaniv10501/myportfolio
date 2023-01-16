/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { moveKnowledgeDown, moveKnowledgeUp } from '../../utils/knowledge';
import AboutIcons from './AboutIcons';
import AboutText from './AboutText';
import styles from '../../blocks/about/about.module.css';

function About() {
  useStyles(styles);
  const [timer, setTimer] = useState();
  const [activeFunc, setActiveFunc] = useState({});
  const [knowledgeSpeed, setKnowledgeSpeed] = useState(50);
  let t;
  const setKnowledgeTimer = (func) => {
    setActiveFunc({ func });
    if (timer) clearInterval(timer);
    t = setInterval(func, (1000 * knowledgeSpeed) / 10);
    setTimer(t);
  };
  const handleKnowledgeUp = (event) => {
    const animation = event.target.animate(
      [
        {
          transform: 'rotateZ(-135deg) scale(1.2)',
        },
        {
          transform: 'rotateZ(-135deg) scale(1)',
        },
      ],
      { duration: 200, easing: 'cubic-bezier(.5, .45, .7, .5)' }
    );
    animation.play();
    moveKnowledgeUp();
    setKnowledgeTimer(moveKnowledgeUp);
  };
  const handleKnowledgeDown = (event) => {
    const animation = event.target.animate(
      [
        {
          transform: 'rotateZ(45deg) scale(1.2)',
        },
        {
          transform: 'rotateZ(45deg) scale(1)',
        },
      ],
      { duration: 200, easing: 'cubic-bezier(.5, .45, .7, .5)' }
    );
    animation.play();
    moveKnowledgeDown();
    setKnowledgeTimer(moveKnowledgeDown);
  };
  const handleKnowledgeSpeedChange = (event) => {
    const speedValue = event.target.value;
    setKnowledgeSpeed(50 - speedValue / 2);
    setKnowledgeTimer(activeFunc.func);
  };
  useEffect(() => {
    t = setInterval(moveKnowledgeDown, (1000 * knowledgeSpeed) / 10);
    setTimer(t);
    setActiveFunc({ func: moveKnowledgeDown });
  }, []);
  return (
    <section className={styles['about']} id="about">
      <AboutText />
      <AboutIcons />

      <div className={styles['about__knowledge']}>
        <div className={styles['about__knowledge-control']}>
          <h3 className={styles['about__knowledge-title']}>My Knowledge</h3>
          <div className={styles['about__knowledge-buttons']}>
            <div
              className={
                styles['about__knowledge-arrow'] + ' ' + styles['about__knowledge-arrow_up']
              }
              role="button"
              onClick={handleKnowledgeUp}
              onKeyDown={() => {}}
              tabIndex={0}
            />
            <div
              className={
                styles['about__knowledge-arrow'] + ' ' + styles['about__knowledge-arrow_down']
              }
              role="button"
              onClick={handleKnowledgeDown}
              onKeyDown={() => {}}
              tabIndex={0}
            />
          </div>
          <label className={styles['about__knowledge-speed-label']} htmlFor="speed-range">
            Adjust Speed
            <input
              className={styles['about__knowledge-speed']}
              name="speed-range"
              id="speed-range"
              type="range"
              min="0"
              max="90"
              onChange={handleKnowledgeSpeedChange}
            />
          </label>
        </div>
        <div className={styles['about__knowledge-items']}>
          <p
            className={styles['about__knowledge-item'] + ' ' + styles['about__knowledge-item_top']}
          >
            Git
          </p>

          <p
            className={
              styles['about__knowledge-item'] + ' ' + styles['about__knowledge-item_above']
            }
          >
            Python
          </p>

          <p className={styles['about__knowledge-item'] + ' ' + styles['about__knowledge-item_up']}>
            CI/CD
          </p>

          <p
            className={
              styles['about__knowledge-item'] + ' ' + styles['about__knowledge-item_current']
            }
          >
            React
          </p>

          <p
            className={styles['about__knowledge-item'] + ' ' + styles['about__knowledge-item_down']}
          >
            NodeJS
          </p>

          <p
            className={
              styles['about__knowledge-item'] + ' ' + styles['about__knowledge-item_below']
            }
          >
            Express
          </p>

          <p
            className={
              styles['about__knowledge-item'] + ' ' + styles['about__knowledge-item_bottom']
            }
          >
            ES5/ES6
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
