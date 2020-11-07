var log4js = require('log4js');

log4js.configure({
    appenders: {
        accessLogs: {
            type : 'dateFile',
            filename : '../log/access.log',
            pattern : '_yyyy-MM-dd',
            alwaysIncludePattern : true,
            maxLogSize : 104857600,
            backups : 10,
            pollInterval : 15,
            category : 'access',
            replaceConsole : true
        },
        appLogs: {
            type : 'dateFile',
            filename : '../log/app.log',
            pattern : '_yyyy-MM-dd',
            alwaysIncludePattern : true,
            maxLogSize : 104857600,
            backups : 10,
            pollInterval : 15,
            category : 'app',
            replaceConsole : true
        },
        console: { type: 'console' }
    },
    categories: {
        access: { appenders: ['accessLogs'], level: 'error' },
        app: { appenders: ['appLogs'], level: 'warn' },
        another: { appenders: ['console'], level: 'trace' },
        default: { appenders: ['console', 'accessLogs', 'appLogs'], level: 'trace' }
    },
    disableClustering: true
});

exports.logger = log4js.getLogger('app');
exports.access_logger = log4js.getLogger('access');
exports.connectLogger = log4js.connectLogger(this.access_logger, {level : 'auto'});