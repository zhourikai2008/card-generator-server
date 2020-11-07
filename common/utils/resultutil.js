var LOG_UTIL = require('./logutil.js');

module.exports.result = function(code, msg, data) {
    if (!msg && code === 0) {
        msg = 'ok';
    }
    if (!data) {
        data = {};
    }
    var result = {code : code, msg : msg, data : data};

    if (result.code !== 0) {
        console.warn('--------------------------------------------------------------------------------------------------------------');
        console.warn(JSON.stringify(result));
        console.warn('--------------------------------------------------------------------------------------------------------------');
        LOG_UTIL.logger.warn('--------------------------------------------------------------------------------------------------------------');
        LOG_UTIL.logger.warn(JSON.stringify(result));
        LOG_UTIL.logger.warn('--------------------------------------------------------------------------------------------------------------');
    }

    return result;
};

/*
 * result  返回结果格式2
 */
module.exports.err = function(err, code, msg, data) {
    if (!msg && code === 0) {
        msg = 'ok';
    }
    if (!data) {
        data = {};
    }
    var result = {code : code, msg : msg, data : data};

    if (typeof(err) === 'object'
        && typeof(err.code) === 'number'
        && typeof(err.msg) === 'string'
        && err.code >= code) {
            result = err;
    } else if (err.toString().indexOf(result.msg.toString()) >= 0) {
        result.msg = err;
    } else if (result.msg.toString().indexOf(err.toString()) < 0) {
        result.msg += err;
    }

    console.error('--------------------------------------------------------------------------------------------------------------');
    console.error(JSON.stringify(result));
    console.error('--------------------------------------------------------------------------------------------------------------');
    LOG_UTIL.logger.error('--------------------------------------------------------------------------------------------------------------');
    LOG_UTIL.logger.error(JSON.stringify(result));
    LOG_UTIL.logger.error('--------------------------------------------------------------------------------------------------------------');

    return result;
};