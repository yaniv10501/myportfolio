/* eslint-disable import/no-extraneous-dependencies */
const { green, cyan, red } = require('chalk');
const path = require('path');
const fs = require('fs');
const { shell } = require('./common');
const logger = require('./logger');

const validSuffixes = ['png', 'jpg', 'jpeg'];
const wepbSuffix = 'webp';

const imagesDir = path.join(__dirname, '../src/images');

const subFoldersQueue = [];

const checkSubFolder = (rootDir, subFolderName) => {
  try {
    const subFolder = fs.readdirSync(path.join(rootDir, subFolderName));
    if (Array.isArray(subFolder) && subFolder.length > 0) {
      subFoldersQueue.push({
        name: subFolderName,
        files: subFolder,
      });
      return 'folder';
    }
    return null;
  } catch (error) {
    logger.log(red('Error - ') + cyan(error));
    return null;
  }
};

const checkImageSuffix = (name, suffix) => {
  if (!suffix) {
    return checkSubFolder(imagesDir, name);
  }
  if (validSuffixes.some((validSuffix) => suffix === validSuffix)) {
    return name;
  }
  return null;
};
const checkExistingWebp = (imagesList, imageName) =>
  imagesList.some((image) => {
    const [name, suffix] = image.split('.');
    if (suffix === wepbSuffix && name === imageName) {
      return true;
    }
    return false;
  });

const processImagesList = (convertedList, listToProcess, subFolder = '') => {
  let chain = Promise.resolve(true);
  listToProcess.forEach((image) => {
    chain = chain.then(
      () =>
        new Promise((resolve) => {
          const [name, suffix] = image.split('.');
          const isValid = checkImageSuffix(name, suffix);
          if (isValid === 'folder') {
            logger.log(cyan('Sub Folder Added to queue - ') + green(name));
            resolve();
          } else if (isValid) {
            const isAlreadyConverted = checkExistingWebp(listToProcess, name);
            if (!isAlreadyConverted) {
              logger.log(cyan('Converting image: ') + green(image));
              shell(
                `cwebp -q 80 ${imagesDir}${subFolder}/${image} -o ${imagesDir}${subFolder}/${name}.webp`
              )
                .then(() => {
                  logger.log(cyan('Converted image: ') + green(`${name}.webp`));
                  convertedList.push(
                    `${subFolder ? `${subFolder.replace('/', '')}/` : ''}${name}.webp`
                  );
                  resolve();
                })
                .catch((error) => {
                  logger.log(red('Error - ') + cyan(error));
                  resolve();
                });
            } else {
              logger.log(
                red('Image is already converted at ') +
                  cyan(`${imagesDir}${subFolder}/${name}.wepb`)
              );
              resolve();
            }
          } else {
            logger.log(red('Image is not valid ') + cyan(image));
            resolve();
          }
        })
    );
  });
  return chain;
};

const convertImages = () => {
  logger.log(cyan('Checking images directory...'));
  if (fs.existsSync(imagesDir)) {
    const imagesList = fs.readdirSync(imagesDir);
    const convertedList = [];
    let chain = processImagesList(convertedList, imagesList);
    chain = chain.then(
      () =>
        new Promise((resolve) => {
          while (subFoldersQueue.length > 0) {
            const currentSubFolder = subFoldersQueue.shift();
            chain = chain.then(() => {
              logger.log(cyan('Processing Sub Folder - ') + green(currentSubFolder.name));
              return processImagesList(
                convertedList,
                currentSubFolder.files,
                `/${currentSubFolder.name}`
              );
            });
          }
          resolve();
          chain.then(() => {
            if (convertedList.length > 0) {
              logger.log(
                cyan('Converted: ') +
                  green(`${convertedList.length} Images were successfully converted!`)
              );
              convertedList.forEach((convertedImage, convertedIndex) => {
                logger.log(
                  green(`${convertedIndex + 1}. `) + cyan(`${imagesDir}/${convertedImage}`)
                );
              });
            } else {
              logger.log(red('No images were converted!'));
            }
          });
        })
    );
  } else {
    logger.log(red('Cant find ') + cyan(imagesDir) + red(' directory!'));
  }
};

convertImages();
