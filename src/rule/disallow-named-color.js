/**
 *  [强制] 颜色值不允许使用命名色值
 */

var postcss = require('postcss');
var colors = require('../color');

var name = 'disallow-named-color';
var msg = 'Color values using named color value is not allowed';

module.exports = postcss.plugin(name, function (options) {
    return function (css, result) {

        var config = options.config;
        var errorLevel=config[name].level;
		if(errorLevel===0) return;


        css.walkDecls(function(decl){
            var parts = postcss.list.space(decl.value);
            for(var i= 0,part;part=parts[i++];){
                if(colors.hasOwnProperty(part)){
                    var content = decl.toString();
                    //TODO 报错加入替换颜色
                    result.warn(msg,{
                        node:decl,
                        level: errorLevel,
                        content:content,

                    });
                }
            }
        });
    }
});
