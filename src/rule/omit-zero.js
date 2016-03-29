/**
 * [强制] 当数值为 0 - 1 之间的小数时，省略整数部分的 0。
 */
var postcss = require('postcss');
var name = 'omit-zero';
var msg = 'When the value is between 0 and 1 decimal omit zero';

module.exports = postcss.plugin(name, function (options) {
    return function (css, result) {

        var config = options.config;
        var errorLevel = config[name].level;
		if(errorLevel===0) return;


        var omitZeroReg = /\b0\./;
        css.walkDecls(function (decl) {
            var valueList = postcss.list.space(decl.value);

            for (var i = 0, value; value = valueList[i++];)
                if (omitZeroReg.test(value)) {

                    var content = decl.toString();
                    var column = content.indexOf(value) + decl.source.start.column;

                    result.warn(msg, {
                        node: decl,
                        level: errorLevel,
                        content: content,
                        column: column,

                    });
                }
        });
    }
});