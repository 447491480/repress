/**
 * Created by chang on 2017/2/14.
 */
const moment = require('moment');
const uuidV1 = require('uuid/v1');
const uuidV4 = require('uuid/v4');
const md5 = require('md5');

const helper = module.exports;

helper.uuid = (dna) => {
    dna = dna || '';
    return uuidV4().substr(9, 27) + '-' + uuidV1().substr(24, 12) + '-' + md5(dna).substr(0, 5)
};

helper.uuidV1 = () => {
    return uuidV1();
};

helper.uuidV4 = () => {
    return uuidV4();
};

helper.now = (fmt) => {
    fmt = fmt || "YYYY-MM-DD HH:mm:ss";
    return moment().format(fmt);
};

helper.md5 = (msg) => {
    return md5(msg);
};

helper.rdmFlowNo = () => {
    return this.now('YYYYMMDDHHmmss') + Math.floor(Math.random() * 10000000000000000);
};

helper.parse = (msg) => {
    return JSON.parse(JSON.stringify(msg));
};