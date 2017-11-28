/**
 * Created by chang on 2017/2/9.
 */
const menuService = require('../../../services/admin/menu');
const sessionFilter = require('../../../filters/adminJwtFilter');
const log4js = require('../../../utils/log4js');


const page = module.exports;
page.get_index = [sessionFilter, function (req, res) {
    menuService.getUserMenu(req.jwt.id).then(function (data) {
        // res.jsonWrap(data);
        // res.jsonWrap(req.jwt);
        res.render('admin/admin.html', {data: data, account: req.jwt.account});
    }).catch(function (error) {
        log4js.error(error);
        res.jsonWrap(error, 1, '服务器异常');
    });
}];

page.get_login = function (req, res) {
    if (req.jwt) {
        res.redirect('/admin/page/index');
    } else {
        res.render('admin/login');
    }
};

page.get_logout = function (req, res) {
    req.jwt = null;
    res.jsonWrap();
};

page.post_getPart = [sessionFilter, function (req, res) {
    let page = req.body.page;
    res.render('admin/' + page);
}];

page.get_updateSession = [sessionFilter, function (req, res) {
    res.jsonWrap();
}];
