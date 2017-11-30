const fs = require('fs');
const path = require('path');
const log4js = require('./log4js');

const route = module.exports;

// set route directory
route.setRouteDirectory = (routeConfig) => {
    this.areaDirectory = routeConfig.areaDirectory;

    this.defaultArea = routeConfig.defaultArea.toLowerCase();
    this.defaultController = routeConfig.defaultController.toLowerCase();
    this.defaultAction = routeConfig.defaultAction.toLowerCase();

    return this;
};

route.bind = (app) => {
    // 递归得到area 目录里面的文件
    this.filterAreaDir().forEach((controllerFile) => {
        // 开始遍历
        let controller = require(controllerFile);
        let pathInfo = this.splitPathInfo(controllerFile);

        for (let key in controller) {
            if (controller.hasOwnProperty(key)) {
                let f = controller[key];
                let middlewareFunctions = undefined;

                if (Array.isArray(f)) {
                    if (f.length === 1) {
                        f = f[0];
                    }
                    else if (f.length > 1) {
                        let controllerFunction = f.pop();
                        middlewareFunctions = f;
                        f = controllerFunction;
                    }
                    else {
                        throw new Error('No controller function defined');
                    }
                }

                //The parameters in the controller-function
                let params = this.translateFunctionBodyToParameterArray(f);

                //The generated path (method and url)
                let path = this.translateRoutePath(controllerFile, key, params);

                //Does this function translate to a valid path for routing?
                if (path !== false) {
                    this.bindRoute(app, path, middlewareFunctions, f, params);

                    // 绑定默认路由
                    let defaultRouteArr = [this.defaultArea, this.defaultController, this.defaultAction].filter(s => s !== '');
                    let defaultRoute = '/' + defaultRouteArr.join('/');

                    if (path.path === defaultRoute) {
                        let defaultPath = {path: '/', method: 'get'};
                        this.bindRoute(app, defaultPath, middlewareFunctions, f, params);

                        if(pathInfo.area !=='') {
                            defaultRouteArr.shift();
                            defaultRouteArr.unshift(pathInfo.area);
                            if (path.path === '/' + defaultRouteArr.filter(s => s !== '').join('/')) {
                                let defaultPath = {path: `/${pathInfo.area}`, method: 'get'};
                                this.bindRoute(app, defaultPath, middlewareFunctions, f, params);

                                defaultRouteArr.shift();
                                defaultRouteArr.shift();
                                defaultRouteArr.unshift(pathInfo.area,pathInfo.controller);
                                if (path.path === '/' + defaultRouteArr.filter(s => s !== '').join('/')) {
                                    let defaultPath = {path: `/${pathInfo.area}/${pathInfo.controller}`, method: 'get'};
                                    this.bindRoute(app, defaultPath, middlewareFunctions, f, params);
                                }
                            }
                        } else {
                            defaultRouteArr.shift();
                            defaultRouteArr.unshift(pathInfo.controller);
                            if (path.path === '/' + defaultRouteArr.filter(s => s !== '').join('/')) {
                                let defaultPath = {path: `/${pathInfo.controller}`, method: 'get'};
                                this.bindRoute(app, defaultPath, middlewareFunctions, f, params);
                            }
                        }
                    } else {
                        if(pathInfo.area !=='') {
                            defaultRouteArr.shift();
                            defaultRouteArr.unshift(pathInfo.area);
                            if (path.path === '/' + defaultRouteArr.filter(s => s !== '').join('/')) {
                                let defaultPath = {path: `/${pathInfo.area}`, method: 'get'};
                                this.bindRoute(app, defaultPath, middlewareFunctions, f, params);

                                defaultRouteArr.shift();
                                defaultRouteArr.shift();
                                defaultRouteArr.unshift(pathInfo.area,pathInfo.controller);
                                if (path.path === '/' + defaultRouteArr.filter(s => s !== '').join('/')) {
                                    let defaultPath = {path: `/${pathInfo.area}/${pathInfo.controller}`, method: 'get'};
                                    this.bindRoute(app, defaultPath, middlewareFunctions, f, params);
                                }
                            }
                        } else {
                            defaultRouteArr.shift();
                            defaultRouteArr.unshift(pathInfo.controller);
                            if (path.path === '/' + defaultRouteArr.filter(s => s !== '').join('/')) {
                                let defaultPath = {path: `/${pathInfo.controller}`, method: 'get'};
                                this.bindRoute(app, defaultPath, middlewareFunctions, f, params);
                            }
                        }
                    }
                }
            }
        }

    });

};

