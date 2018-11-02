'use strict';

const Subscription = require('egg').Subscription;
// const getHouseInfo = require('../controller/pushInfo');
const getDate = require('../common/getData');

class getHouseData extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  // constructor() {
  //   console.log(getHouseInfo);
  // }
  static get schedule() {
    return {
      interval: (60 * 24 + 'm'), // 1 分钟间隔
      // interval: ('1m'), // 1 分钟间隔
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const a = new getDate();
    // console.log(a.getHouseInfo);
    await a.getHouseInfo();
  }
}

module.exports = getHouseData;
