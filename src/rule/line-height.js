/**
 *  line-height 在定义文本段落时，应使用数值
 */

var postcss = require('postcss');
var utils = require('../utils');
var name = 'line-height';
var msg = 'Define line-height use number';

module.exports = postcss.plugin(name, function (options) {
    return function (css, result) {

        var config = options.config;
        var errorLevel = config[name].level;
		if(errorLevel===0) return;
        var notNumberReg = /\d(?=[a-zA-Z%])/;

        css.walkDecls(function (decl) {

            if (decl.prop === 'line-height') {

                if (notNumberReg.test(decl.value)) {
                    var content = decl.prop + decl.raws.between + decl.value;
                    result.warn(msg, {
                        node: decl,
                        level: errorLevel,
                        content: content,
                    });
                }
            }
        });
    }
});
