/**
 *  [强制] font-weight 属性必须使用数值方式描述。
 */

var postcss = require('postcss');
var name = 'font-weight-number';
var msg = 'font-weight attribute must be number';
var errorType = 'error'

module.exports = postcss.plugin(name, function (opt) {
    return function (css, result) {

        css.walkDecls(function(decl){
            if(decl.prop==='font-weight' && isNaN(decl.value)){
                result.warn(msg,{node:decl,type:errorType});
            }
        });
    }
});
