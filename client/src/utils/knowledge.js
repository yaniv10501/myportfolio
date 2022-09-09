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
  const topItem = document.querySelector(`.${itemTopClass}`);
  const aboveItem = document.querySelector(`.${itemAboveClass}`);
  const upItem = document.querySelector(`.${itemUpClass}`);
  const currentItem = document.querySelector(`.${itemCurrentClass}`);
  const downItem = document.querySelector(`.${itemDownClass}`);
  const belowItem = document.querySelector(`.${itemBelowClass}`);
  const bottomItem = document.querySelector(`.${itemBottomClass}`);
  knowledgeList.forEach((item, index) => {
    if (bottomItem.textContent === item) i = index + 1;
  });
  if (i === knowledgeList.length) i = 0;
  topItem.textContent = knowledgeList[i];
  aboveItem.classList.replace(itemAboveClass, itemTopClass);
  upItem.classList.replace(itemUpClass, itemAboveClass);
  currentItem.classList.replace(itemCurrentClass, itemUpClass);
  downItem.classList.replace(itemDownClass, itemCurrentClass);
  belowItem.classList.replace(itemBelowClass, itemDownClass);
  bottomItem.classList.replace(itemBottomClass, itemBelowClass);
  topItem.classList.replace(itemTopClass, itemBottomClass);
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
  const topItem = document.querySelector(`.${itemTopClass}`);
  const aboveItem = document.querySelector(`.${itemAboveClass}`);
  const upItem = document.querySelector(`.${itemUpClass}`);
  const currentItem = document.querySelector(`.${itemCurrentClass}`);
  const downItem = document.querySelector(`.${itemDownClass}`);
  const belowItem = document.querySelector(`.${itemBelowClass}`);
  const bottomItem = document.querySelector(`.${itemBottomClass}`);
  knowledgeList.forEach((item, index) => {
    if (topItem.textContent === item) i = index - 1;
  });
  if (i === -1) i = knowledgeList.length - 1;
  bottomItem.textContent = knowledgeList[i];
  topItem.classList.replace(itemTopClass, itemAboveClass);
  aboveItem.classList.replace(itemAboveClass, itemUpClass);
  upItem.classList.replace(itemUpClass, itemCurrentClass);
  currentItem.classList.replace(itemCurrentClass, itemDownClass);
  downItem.classList.replace(itemDownClass, itemBelowClass);
  bottomItem.classList.replace(itemBottomClass, itemTopClass);
  belowItem.classList.replace(itemBelowClass, itemBottomClass);
  upItem.style.background = 'var(--secondaryColor)';
  setColor('var(--backgroundColor)', aboveItem, currentItem);
};

export { moveKnowledgeDown, moveKnowledgeUp };
