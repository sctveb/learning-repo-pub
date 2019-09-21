setInterval(() => {
    console.log('시작');
    try {
        throw new Error('서버고장');
    }
    catch (err) {
        console.log(err);
    }
}, 1000);