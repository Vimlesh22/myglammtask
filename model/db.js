const mongoose = require('mongoose');

function connect() {
    mongoose.connect("mongodb://127.0.0.1:27017/testdb");

    mongoose.connection.on('connected', () => {
        console.log("Database connected...!!!");
    });

    mongoose.connection.on('error', (err) => {
        console.log('Mongoose Error :-', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Database disconnected ');
    });
}

module.exports = {
    connect : connect
}

