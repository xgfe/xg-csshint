/**
 *  尽量少用 * 选择器
 */

var postcss = require('postcss');
var utils = require('../utils');
var name = 'not-use-asterisk';
var msg = 'Try not to use the * selector';


module.exports = postcss.plugin(name, function (options) {
    return function (css, result) {
        var config = options.config;
        var errorLevel = config[name].level;
		if(errorLevel===0) return;

        var asteriskReg =/\*/g;
        css.walkRules(function(rule){
            var execReuslt=null;
            var selector = rule.selector;
            while(execReuslt = asteriskReg.exec(selector)){

                var cssString = selector.substring(0,execReuslt.index);
                var content = cssString + execReuslt[0];
                var position = utils.getLineAndColumn(cssString,rule.source.start);

                result.warn(msg,{
                    level: errorLevel,
                    node:rule,
                    content: content,
                    line:position.line,
                    column:position.column,
                });

            }
        })
    }
});
