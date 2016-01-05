/**
 * [强制] url() 函数中的路径不加引号。
 */

var postcss = require('postcss');
var utils = require("../utils")
var name = 'disallow-quotes-in-url';
var msg = 'The paths through the url function without quotation marks';
var config = global.config;
var errorLevel = config[name].level;

module.exports = postcss.plugin(name, function (opt) {
    return function (css, result) {
        var getUrlValue = /\burl\(['"][\s\S]+?['"]\)/g;//提取url('xxxx') url("xxx")
        css.walkDecls(function (decl) {
            var value = decl.value;
            var urlPath;

            while (urlPath = getUrlValue.exec(value)) {
                var before = decl.prop + decl.raws.between + value.substring(0, urlPath.index);
                var position = utils.getLineAndColumn(decl.raws.before.replace(/\n/, "") + before, decl.source.start);
                result.warn(msg, {
                    node: decl,
                    level: errorLevel,
                    content: before + urlPath[0],
                    line: position.line,
                    column: position.column
                });
            }
        });
    }
});