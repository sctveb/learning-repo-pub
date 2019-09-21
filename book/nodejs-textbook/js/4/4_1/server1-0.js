const http = require('http');

const server = http.createServer((req,res) => {
    res.write('<h1>hello world</h1>');
    res.end('<p>hello server</p>');
});
server.listen(8888);

server.on('listening', () => {
    console.log('8888');
});

server.on('error', (error) => {
    console.log(error);
});