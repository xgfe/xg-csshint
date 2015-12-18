/**
 *  [强制] Media Query 如果有多个逗号分隔的条件时，应将每个条件放在单独一行中。
 */

var postcss = require('postcss');
var name = 'media-query-require-new-line';
var msg = 'each query conditions for one line';
var errorType = 'error'

module.exports = postcss.plugin(name, function (opt) {
    return function (css, result) {

        var notNewline=/,(?!\s*[\n\r])/; //判断,后面没有换行符

        css.walkAtRules(function(atRule){
            if(atRule.name=='media'){
                var params = atRule.params;

                if(notNewline.test(params)){
                    result.warn(msg,{node:atRule,type:errorType});
                }
            }
        });
    }
});
