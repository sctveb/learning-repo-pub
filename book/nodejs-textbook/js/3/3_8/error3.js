process.on('uncaughtException', (err) => {
    console.error('에러',err);
});

setInterval(() => {
   throw new Error('에러다');
}, 1000);

setTimeout(() => {
    console.log('실행');
}, 2000);