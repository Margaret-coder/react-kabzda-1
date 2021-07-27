const session = require('express-session');
const MongoStore = require('connect-mongo')
const { connection_string } = require('../config');

module.exports = (app) => {
    app.use(
        session({
            secret: 'story book',
            resave: true,
            saveUninitialized: false,
            cookie: { 
                maxAge: 3600000,
                secure: false, 
                httpOnly: true 
            },
            store: MongoStore.create({
                mongoUrl: connection_string,
                autoRemove: 'disabled'
            })
        })
    );
}