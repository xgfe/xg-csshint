/**
 *  [强制] 使用 transition 时应指定 transition-property
 */

var postcss = require('postcss');
var name = 'require-transition-property';
var msg = 'Use the transition should be specified the transition-property';
var errorType = 'error'

module.exports = postcss.plugin(name, function (opt) {
    return function (css, result) {
        css.walkDecls(function(decl){
            if(decl.prop=='transition' || decl.prop=='transition-property'){
                var value = decl.value.toLowerCase();
                if(value.indexOf('all')>-1){
                    result.warn(msg,{node:decl,type:errorType});
                }
            }
        })
    }
});
