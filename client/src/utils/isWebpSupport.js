import { browserName, browserVersion, osVersion } from 'react-device-detect';

const pngOnlyBrowsers = [
  { name: 'Safari', version: 15.5, osVersion: 11 },
  'IE',
  { name: 'Chrome', version: 31 },
  { name: 'Firefox', version: 64 },
  { name: 'Edge', version: 17 },
  { name: 'Opera', version: 18 },
  { name: 'Mobile Safari', version: 13.7 },
  { name: 'Samsung Browser', version: 4.1 },
];
const isWebpSupport = () => {
  const isPngOnlyDevice = pngOnlyBrowsers.some((pngOnlyBrowser) => {
    if (typeof pngOnlyBrowser === 'string' && pngOnlyBrowser === browserName) {
      return true;
    }
    const {
      name = '',
      version = 0,
      osVersion: pngOnlyOsVersion = Number(osVersion.split('.')[0]) + 1,
    } = pngOnlyBrowser || {};
    if (
      name === browserName &&
      version >= Number(browserVersion) &&
      pngOnlyOsVersion >= Number(osVersion.split('.')[0])
    ) {
      return true;
    }
    return false;
  });
  return !isPngOnlyDevice;
};
export default isWebpSupport;
