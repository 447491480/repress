/**
 * Created by chang on 2017/2/9.
 */
const menuService = require('../../services/admin/menu');
const sessionFilter = require('../../filters/adminSessionFilter');
const log4js = require('../../utils/log4js');


const page = module.exports;
page.get_index = [sessionFilter, (req, res) => {
    menuService.getUserMenu(req.session.admin_login_info.id).then( (data) => {
        // res.jsonWrap(data);
        // res.jsonWrap(req.session.admin_login_info);
        res.render('admin/admin.html',{data:data,account:req.session.admin_login_info.account});
    }).catch((error) => {
        console.log(error);
        res.jsonWrap(error,1,'服务器异常');
    });
}];

page.get_login = (req, res) => {
    if(req.session.admin_login_info) {
        res.redirect('/admin/page/index');
    } else {
        res.render('admin/login');
    }
};

page.get_logout = (req, res) => {
    req.session.admin_login_info = null;
    res.jsonWrap();
};

page.post_getPart = [sessionFilter, (req, res) => {
    let page = req.body.page;
    res.render('admin/' + page);
}];

page.get_updateSession = [sessionFilter, (req, res) => {
    res.jsonWrap();
}];
