const FILE = require('fs');
const PATH = require('path');

const RESULT_UTIL = require('../common/utils/resultutil');

const pathPublic = PATH.resolve(PATH.join('public'));
const pathFile = PATH.resolve(PATH.join('public', 'file'));
const pathImage = PATH.resolve(PATH.join('public', 'image'));
const pathFileId = PATH.resolve(PATH.join('public', 'file', 'id.json'));
const defaultIdJson = {
    Creature: 0,
    Spell: 0,
    Event: 0,
    Tactics: 0,
};

function checkDir(path) {
    try {
        FILE.statSync(path);
    } catch (e) {
        FILE.mkdirSync(path);
    }
}

function checkFile(path, data) {
    try {
        FILE.statSync(path);
    } catch (e) {
        FILE.writeFileSync(path, data);
    }
}

function checkNeedFile() {
    checkDir(pathPublic);
    checkDir(pathFile);
    checkDir(pathImage);

    checkFile(pathFileId, JSON.stringify(defaultIdJson));
}

function createId(type, num) {
    const code = type[0].toLocaleUpperCase();
    while (String(num).length < 4) {
        num = '0' + num;
    }

    return `${code}${num}`;
}

exports.add = function (obj_data) {
    return new Promise(function(resolve, reject) {
        const {
            params,
            base64,
        } = obj_data;
        if (!params || !base64) {
            reject(RESULT_UTIL.err('缺少参数', 1, '操作失败！'));
            return;
        }

        checkNeedFile();
        const IdMap = JSON.parse(FILE.readFileSync(pathFileId, 'utf-8'));
        const id = createId(params.type, IdMap[params.type]);

        IdMap[params.type] += 1;
        FILE.writeFileSync(pathFileId, JSON.stringify(IdMap));
        FILE.writeFileSync(PATH.join(pathFile, `${id}.json`), JSON.stringify({id, ...params}));
        var buffer = Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        FILE.writeFileSync(PATH.join(pathImage, `${id}.png`), buffer);

        resolve(RESULT_UTIL.result(0, '操作成功！', {id}));
        return;
    });
};

exports.get = function (obj_data) {
    return new Promise(function(resolve, reject) {
        const {
            id,
        } = obj_data;
        if (!id) {
            reject(RESULT_UTIL.err('缺少参数', 1, '操作失败！'));
            return;
        }

        let data = {};
        try {
            data = JSON.parse(FILE.readFileSync(PATH.join(pathFile, `${id}.json`), 'utf-8'));
        } catch (e) {
            reject(RESULT_UTIL.err(e, 1, '操作失败！'));
            return;
        }

        resolve(RESULT_UTIL.result(0, '操作成功！', data));
        return;
    });
};
