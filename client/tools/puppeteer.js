/* eslint-disable import/no-extraneous-dependencies */
const { green, cyan, red } = require('chalk');
const puppeteer = require('puppeteer');
const fs = require('fs');
const minimalcss = require('minimalcss');
const logger = require('./logger');

const twentyKb = 20 * 1024;

const preloadPolyfill = fs.readFileSync(`${__dirname}/vendor/preload_polyfill.min.js`, 'utf8');

const launchPuppeteer = async () => {
  logger.log(cyan('Crawling: ') + green('Launching puppeteer...'));
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1200,
    height: 1900,
  });
  return page;
};

const autoScroll = async (page) => {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 1000;
      const timer = setInterval(() => {
        const { scrollHeight } = document.body;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
};

const fetchPage = async (pagePath, page, options) => {
  try {
    const { scrollDown = false } = options || {};
    logger.log(cyan('Crawling: ') + green(`Crawling page ${pagePath}...`));
    await page.goto(pagePath, { waitUntil: 'networkidle0' });
    logger.log(cyan('Crawling: ') + green(`networkidle0 at ${pagePath}`));
    if (scrollDown) {
      let isAtBottom = false;
      await autoScroll(page);
      while (!isAtBottom) {
        let time = Number(new Date().getTime());
        // eslint-disable-next-line no-await-in-loop
        await page.waitForNetworkIdle();
        time = Number(new Date().getTime()) - time;
        logger.log(time);
        if (time > 550) {
          // eslint-disable-next-line no-await-in-loop
          await autoScroll(page);
        } else {
          isAtBottom = true;
        }
      }
      logger.log(cyan('Crawling: ') + green(`scrolled down ${pagePath}`));
    }
  } catch (error) {
    logger.log(red(`Error while crawling ${pagePath} - ${error}`));
  }
};

const getLinks = async (page) => {
  const anchors = await page.evaluate(() =>
    Array.from(document.querySelectorAll("a,link[rel='alternate']")).map((anchor) => {
      if (anchor.href.baseVal) {
        const a = document.createElement('a');
        a.href = anchor.href.baseVal;
        return a.href;
      }
      return anchor.href;
    })
  );
  const validPaths = [
    ...new Set(
      anchors.filter((anchor) => {
        if (anchor.includes('http://localhost:3500', '')) {
          return anchor !== 'http://localhost:3500/' && anchor !== 'http://localhost:3500/#';
        }
        return false;
      })
    ),
  ];
  return validPaths;
};

const inlineCriticalCss = async (to, page, browser) => {
  logger.log(cyan('Crawling: ') + green('Generating critical css...'));
  const minimalcssResult = await minimalcss.minimize({
    url: to,
    skippable: (request) => !request.url().startsWith('http://localhost:3500'),
    browser,
  });
  const criticalCss = minimalcssResult.finalCss;
  const criticalCssSize = Buffer.byteLength(criticalCss, 'utf8');
  if (criticalCssSize > twentyKb) {
    logger.log(
      red(`warning: critical CSS more than 20kb (${(criticalCssSize / 1024).toFixed(2)}kb)`)
    );
  }
  logger.log(cyan('Crawling: ') + green('Appending critical css...'));
  await page.evaluate(
    (_criticalCss, _preloadPolyfill) => {
      const head = document.head || document.getElementsByTagName('head')[0];
      const style = document.createElement('style');
      style.type = 'text/css';
      style.appendChild(document.createTextNode(_criticalCss));
      head.appendChild(style);
      const scriptTag = document.createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.text = _preloadPolyfill;
      // scriptTag.id = "preloadPolyfill";
      document.body.appendChild(scriptTag);
    },
    criticalCss,
    preloadPolyfill
  );
};

const copyPageHtml = async (pageName, page) => {
  logger.log(cyan('Crawling: ') + green(`Generating static ${pageName || 'index.html'} page...`));
  let content = await page.content();
  content = content.replace(/http:\/\/localhost:3500/g, 'https://90degreegames.com');
  logger.log(cyan('Crawling: ') + green(`Saving static ${pageName || 'index.html'} page...`));
  const filePath = pageName ? pageName.split('/') : [];
  if (filePath.length > 1) {
    let tempPath = './build';
    filePath.forEach((subPath, index, { length }) => {
      if (index < length - 1) {
        tempPath += `/${subPath}`;
        if (!fs.existsSync(tempPath)) {
          fs.mkdirSync(tempPath);
        }
      }
    });
  }
  fs.writeFileSync(`./build/${pageName || 'index.html'}`, content);
  logger.log(
    cyan('Crawling: ') + green(`Static ${pageName || 'index.html'} was successfully Saved!`)
  );
};

const buildCrawl = async (to) => {
  const page = await launchPuppeteer();

  await fetchPage(to, page);
  // await inlineCriticalCss(to, page);
  await copyPageHtml(null, page);
  // await page.close();
  // Create route for every link in index page
  // |
  // V
  const validPaths = await getLinks(page);
  let chain = Promise.resolve(true);
  validPaths.forEach((validPath, index) => {
    chain = chain.then(() =>
      fetchPage(`${validPath}?loading=forever`, page).then(async () => {
        const validPathName = validPath.replace('http://localhost:3500/', '');
        validPaths[index] = validPathName;
        // await inlineCriticalCss(`${to}/${validPathName}`, page);
        return copyPageHtml(`${validPathName}.html`, page);
      })
    );
  });
  await chain.then(() => {
    logger.log(cyan('Crawled: ') + green('All static pages was successfully Saved!'));
  });
  return validPaths;
  // END OF Create route for every link in index page
};

const redditCrawl = async () => {
  const page = await launchPuppeteer();
  await fetchPage('https://www.reddit.com/user/90DegreeGames/', page, { scrollDown: true });
  const redditPosts = await page.evaluate(() => {
    window.scroll({ top: window.page });
    const tempPosts = [];
    Array.from(document.querySelectorAll("a,link[rel='alternate']")).forEach((anchor) => {
      let a = anchor;
      if (a.href.baseVal) {
        a = document.createElement('a');
        a.href = anchor.href.baseVal;
      }
      a.href = a.href.replace('reddit', 'redditmedia');
      if (
        !tempPosts.some(
          (tempPost) =>
            tempPost.replace('https://www.redditmedia.com/', '').split('/')[4] ===
            a.href.replace('https://www.redditmedia.com/', '').split('/')[4]
        ) &&
        a.href.includes('/comments/') &&
        !a.href.includes('/comment/') &&
        !a.href.includes('/user')
      ) {
        tempPosts.push(a.href);
      }
    });
    return tempPosts;
  });
  fs.writeFileSync('redditPosts.json', JSON.stringify(redditPosts));
  logger.log(cyan('Crawling: ') + green(`Saved posts to redditPosts.json`));
  page.close();
};

const addRedditPosts = async () => {
  const {
    adminUrl = 'https://90degreegames.com',
    adminUser = 'user',
    adminPassword = 'password',
  } = JSON.parse(fs.readFileSync('secrets.json', { encoding: 'utf-8' }));
  const page = await launchPuppeteer();
  await fetchPage(adminUrl, page);
  await page.waitForNetworkIdle();
  await page.type('.login__input_user', adminUser, { delay: 50 });
  await page.type('.login__input_password', adminPassword, { delay: 50 });
  await page.waitForTimeout(500);
  await page.click('.admin-login__submit-button');
  await page.waitForTimeout(500);
  await page.waitForNetworkIdle();
  await page.click('.admin-menu-button[name=Edit]');
  const currentPosts = JSON.parse(fs.readFileSync('redditPosts.json', { encoding: 'utf-8' }));
  let chain = Promise.resolve(true);
  currentPosts.reverse().forEach((currentPost) => {
    const asyncFunc = async () => {
      await page.type('.admin__form-input[name=postUrl]', currentPost, { delay: 50 });
      await page.waitForTimeout(500);
      await page.click('.admin__form-submit-button');
      await page.waitForNetworkIdle();
    };
    chain = chain.then(asyncFunc);
  });
};

module.exports = {
  buildCrawl,
  redditCrawl,
  addRedditPosts,
};
