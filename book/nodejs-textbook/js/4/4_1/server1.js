const http = require('http');

http.createServer((req,res) => {
    res.write('<h1>hello world</h1>');
    res.end('<p>hello server</p>');
}).listen(8888, () => {
    console.log('8888포트')
});