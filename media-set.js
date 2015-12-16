'use strict';

const li = require('lorem-ipsum');

const count = 50;
const images  = ['abstract', 'animals', 'business', 'cats', 'city', 'food', 'nightlife',
 'fashion', 'people', 'nature', 'sports', 'technics', 'transport'];


var entries = [];
for(let i = 0; i < count; i++) {

  let item = {
    title: 'Set ' + Math.floor(Math.random()*1000000)
  };
  entries.push(item);

  item.media = [];
  let num = Math.ceil(Math.random()*6);

  for(let j = 0; j < num; j++) {
    let img = Math.floor(Math.random()*13);
    let gray = !!Math.floor(Math.random()*2);
    let words = Math.floor(Math.random()*5) + 5;

    item.media.push({
      text: li({
        count: words,
        units: 'words'
      }),
      image: `http://lorempixel.com/${ gray && 'g/' || '' }133/100/${ images[img] }`,
      link: 'http://www.google.com'
    });
  }
}


module.exports = {
  list (request, reply) {
    let qs = request.query;
    let res = [];

    let start = parseInt(qs.start) || 0;
    let rows = parseInt(qs.rows) || 10;

    for(let i = 0; i < rows && (start+i) < count; i++) {
      res.push(entries[start+i]);
    }
    reply({
      numFound: count,
      docs: res
    });
  }
};
