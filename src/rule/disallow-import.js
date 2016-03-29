/**
 *  [强制] 不要使用 @import
 */

var postcss = require('postcss');
var name = 'disallow-import';
var msg = 'Do not use the import';


module.exports = postcss.plugin(name, function (options) {
    return function (css, result) {

        var config = options.config;
        var errorLevel=config[name].level;
		if(errorLevel===0) return;

        css.walkAtRules(function(atr){

            if(atr.name == 'import'){
                var content = atr.toString();
                //默认的line,cloumn足够了
                result.warn(msg,{
                    level: errorLevel,
                    node:atr,
                    content:content
                });
            }
        });
    }
});
