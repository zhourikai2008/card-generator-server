var RESULT_UTIL = require('../common/utils/resultutil');

exports.add = function (obj_data) {
    return new Promise(function(resolve, reject) {
        if (obj_data) {
            resolve(RESULT_UTIL.result(0, '操作成功！'));
            return;

        } else {
            reject(RESULT_UTIL.err(err, 1, '操作失败！'));
            return;
        }
    });
};
