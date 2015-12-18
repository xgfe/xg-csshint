/**
 *  [强制] 禁止使用 Expression
 */

var postcss = require('postcss');
var name = 'disallow-use-expression';
var msg = 'It is prohibited to use expression';
var errorType = 'error'

module.exports = postcss.plugin(name, function (opt) {
    return function (css, result) {
        var isExpression=/expression\(/i;
        css.walkDecls(function(decl){
            if(isExpression.test(decl.value)){
                result.warn(msg,{node:decl,type:errorType});
            }
        });
    }
});