route.bindRoute = (app, path, middlewareFunctions, f, params) => {
    if (Array.isArray(middlewareFunctions)) {

        app[path.method.toLowerCase()](
            path.path,
            middlewareFunctions,
            (req, res) => {
                let clonedParams = params.slice(0);
                clonedParams = this.translateKeysArrayToValuesArray(clonedParams, req.params);
                clonedParams.unshift(req, res);
                f.apply(this, clonedParams);
            }
        );

    }
    else {
        app[path.method.toLowerCase()](
            path.path,
            (req, res) => {
                let clonedParams = params.slice(0);
                clonedParams = this.translateKeysArrayToValuesArray(clonedParams, req.params);
                clonedParams.unshift(req, res);
                f.apply(this, clonedParams);
            }
        );

    }
};

route.filterAreaDir = () => {
    let dirStack = [];
    let controllerFiles = [];

    dirStack.push(this.areaDirectory);

    while (dirStack.length > 0) {
        let areaDir = dirStack.pop();

        fs.readdirSync(areaDir)
            .forEach((file) => {
                let fp = path.join(areaDir, file);

                if (fs.statSync(fp).isDirectory()) {
                    dirStack.push(fp);
                } else {
                    controllerFiles.push(fp);
                }
            });
    }

    return controllerFiles.filter((c) => path.extname(c) === '.js')
};

route.splitPathInfo = (controllerFile) => {
    let baseRoute = controllerFile.replace(this.areaDirectory, '').replace(path.extname(controllerFile), '').toLowerCase();

    let splitArr = baseRoute.split('/');

    if (splitArr.length <= 0) {
        throw new Error('Error Path Info');
    } else if (splitArr.length === 1) {
        return {area: '', controller: splitArr[0]};
    } else {
        let controllerName = splitArr.pop();
        return {area: splitArr.filter(f => f !== '').join('/'), controller: controllerName}
    }
};

route.translateKeysArrayToValuesArray = (keysArray, keyValueObject) => {
    let valuesArray = [];
    for (let i = 0; i < keysArray.length; i++) {
        valuesArray.push(keyValueObject[keysArray[i]]);
    }
    return valuesArray;
};

route.translateFunctionBodyToParameterArray = (f) => {
    if (typeof f === 'function') {
        let params = f.toString()
            .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s))/mg, '')
            .match(/^\s*[^\(]*\(\s*([^\)]*)\)/m)[1]
            .split(/,/);
        if (params.length >= 2) {
            params.splice(0, 2);
            return params;
        }
        else {
            throw new Error('Defined controller function has too few parameters');
        }
    }
    else {
        throw new Error('Defined controller object is not a function');
    }

};

route.translateRoutePath = (controllerFile, methodName, parameters) => {
    //Ensure that both strings are lower-case
    let baseRoute = controllerFile.replace(this.areaDirectory, '').replace(path.extname(controllerFile), '').toLowerCase();

    parameters = parameters || [];

    let parts = methodName.split('_');

    //Extract the method from parts
    let method = parts[0].toLowerCase();

    // Return false if this request method is not valid
    // or if the action name is missing
    if (['get', 'post', 'put', 'delete', 'patch'].indexOf(method) === -1) return false;
    if (parts.length < 1) return false;

    //Remove method from parts
    parts.splice(0, 1);

    //Append the rest of the parts
    parts.forEach(function (part) {
        let separator = !!~parameters.indexOf(part) ? '/:' : '/';

        if (separator === '/') {
            //Replaces the camelCased section with a hyphenated lowercase string
            part = part.replace(/([A-Z])/g, '-$1').toLowerCase();
        }
        baseRoute += separator + part;
    });

    parameters.forEach(function (parameter) {
        if (!~parts.indexOf(parameter))
            baseRoute += "/:" + parameter;
    });

    return {
        path: baseRoute,
        method: method
    }
};