/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { moveKnowledgeDown, moveKnowledgeUp } from '../../utils/knowledge';

export default function AboutKnowledgeWidget() {
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
  );
}