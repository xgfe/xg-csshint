/**
 *  [强制] font-weight 属性必须使用数值方式描述。
 */

var postcss = require('postcss');
var utils = require('../utils');
var name = 'font-weight-number';
var msg = 'font-weight attribute must be number';

module.exports = postcss.plugin(name, function (options) {
    return function (css, result) {

        var config = options.config;
        var errorLevel = config[name].level;

        if(errorLevel===0) return;

        css.walkDecls(function (decl) {
            if (decl.prop === 'font-weight' && isNaN(decl.value)) {
                var cssString = decl.raws.before.replace(/\n/, "") + decl.prop + decl.raws.between;
                var content = decl.toString();
                var position = utils.getLineAndColumn(cssString, decl.source.start);

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
