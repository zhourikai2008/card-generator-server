const RESULT_UTIL = require('../../common/utils/resultutil');

const SERVICE_DEMO = require('../../service/demo');

module.exports = function(router) {
    router.get('/add', function(req, res) {
        SERVICE_DEMO.add(req.query).then(function (result) {
            if (result.code !== 0) {
                res.json(RESULT_UTIL.err(result.msg, 1, '操作失败！'));
                return;
            }

            res.json(RESULT_UTIL.result(0, result.msg, result.data));
            return;
        }).catch(function (error) {
            res.json(RESULT_UTIL.err(error, 1, '操作失败！'));
            return;
        });
    });
};