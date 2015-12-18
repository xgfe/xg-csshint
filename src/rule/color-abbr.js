/**
 *  [强制] 颜色值可以缩写时，必须使用缩写形式。
 */

var postcss = require('postcss');
var name = 'color-abbr';
var msg = 'The color value can be abbreviated, must use abbreviations';
var errorType = 'error'

module.exports = postcss.plugin(name, function (opt) {
    return function (css, result) {

        var canAbbreviated=/#([a-zA-Z0-9])\1([a-zA-Z0-9])\2([a-zA-Z0-9])\3/; //匹配#eeFF88之类的可以缩写颜色值

        css.walkDecls(function(decl){
            var value = decl.value;
            if(canAbbreviated.test(value)){
                result.warn(msg,{node:decl,type:errorType});
            }
        })
    }
});
