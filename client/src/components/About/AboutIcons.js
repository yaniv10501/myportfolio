import React from 'react';
import AboutIcon from './AboutIcon';

const icons = [
  {
    title: 'Fast',
    text: ' My websites have fast loading speed and smooth preformance.',
  },
  {
    title: 'Efficient',
    text: 'I am a productive worker and i write clean and efficient code.',
  },
  {
    title: 'Dynamic',
    text: 'I love using animations to bring the websites to life.',
  },
  {
    title: 'Responsive',
    text: 'My designs fit all screen sizes and support mobile touch actions.',
  },
];

export default function AboutIcons() {
  return (
    <div className="about__icons">
      {icons.map(({ title, text }) => (
        <AboutIcon key={title} title={title} text={text} />
      ))}
    </div>
  );
}
