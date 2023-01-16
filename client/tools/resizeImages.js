const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../src/images');

const run = () => {
  // fs.readdirSync(`${imagesDir}/gallery`).forEach((file) => {
  //   const [name, suffix] = file.split('.');
  //   if (suffix && ['png', 'webp'].includes(suffix) && name.includes('768x432')) {
  //     sharp(`${imagesDir}/gallery/${file}`)
  //       .resize(200) // width, height
  //       .toFile(`${imagesDir}/gallery/${name}-small.${suffix}`)
  //       .then(() => {
  //         sharp(`${imagesDir}/gallery/${file}`)
  //           .resize(300) // width, height
  //           .toFile(`${imagesDir}/gallery/${name}-768x432.${suffix}`)
  //           .then(() => {
  //             fs.unlinkSync(`${imagesDir}/gallery/${file}`);
  //             fs.renameSync(
  //               `${imagesDir}/gallery/${name}-768x432.${suffix}`,
  //               `${imagesDir}/gallery/${file}`
  //             );
  //           });
  //       });
  //   }
  // });
  fs.readdirSync(`${imagesDir}`).forEach((file) => {
    const [name, suffix] = file.split('.');
    if (suffix && suffix === 'png' && ['noTimeLogoWebsite', 'LibraryLogo2'].includes(name)) {
      sharp(`${imagesDir}/${file}`)
        .resize(1280, 1280) // width, height
        .toFile(`${imagesDir}/${name}-large.${suffix}`);
    }
  });
};

const cleanUp = () => {
  fs.readdirSync(`${imagesDir}`).forEach((file) => {
    const [name, suffix] = file.split('.');
    if (suffix && name.includes('768x432-768x432')) {
      fs.unlinkSync(`${imagesDir}/${file}`);
    } else if (!suffix) {
      fs.readdirSync(`${imagesDir}/${file}`).forEach((innerFile) => {
        const [innerName, innerSuffix] = innerFile.split('.');
        if (innerSuffix && innerName.includes('768x432-768x432')) {
          fs.unlinkSync(`${imagesDir}/${file}/${innerFile}`);
        }
      });
    }
  });
};

run();
