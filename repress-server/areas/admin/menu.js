/**
 * Created by chang on 2017/2/10.
 */
const menuService = require('../../services/admin/menu');
const sessionFilter = require('../../filters/adminSessionFilter');

const menu = module.exports;
menu.get_getMenu = [sessionFilter, (req, res) => {
    let data = menuService.readMenuConfig();
    res.jsonWrap(data);
}];
