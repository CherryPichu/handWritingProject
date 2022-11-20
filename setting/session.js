





const session = require('express-session');

/**
 * 세션 선언
 * How to use?
 * require("./setting/session")(app)
 */
module.exports = (app) => {


    const sessionMiddleware = session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
        },
    })
    app.use(sessionMiddleware)
}


