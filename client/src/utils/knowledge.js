import styles from '../blocks/about/about.module.css';
import classNames from '../assets/classNames';
import { setColor } from './setColors';

const knowledgeList = [
  'HTML',
  'Python',
  'CSS',
  'React',
  'NodeJS',
  'Express',
  'ES5/ES6',
  'Mongo',
  'SQL',
  'CI/CD',
  'Git',
];
const moveKnowledgeUp = () => {
  const {
    itemTopClass,
    itemAboveClass,
    itemUpClass,
    itemCurrentClass,
    itemDownClass,
    itemBelowClass,
    itemBottomClass,
  } = classNames.knowledge;
  let i;
  const topItem = document.querySelector(`.${styles[itemTopClass]}`);
  const aboveItem = document.querySelector(`.${styles[itemAboveClass]}`);
  const upItem = document.querySelector(`.${styles[itemUpClass]}`);
  const currentItem = document.querySelector(`.${styles[itemCurrentClass]}`);
  const downItem = document.querySelector(`.${styles[itemDownClass]}`);
  const belowItem = document.querySelector(`.${styles[itemBelowClass]}`);
  const bottomItem = document.querySelector(`.${styles[itemBottomClass]}`);
  knowledgeList.forEach((item, index) => {
    if (bottomItem.textContent === item) i = index + 1;
  });
  if (i === knowledgeList.length) i = 0;
  topItem.textContent = knowledgeList[i];
  aboveItem.classList.replace(styles[itemAboveClass], styles[itemTopClass]);
  upItem.classList.replace(styles[itemUpClass], styles[itemAboveClass]);
  currentItem.classList.replace(styles[itemCurrentClass], styles[itemUpClass]);
  downItem.classList.replace(styles[itemDownClass], styles[itemCurrentClass]);
  belowItem.classList.replace(styles[itemBelowClass], styles[itemDownClass]);
  bottomItem.classList.replace(styles[itemBottomClass], styles[itemBelowClass]);
  topItem.classList.replace(styles[itemTopClass], styles[itemBottomClass]);
  downItem.style.background = 'var(--secondaryColor)';
  setColor('var(--backgroundColor)', currentItem, belowItem);
};
const moveKnowledgeDown = () => {
  const {
    itemTopClass,
    itemAboveClass,
    itemUpClass,
    itemCurrentClass,
    itemDownClass,
    itemBelowClass,
    itemBottomClass,
  } = classNames.knowledge;
  let i;
  const topItem = document.querySelector(`.${styles[itemTopClass]}`);
  const aboveItem = document.querySelector(`.${styles[itemAboveClass]}`);
  const upItem = document.querySelector(`.${styles[itemUpClass]}`);
  const currentItem = document.querySelector(`.${styles[itemCurrentClass]}`);
  const downItem = document.querySelector(`.${styles[itemDownClass]}`);
  const belowItem = document.querySelector(`.${styles[itemBelowClass]}`);
  const bottomItem = document.querySelector(`.${styles[itemBottomClass]}`);
  knowledgeList.forEach((item, index) => {
    if (topItem.textContent === item) i = index - 1;
  });
  if (i === -1) i = knowledgeList.length - 1;
  bottomItem.textContent = knowledgeList[i];
  topItem.classList.replace(styles[itemTopClass], styles[itemAboveClass]);
  aboveItem.classList.replace(styles[itemAboveClass], styles[itemUpClass]);
  upItem.classList.replace(styles[itemUpClass], styles[itemCurrentClass]);
  currentItem.classList.replace(styles[itemCurrentClass], styles[itemDownClass]);
  downItem.classList.replace(styles[itemDownClass], styles[itemBelowClass]);
  belowItem.classList.replace(styles[itemBelowClass], styles[itemBottomClass]);
  bottomItem.classList.replace(styles[itemBottomClass], styles[itemTopClass]);
  upItem.style.background = 'var(--secondaryColor)';
  setColor('var(--backgroundColor)', aboveItem, currentItem);
};

export { moveKnowledgeDown, moveKnowledgeUp };
