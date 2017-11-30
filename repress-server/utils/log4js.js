const configure = require('little-man-config');
const log4js = require("log4js");

log4js.configure(configure.get('log4js'));

const project = log4js.getLogger('project');
const error = log4js.getLogger('error');

exports.useLog = function() {
    return log4js.connectLogger(project, { level: 'info' });
};

exports.debug = function(msg) {
    project.level = 'debug';
    return project.debug(msg)
};

exports.error = function(msg) {
    error.level = 'error';
    return error.error(msg)
};