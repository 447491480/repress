const configure = require('little-man-config');

const theme = configure.get("app")['default_theme'] || "default";

const admin_name = configure.get('admin')['admin_name'] || '';

let sub_theme = "";
if (theme === "bootstrap") {
    sub_theme = "/light"
}

module.exports = {
    "ADMIN_WEB_NAME": admin_name,
    "__ADMIN_STATIC__": theme + "/admin-static" + sub_theme,
    "__JAVASCRIPT__": theme + "/js"
};
