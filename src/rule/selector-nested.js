/**
 *  [建议] 选择器的嵌套层级应不大于 3 级，位置靠后的限定条件应尽可能精确。
 */

var postcss = require('postcss');
var utils = require('../utils');
var name = 'selector-nested';
var msg = 'The selector nested hierarchy is not greater than ';


module.exports = postcss.plugin(name, function (options) {
    return function (css, result) {
        var config = options.config;
        var errorLevel = config[name].level;
        var hierarchy = config[name].hierarchy;
        css.walkRules(function (rule) {
            var selectorList = rule.selector.split(","); // ，代表另一个选择器嵌套，重新计算嵌套层数

            selectorList.forEach(function(selector){
                //去首尾空格后再分割
                var list = selector.trim().split(/\s+(?![~>\+])/g);

                //以空格分割，忽略>~+
                if(list.length > hierarchy){
                    var fullMsg = msg + hierarchy;
                    result.warn(fullMsg,{
                        level: errorLevel,
                        node:rule,
                        content: selector,

                    });
                }

            });
        });
    }
});
