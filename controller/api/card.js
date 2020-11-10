const RESULT_UTIL = require('../../common/utils/resultutil');

const SERVICE_CARD = require('../../service/card');

module.exports = function(router) {
    router.post('/', function(req, res) {
        SERVICE_CARD.add(req.body).then(function (result) {
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

    router.get('/', function(req, res) {
        SERVICE_CARD.get(req.query).then(function (result) {
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