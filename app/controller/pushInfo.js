'use strict';

const Controller = require('egg').Controller;
const https = require('https');
const cheerio = require('cheerio');

class HomeController extends Controller {
  async getHouseInfo() {
    const pageUrl = 'https://wf.58.com/kuiwen/ershoufang/';
    let html = '';
    await this.getHtml(pageUrl).then(res => {
      html = res;
    });
    this.ctx.body = JSON.stringify(this.load58Info(html));

  }
  async getHtml(pageUrl) {
    let html = '';
    return new Promise((resolve, reject) => {
      https.get(pageUrl, res => {
        res.on('data', data => {
          html += data;
        });
        res.on('end', () => {
          resolve(html);
        });
        res.on('error', e => {
          reject(e);
        });
      });
    });
  }
  load58Info(html) {
    const $ = cheerio.load(html);
    const arr = [];
    $('.house-list-wrap li').each(function() {
      const item = {};
      // 获取标题
      item.title = $(this).find('.title a').text();
      // 获取类型
      item.type = $(this).find('.baseinfo').eq(0)
        .find('span')
        .eq(0)
        .text();
      // 获取面积
      item.area = parseFloat($(this).find('.baseinfo').eq(0)
        .find('span')
        .eq(1)
        .text());
      // 获取朝向
      item.origined = $(this).find('.baseinfo').eq(0)
        .find('span')
        .eq(2)
        .text();
      // 获取层数
      item.layer = $(this).find('.baseinfo').eq(0)
        .find('span')
        .eq(3)
        .text();
      // 获取小区
      item.community = $(this).find('.baseinfo').eq(1)
        .find('a')
        .eq(0)
        .text();
      // 获取行政区
      item.district = $(this).find('.baseinfo').eq(1)
        .find('a')
        .eq(1)
        .text();
      // 获取地址
      item.address = $(this).find('.baseinfo').eq(1)
        .find('a')
        .eq(2)
        .text();
      item.allPrice = +$(this).find('.price .sum b').text();
      item.unitPrice = parseInt($(this).find('.price .unit').text());

      arr.push(item);
    });
    return arr;
  }
}

module.exports = HomeController;
