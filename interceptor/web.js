var FILE = require('fs');
var PATH = require('path');

exports.filter = function(request, response, next) {
    var _str_render = request.url;
    if (_str_render == '/api' || _str_render.indexOf('/api/') == 0 || _str_render.indexOf('/api?') >= 0
        || _str_render.indexOf('/admin/login') == 0 || _str_render.indexOf('/admin/logout') == 0
        || _str_render.indexOf('/login/') == 0 || _str_render.indexOf('/reg/') == 0 || _str_render.indexOf('/logout/') == 0
        || _str_render == '/openapi' || _str_render.indexOf('/openapi/') == 0 || _str_render.indexOf('/openapi?') == 0
        || _str_render.indexOf('/detection') == 0 || _str_render.indexOf('/file') == 0 || _str_render.indexOf('/version') == 0 || _str_render.indexOf('/image') == 0) {
        next();
        return;
    }

    response.sendFile(PATH.join(PATH.resolve('dist'), 'index.html'));
};