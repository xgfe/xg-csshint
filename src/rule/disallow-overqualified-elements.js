/**
 *  建议] 如无必要，不得为 id、class 选择器添加类型选择器进行限定
 */

var postcss = require('postcss');
var utils = require('../utils');

var name = 'disallow-overqualified-elements';
var msg = "Not allowed to add a type selector is limited to ID, class selector";


module.exports = postcss.plugin(name, function (options) {
    return function (css, result) {
        var config = options.config;
        var errorLevel = config[name].level;

        if(errorLevel===0) return;

        //注意，这里的正则可以拿到 .good.bad的情况，需要特殊判断
        var overqualifiedReg = /[\.#]?[\w\-_]+?(?=[\.#])/g;
        css.walkRules(function(rule){
            var selector = rule.selector;
            var execResult=null;
            while(execResult = overqualifiedReg.exec(selector)){

                if(!/^[\.#]/.test(execResult[0])){
                    //排除.good.bad #good.bad的情况

                    var cssString = selector.substring(0,execResult.index);
                    var content = cssString + execResult.input;
                    var position = utils.getLineAndColumn(cssString,rule.source.start);

                    result.warn(msg,{
                        level: errorLevel,
                        node:rule,
                        content: content,
                        line:position.line,
                        column:position.column,

                    });
                }
            }

        });
    }
});
