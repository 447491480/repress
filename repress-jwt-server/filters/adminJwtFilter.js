const jwt = require('../utils/jwt');
const app_config = require('little-man-config').get('app');

module.exports = function (req, res, next) {
    let token = req.headers['authorization'] || req.headers['Authorization'] || req.query.token || req.body.token || '';

    if(!token) {
        if(req.xhr || /json/i.test(req.headers.accept)) {
            res.jsonWrap(null,-999,'Token is Empty');
        } else {
            res.redirect('/admin/page/login')
        }
    } else {
        try {
            req.jwt = jwt.decode(token,app_config['admin_jwt_secret']);

            next();
        } catch (e) {
            if(req.xhr || /json/i.test(req.headers.accept)) {
                res.jsonWrap(null,-999,e);
            } else {
                res.redirect('/admin/page/login')
            }
        }
    }
};