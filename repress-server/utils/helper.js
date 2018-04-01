/**
 * Created by chang on 2017/2/14.
 */
const moment = require('moment');
const uuidV1 = require('uuid/v1');
const uuidV4 = require('uuid/v4');
const path = require('path');
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

helper.toTimeString = (time,fmt) => {
    fmt = fmt || "YYYY-MM-DD HH:mm:ss";
    return moment(time).format(fmt);
};

helper.convertBase = (value, from_base, to_base) => {
    value = value.toString();
    let range = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split('');
    let from_range = range.slice(0, from_base);
    let to_range = range.slice(0, to_base);

    let dec_value = value.split('').reverse().reduce(function (carry, digit, index) {
        if (from_range.indexOf(digit) === -1) throw new Error('Invalid digit `' + digit + '` for base ' + from_base + '.');
        return carry += from_range.indexOf(digit) * (Math.pow(from_base, index));
    }, 0);

    let new_value = '';
    while (dec_value > 0) {
        new_value = to_range[dec_value % to_base] + new_value;
        dec_value = (dec_value - (dec_value % to_base)) / to_base;
    }
    return new_value || '0';
};
