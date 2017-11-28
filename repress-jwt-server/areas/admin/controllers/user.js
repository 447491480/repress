/**
 * Created by chang on 2017/2/14.
 */
const userService = require('../../../services/admin/user');
const log4js = require('../../../utils/log4js');

const user = module.exports;
user.get_checkUserLogin = function (req, res) {
    let account = req.query.account;
    let password = req.query.password;

    if (!account && !password) {
        res.jsonWrap(null, 1, '用户名或者密码不能为空');
    }

    userService.checkUserLogin(account, password).then(function (ret) {
        console.log(ret);

        res.jsonWrap(ret);
    }).catch(function (e) {
        log4js.error(e);
        res.jsonWrap(null, 2, e);
    });
};

user.get_query = function (req, res) {
    let keyword = req.query.keyword || '';
    let pageLimit = pager.requestFilter(req);

    userService.queryUser(pageLimit.page, pageLimit.limit, keyword).then(function (data) {
        res.jsonWrap(data);
    }).catch(function (e) {
        log4js.error(e);
        res.jsonWrap(null, 1, e);
    });
};

user.post_save = function (req, res) {
    let data = {
        account: req.body.account || '',
        password: req.body.password || '',
        rights: req.body.rights,
        id: req.body.id
    };

    if (!data.account || !data.password) {
        res.jsonWrap(null, 1, '用户名或者密码不能为空');
    }

    userService.saveUser(data).then(function (msg) {
        res.jsonWrap(msg);
    }).catch(function (e) {
        log4js.error(e);
        res.jsonWrap(null, 1, e);
    });
};

user.get_delete = function (req, res) {
    let id = req.query.id;
    userService.deleteUser(id).then(function (msg) {
        res.jsonWrap(msg);
    }).catch(function (e) {
        log4js.error(e);
        res.jsonWrap(null, 1, e);
    });
};

user.get_resetPassword = function (req, res) {
    let old_pwd = req.query.old_pwd;
    let new_pwd = req.query.new_pwd;
    let new_pwd_confirm = req.query.new_pwd_confirm;

    if (!old_pwd || !new_pwd || !new_pwd_confirm) {
        res.jsonWrap(null, 2, '输入项不能为空');
    }

    if (new_pwd !== new_pwd_confirm) {
        res.jsonWrap(null, 2, '两次输入的新密码不一致');
    }

    userService.resetPassword(req.session.admin_login_info.id, old_pwd, new_pwd).then(function (msg) {
        res.jsonWrap(msg);
    }).catch(function (e) {
        log4js.error(e);
        res.jsonWrap(null, 1, e);
    });
};