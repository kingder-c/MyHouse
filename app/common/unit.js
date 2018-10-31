'use strict';

const https = require('https');

module.exports = async function getHtml(pageUrl) {
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
};
