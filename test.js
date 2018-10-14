'use strict';

const http = require('https');
const cheerio = require('cheerio');

function getDataTask() {
  const pageUrl = 'https://wf.58.com/ershoufang/pn2/';
  let html = '';
  html = http.get(pageUrl, res => {
    res.on('data', data => {
      html += data;
    });
    res.on('end', () => {
      const $ = cheerio.load(html);
      const list = [];
      console.log($('.house-list-wrap').length);
      $('.house-list-wrap').find('li').each(function(index, elem) {
        list.push(parseFloat($(elem).find('.unit').html()));
      });
      console.log(list);
    });
  });
}
getDataTask();
