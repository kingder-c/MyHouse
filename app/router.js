'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
};
module.exports = getHouseByTime => {
  const { router, controller } = getHouseByTime;
  router.get('/getHouseByTime', controller.home.index);
};
