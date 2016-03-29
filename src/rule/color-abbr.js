/**
 *  [强制] 颜色值可以缩写时，必须使用缩写形式。
 */

var postcss = require('postcss');
var name = 'color-abbr';
var msg = 'The color value can be abbreviated, must use abbreviations';

module.exports = postcss.plugin(name, function (options) {
    return function (css, result) {

        var config = options.config;
        var errorLevel=config[name].level;
		if(errorLevel===0) return;


        var canAbbreviated=/#([a-zA-Z0-9])\1([a-zA-Z0-9])\2([a-zA-Z0-9])\3/; //匹配#eeFF88之类的可以缩写颜色值

        css.walkDecls(function(decl){
            var value = decl.value;
            var match = value.match(canAbbreviated);
            if(match){

                var cssString=decl.prop + decl.raws.between + value.substring(0,match.index);
                var column = cssString.length + decl.source.start.column;
                var content = cssString+match[0]; //将没有缩写的颜色值加入提示
                result.warn(msg,{
                    node:decl,
                    level:errorLevel,
                    content:content,
                    column:column,

                });
            }
        })
    }
});
