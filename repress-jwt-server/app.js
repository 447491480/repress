process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// 载入常用nodejs模块
const path = require('path');
const fs = require('fs');

// 定时任务模块
const schedule = require('node-schedule');

// 配置管理
const configure = require('little-man-config');

// 载入app配置文件
const app_config = configure.get('app');

// favicon.ico 支持
const favicon = require('serve-favicon');

// post参数解析
const bodyParser = require('body-parser');

// ejs
const ejs = require('ejs');

// express 框架
const express = require('express');

const app = express();
app.use(function (req, res, next) {
    res.jsonWrap = function (data, status, msg) {
        status = status || 0;
        msg = msg || 'success';
        data = data || false;

        res.json({data: data, status: status, msg: msg});
    };

    next();
});

// 将db对象载入全局对象中
global.APP_PATH = process.cwd();
global.db = require(path.join(APP_PATH, 'utils', 'db'));
global.pager = require(path.join(APP_PATH, 'utils', 'pager'));
global.helper = require(path.join(APP_PATH, 'utils', 'helper'));

// 载入核心路由解析组件
const resolve = require(path.join(APP_PATH, 'utils', 'route'));

// 载入log4js自定义模块
const log4js = require(path.join(APP_PATH, 'utils', 'log4js'));

// 跨域支持
const cors = require('cors');
app.use(cors());

// 配置log4js
app.use(log4js.useLog());

// 设置视图引擎
app.engine('html', ejs.__express);
app.set('view engine', 'html');

// 设置静态资源目录
app.use(express.static(path.join(APP_PATH, 'public')));

// 设置icon图标（如果没有favicon.icon）可以注释这一行代码
app.use(favicon(path.join(APP_PATH, 'public', 'favicon.ico')));

// 处理非get提交数据
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// 设置默认区域
const defaultArea = app_config.default_area;

// 创建express Router 实例
const router = express.Router();

// 定义视图文件位置
app.set('views', path.join(APP_PATH, 'public', app_config['default_theme'], 'webapp'));

// 实现ViewData全局功能，
// ejs页面通过 <%=_locals.（locals文件夹下的文件名） %>访问，如：<%=_locals.setting.name %>
// action通过 res.locals.setting  访问
const locals = require(path.join(APP_PATH, "utils", "locals"));
router.use(function (req, res, next) {
    res.locals = locals;
    next();
});

// 载入路由中间件
app.use(router);

// 设置控制器文件夹并绑定到路由
resolve
    .setRouteDirectory({
        areaDirectory: APP_PATH + '/areas',
        controllerDirname: 'controllers',
        defaultArea: defaultArea,
        defautController: app_config.default_controller,
        defautAction: app_config.default_action
    })
    .bind(router);

// 错误处理
// 404处理
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// 错误或者服务器500异常处理
app.use(function (err, req, res, next) {
    //写错误日志
    let status = err.status || 500;
    let errorMes = status + ' ' + err.message + '\n' + '[' + new Date() + '] [' + req.url + '] [' + err + ']';

    res.status(status);

    log4js.error(err);
    res.send('<pre>' + errorMes + '</pre>');
});

// 设置端口
app.set('port', process.env.PORT || app_config.default_port);
const server = app.listen(app.get('port'), function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('应用启动成功！访问地址： http://%s:%s', host, port);
});

// 初始化定时任务
const taskDir = APP_PATH + '/tasks';
fs.existsSync(taskDir) || fs.mkdirSync(taskDir);
fs.readdirSync(taskDir)
    .filter(function (file) {
        return (path.extname(file) === '.js');
    })
    .forEach(function (file) {
        let job = require(path.join(taskDir, file));
        schedule.scheduleJob(job.cron, job.func);
    });


// 引入socket 服务端模块。如无需即时通讯，注释即可
//require(path.join(APP_PATH, 'utils', 'socket')).listen(server);