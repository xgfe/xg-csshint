/**
 *  [强制] 不要使用 @import
 */

var postcss = require('postcss');
var name = 'disallow-import';
var msg = 'Do not use the import';
var errorType = 'error'

module.exports = postcss.plugin(name, function (opt) {
    return function (css, result) {
        css.walkAtRules(function(atr){

            if(atr.name == 'import'){
                var content = atr.toString();
                result.warn(msg,{type:errorType,node:atr,content:content});
            }
        });
    }
});
