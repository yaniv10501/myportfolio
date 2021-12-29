/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { moveKnowledgeDown, moveKnowledgeUp } from '../utils/knowledge';

const About = function About() {
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
    <section className="about" id="about">
      <div className="about__text">
        <h2 className="about__title">About me</h2>
        <p className="about__brief">
          I am a jr Full-Stack developer from Jerusalem, Israel.
          <br />I love programming, learning, and challenging myself with new fields.
        </p>
      </div>

      <div className="about__icons">
        <div className="about__icon-container">
          <h3 className="about__icon-title">Fast</h3>
          <p className="about__icon-brief">
            My websites have fast loading speed and smooth behavior.
          </p>
        </div>
        <div className="about__icon-container">
          <h3 className="about__icon-title">Efficient</h3>
          <p className="about__icon-brief">
            I like to work fast and write clean and efficient code.
          </p>
        </div>
        <div className="about__icon-container">
          <h3 className="about__icon-title">Dynamic</h3>
          <p className="about__icon-brief">
            I love using animations to bring the websites to life.
          </p>
        </div>
        <div className="about__icon-container">
          <h3 className="about__icon-title">Responsive</h3>
          <p className="about__icon-brief">
            My designs fit&apos;s all screen sizes and support&apos;s mobile touch actions.
          </p>
        </div>
      </div>

      <div className="about__knowledge">
        <div className="about__knowledge-control">
          <h3 className="about__knowledge-title">My Knowledge</h3>
          <div className="about__knowledge-buttons">
            <div
              className="about__knowledge-arrow about__knowledge-arrow_up"
              role="button"
              onClick={handleKnowledgeUp}
              onKeyDown={() => {}}
              tabIndex={0}
            />
            <div
              className="about__knowledge-arrow about__knowledge-arrow_down"
              role="button"
              onClick={handleKnowledgeDown}
              onKeyDown={() => {}}
              tabIndex={0}
            />
          </div>
          <label className="about__knowledge-speed-label" htmlFor="speed-range">
            Adjust Speed
            <input
              className="about__knowledge-speed"
              name="speed-range"
              id="speed-range"
              type="range"
              min="0"
              max="90"
              onChange={handleKnowledgeSpeedChange}
            />
          </label>
        </div>
        <div className="about__knowledge-items">
          <p className="about__knowledge-item about__knowledge-item_top">HTML</p>

          <p className="about__knowledge-item about__knowledge-item_above">Next</p>

          <p className="about__knowledge-item about__knowledge-item_up">CSS</p>

          <p className="about__knowledge-item about__knowledge-item_current">React</p>

          <p className="about__knowledge-item about__knowledge-item_down">NodeJS</p>

          <p className="about__knowledge-item about__knowledge-item_below">Express</p>

          <p className="about__knowledge-item about__knowledge-item_bottom">JS</p>
        </div>
      </div>
    </section>
  );
};

export default About;
