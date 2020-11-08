const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const enrouten = require('express-enrouten');

const CONFIG = require('./config/config');

const app = express();

//设置icon
// app.use(favicon(__dirname + '/public/img/favicon.ico'));
//log4js配置
app.use(require('./common/utils/logutil').connectLogger);

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public/img/', 'favicon.ico')));
//app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({extended: true, limit: '100mb'}));
app.use(expressValidator());

//session配置,配置/web下的请求都有session
const session_option = {
    secret: CONFIG.session.secret,   // 密钥
    resave : true,
    rolling: false,  // 强制在每一个response中都发送session标识符的cookie。
    saveUninitialized : false,   // 是指无论有没有session cookie，每次请求都设置个session cookie ，默认给个标示为 connect.sid
    cookie : CONFIG.session.cookie
};
app.use(session(session_option));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', require('./interceptor/web').filter);
app.use('/api', require('./interceptor/api').filter);

//app.set('case sensitive routing', true);
app.use(enrouten({
    directory: 'controller'
}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    //TODO 接口返回时记录log

    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

module.exports = app;