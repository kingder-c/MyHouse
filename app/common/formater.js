'use strict';
const cheerio = require('cheerio');

module.exports = function load58Info(html) {
  const $ = cheerio.load(html);
  const arr = [];
  const nowDate = new Date();
  const dateStr = nowDate.getFullYear() + '-' + (nowDate.getMonth() + 1) + '-' + nowDate.getDate();
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
    item.allPrice = +$(this).find('.price .sum b').text() * 10000;
    item.unitPrice = parseInt($(this).find('.price .unit').text());
    item.date = dateStr;

    arr.push(item);
  });
  return arr;
};
