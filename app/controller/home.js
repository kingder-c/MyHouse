'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;

module.exports = class getHouseByTime extends Controller {
  async getTimeByTime() {
    this.ctx.body = {
      test: 'test',
    };
  }
};
