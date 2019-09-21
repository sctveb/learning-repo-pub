const fs = require('fs');

console.log('시작');
let data = fs.readFileSync('./readme.txt');
console.log('1', data.toString());
data = fs.readFileSync('./readme.txt');
console.log('2', data.toString());
data = fs.readFileSync('./readme.txt');
console.log('3', data.toString());

console.log('끝');