/**
 * Created by chang on 2017/2/14.
 */
const userService = require('../../services/admin/user');
const log4js = require('../../utils/log4js');
const sessionFilter = require('../../filters/adminSessionFilter');

const user = module.exports;
user.get_checkUserLogin = (req, res) => {
    let account = req.query.account;
    let password = req.query.password;

    if (!account && !password) {
        return res.jsonWrap(null, 1, '用户名或者密码不能为空');
    }

    userService.checkUserLogin(account, password, req).then((ret) => {
        console.log(ret);

        res.jsonWrap(ret);
    }).catch((e) => {
        log4js.error(e);
        res.jsonWrap(null, 2, e);
    });
};

user.get_query = [sessionFilter, (req, res) => {
    let keyword = req.query.keyword || '';
    let pageLimit = pager.requestFilter(req);

    userService.queryUser(pageLimit.page, pageLimit.limit, keyword).then((data) => {
        res.jsonWrap(data);
    }).catch((e) => {
        log4js.error(e);
        res.jsonWrap(null, 1, e);
    });
}];

user.post_save = [sessionFilter, (req, res) => {
    let data = {
        account: req.body.account || '',
        password: req.body.password || '',
        rights: req.body.rights,
        id: req.body.id
    };

    if (!data.account || !data.password) {
        return res.jsonWrap(null, 1, '用户名或者密码不能为空');
    }

    userService.saveUser(data).then((msg) => {
        res.jsonWrap(msg);
    }).catch((e) => {
        log4js.error(e);
        res.jsonWrap(null, 1, e);
    });
}];

user.get_delete = [sessionFilter, (req, res) => {
    let id = req.query.id;
    userService.deleteUser(id).then((msg) => {
        res.jsonWrap(msg);
    }).catch((e) => {
        log4js.error(e);
        res.jsonWrap(null, 1, e);
    });
}];

user.get_resetPassword = [sessionFilter, (req, res) => {
    let old_pwd = req.query.old_pwd;
    let new_pwd = req.query.new_pwd;
    let new_pwd_confirm = req.query.new_pwd_confirm;

    if (!old_pwd || !new_pwd || !new_pwd_confirm) {
        return res.jsonWrap(null, 2, '输入项不能为空');
    }

    if (new_pwd !== new_pwd_confirm) {
        return res.jsonWrap(null, 2, '两次输入的新密码不一致');
    }

    userService.resetPassword(req.session.admin_login_info.id, old_pwd, new_pwd).then((msg) => {
        res.jsonWrap(msg);
    }).catch((e) => {
        log4js.error(e);
        res.jsonWrap(null, 1, e);
    });
}];