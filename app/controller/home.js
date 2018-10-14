'use strict';

const Controller = require('egg').Controller;
const http = require('http');

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
  async getHouseByTime() {
    const pageUrl = 'http://www.baidu.com/';
    let html = '';
    html = await http.get(pageUrl, res => {
      res.on('data', data => {
        html += data;
      });
      res.on('end', () => {
        console.log(html);
      });
    });
    this.ctx.body = html.toString();
  }
}

module.exports = HomeController;
