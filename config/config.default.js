'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1539014530498_9006';

  // add your config here
  config.middleware = [];
  config.customLogger = {
    scheduleLogger: {
      consoleLevel: 'NONE',
      file: path.join(appInfo.root, 'logs', appInfo.name, 'egg-schedule.log'),
    },
  };

  return config;
};
