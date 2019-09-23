const mongoose = require('mongoose');
const dotenv = require('dotenv');


module.exports = () => {
    dotenv.config();
    const connect = () => {
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true);
        }
        mongoose.connect(`mongodb://${process.env.MONGODBID}:${process.env.MONGODBPWD}@localhost:27017/admin`, {
            dbName: 'nodejs',
        }, (error) => {
            if (error) {
                console.log(`error: ${error}`)
            } else {
                console.log(`connect success`)
            }
        });
    };
    connect();
    mongoose.connection.on('error', (error) => {
        console.error(`error: ${error}`)
    });
    mongoose.connection.on('disconnected', () => {
        console.error(`mongodb is disconnected, try reconnect`)
        connect();
    });
    require('./user');
    require('./comment');
}