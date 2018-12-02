// import { resolve } from 'url';

'use strict';

const Controller = require('egg').Controller;
const getHtml = require('../common/unit');
const load58Info = require('../common/formater');
const mongoose = require('mongoose');

class HomeController extends Controller {
  async getHouseInfo() {
    const baseUrl = 'https://wf.58.com/';
    const List = [ 'kuiwen/ershoufang/pn', 'wfgaoxinqu/ershoufang/pn', 'weicheng/ershoufang/pn', 'hanting/ershoufang/pn' ];
    const houseInfo = [];
    let waitFlag = false;
    for (let i = 0; i < List.length; i++) {
      const areaUrl = baseUrl + List[i];
      for (let j = 1; j <= 10; j++) {
        if (waitFlag) {
          waitFlag = !waitFlag;
          j--;
        }
        const pageUrl = areaUrl + j + '/';
        let html = '';
        await getHtml(pageUrl).then(res => {
          html = res;
        });
        if (load58Info(html).length === 0) {
          await this.wait();
          waitFlag = true;
        }
        console.log(i, j);
        console.log(load58Info(html).length);
        houseInfo.push(...load58Info(html));
      }
    }
    // this.ctx.body = JSON.stringify(houseInfo);
    mongoose.connect('mongodb://106.12.144.76:27017/local', function(err) {
      if (err) {
        console.log(err);
      }
      if (!err) {
        const schema = new mongoose.Schema({
          title: String,
          type: String,
          area: Number,
          origined: String,
          layer: String,
          community: String,
          district: String,
          address: String,
          allPrice: Number,
          unitPrice: Number,
          date: String,
        });
        const housecollect = mongoose.model('housecollect', schema);
        housecollect.create(...houseInfo, function(err) {
          console.log('共录入' + houseInfo.length + '条');
          if (err) {
            console.log(err);
          }
        });
      }
    });

  }
  async wait() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(1);
      }, 90000);
    });
  }
}

module.exports = HomeController;
