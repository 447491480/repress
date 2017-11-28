"use strict";

const fs = require("fs");
const path = require("path");
const configure = require('little-man-config');
const Sequelize = require("sequelize");
const config = configure.get('db');

let connections = [];

Object.keys(config).forEach(function(name) {
    connections.push({
        name:name,
        sequelize:new Sequelize(config[name].database, config[name].username, config[name].password, config[name]),
        Sequelize:Sequelize
    })
});

let db = function(name){
    name = name || 'default';
    return db[name];
};

connections.forEach(function(conn){
    let conn_name = conn.name;

    let models = {};
    let model_dir = path.join(process.cwd(), 'resources', 'models',conn_name);
    fs.existsSync(model_dir) || fs.mkdirSync(model_dir);

    fs.readdirSync(model_dir)
        .filter(function (file) {
            return (path.extname(file) === '.js');
        })
        .forEach(function (file) {
            let model = conn.sequelize.import(path.join(process.cwd(), 'resources', 'models',conn_name, file));
            models[model.name]=model;
        });

    db[conn_name] = models;

    Object.keys(db[conn_name]).forEach(function (modelName) {
        if ("associate" in db[conn_name][modelName]) {
            db[conn_name][modelName].associate(db[conn_name]);
        }
    });

    db[conn_name].sequelize = conn.sequelize;
    db[conn_name].Sequelize = conn.Sequelize;
});


module.exports = db;