/**
 *  [强制] RGB颜色值必须使用十六进制记号形式 #rrggbb。不允许使用 rgb()。
 */

var postcss = require('postcss');
var utils = require('../utils');
var name = 'hex-color';
var msg = 'Color values must use hex,such as `#eee`';

module.exports = postcss.plugin(name, function (options) {
    return function (css, result) {

        var config = options.config;
        var errorLevel = config[name].level;
        if(errorLevel===0) return;

        var isRgb = /\brgb\(|\bhsl\(/g; //判断值里面有没有 rgb( hsl(
        css.walkDecls(function (decl) {
            var value = decl.value;
            var beforeString = decl.raws.before.replace(/\n/, "") + decl.prop + decl.raws.between;
            var notHex;
            while (notHex = isRgb.exec(value)) {
                var cssString = beforeString + value.substring(0, notHex.index);
                var position = utils.getLineAndColumn(cssString, decl.source.start);
                var content = decl.toString();
                // TODO 可以加入正确结果的提示
                result.warn(msg, {
                    node: decl,
                    level: errorLevel,
                    content: content,
                    line: position.line,
                    column: position.column,

                });
            }

        });
    }
});
