// 项目端口
exports.ServerPort = 8000;

// session  配置
const SESSION_TIMEOUT = 24 * 60 * 60;   //  Session  过期时间（单位：秒）
exports.session = {
    secret: 'card-generator-secret',    // 密钥
    cookie: {
        maxAge: SESSION_TIMEOUT * 1000 // cookie   过期时间（单位：毫秒）
    },
};
