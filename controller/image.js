const FILE = require('fs');
const PATH = require('path');

const RESULT_UTIL = require('../common/utils/resultutil');

const pathImage = PATH.resolve(PATH.join('public', 'image'));

module.exports = function(router) {
    router.get('/:image', function (req, res) {
        const image = req.params.image;
        const imageFile = PATH.join(pathImage, image);
        if (FILE.existsSync(imageFile)) {
            res.sendFile(imageFile);
            return;
        } else {
            res.json(RESULT_UTIL.err('文件不存在！', 1, '操作失败！'));
            return;
        }
    });
};