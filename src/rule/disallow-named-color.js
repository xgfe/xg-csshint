/**
 *  [强制] 颜色值不允许使用命名色值
 */

var postcss = require('postcss');
var colors = require('../color');

var name = 'disallow-named-color';
var msg = 'Color values using named color value is not allowed';
var errorType = 'error'

module.exports = postcss.plugin(name, function (opt) {
    return function (css, result) {
        css.walkDecls(function(decl){
            var parts = postcss.list.space(decl.value);
            for(var i= 0,part;part=parts[i++];){
                if(colors.hasOwnProperty(part)){
                    var content = decl.toString();
                    result.warn(msg,{node:decl,type:errorType,content:content});
                }
            }
        });
    }
});
