const fs = require('fs');

setInterval(() => {
   fs.unlink('./abcde.js', (err) => {
       if (err) {
           console.log(err);
       }
   });
}, 1000);