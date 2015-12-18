/**
 *  [强制] PC端Web页面，其字号应不小于 12px
 */

var postcss = require('postcss');
var name = 'min-font-size';
var msg = 'font-size is not less than 12px';
var errorType = 'error'

module.exports = postcss.plugin(name, function (opt) {
    return function (css, result) {
        var getFontSize=/(\d+)px/;//只匹配px，忽略rem,em等
        css.walkDecls(function(decl){
            if(decl.prop=='font-size'){
                var match = decl.value.match(getFontSize);

                if(!match) return;

                var fontSzie=match[1];
                if(fontSzie<12){
                    result.warn(msg,{node:decl,type:errorType});
                }
            }
        })
    }
});
