const url = require('url');

const URL = url.URL;
const myURL = new URL('https://www.naver.com');
console.log('new URL():', myURL);
console.log('url.format():', url.format(myURL));
const parsedURL = url.parse('http://www.naver.com');
console.log('url.parse()', parsedURL);
console.log('url.format():', url.format(parsedURL));