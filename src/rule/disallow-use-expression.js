/**
 *  [强制] 禁止使用 Expression
 */

var postcss = require('postcss');
var name = 'disallow-use-expression';
var msg = 'It is prohibited to use expression';

module.exports = postcss.plugin(name, function (options) {
    return function (css, result) {

        var config = options.config;
        var errorLevel = config[name].level;

        if(errorLevel===0) return;

        var isExpression = /expression\(/i;
        css.walkDecls(function (decl) {
            if (isExpression.test(decl.value)) {
                var cssString = decl.toString();
                result.warn(msg, {
                    node: decl,
                    level: errorLevel,
                    content: cssString,

                });
            }
        });
    }
});



