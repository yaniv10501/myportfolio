import React from 'react';

export default function AboutText() {
  return (
    <div className="about__text">
      <h2 className="about__title">About me</h2>
      <p className="about__brief">
        I am a Full-Stack Web Developer from Jerusalem, Israel.
        <br />I love programming, challenging myself and researching new fields.
        <br />
        Currently working at{' '}
        <a className="about__brief_jika" href="https://jika.io" target="_blank" rel="noreferrer">
          Jika.io
        </a>
      </p>
    </div>
  );
}
