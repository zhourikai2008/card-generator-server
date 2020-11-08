const FILE = require('fs');
const PATH = require('path');

const RESULT_UTIL = require('../common/utils/resultutil');

exports.add = function (obj_data) {
    return new Promise(function(resolve, reject) {
        resolve(RESULT_UTIL.result(0, '操作成功！', { id: 1 }));
        return;
        if (obj_data.id) {
            resolve(RESULT_UTIL.result(0, '操作成功！'));
            return;
        } else {
            reject(RESULT_UTIL.err(err, 1, '操作失败！'));
            return;
        }
    });
};
