/**
 *  [建议] 尽量不使用id选择器定义样式
 */

var postcss = require('postcss');
var utils = require('../utils');
var name = 'not-use-id';
var msg = 'Do not use the id selector';


module.exports = postcss.plugin(name, function (options) {
    return function (css, result) {
        var config = options.config;
        var errorLevel = config[name].level;
		if(errorLevel===0) return;
        var idSelectorReg = /#[\w\-_]+/g
        css.walkRules(function(rule){
            var selector = rule.selector;
            var idSelectorResult = null;
            while(idSelectorResult = idSelectorReg.exec(selector)){
                var cssString = selector.substring(0,idSelectorResult.index);
                var content = cssString + idSelectorResult.input;
                var position = utils.getLineAndColumn(cssString,rule.source.start);

                result.warn(msg,{
                    level: errorLevel,
                    node:rule,
                    content: content,
                    line:position.line,
                    column:position.column,
                });
            }
        });
    }
});
