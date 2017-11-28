const fs = require("fs");
const path = require("path");

let locals = {};
fs.readdir(path.join(__dirname, "../", "resources", "locals"), function (err, list) {
    if (err) {
        return;
    }
    list.forEach(function (file) {
        let ext = path.extname(file).toLowerCase();
        let fileName = path.join(__dirname, "../", "resources", "locals") + '/' + file;
        // 支持json文件和模块数据
        if (ext === ".json" || ext === ".js") {
            let local = require(fileName);
            let key = path.basename(file, ".js");

            locals[key] = local;
        }
    });
});

module.exports = locals;