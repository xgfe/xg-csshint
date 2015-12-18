/**
 *  [强制] RGB颜色值必须使用十六进制记号形式 #rrggbb。不允许使用 rgb()。
 */

var postcss = require('postcss');
var name = 'hex-color';
var msg = 'Color values must use hex,such as `#eee`';
var errorType = 'error'

module.exports = postcss.plugin(name, function (opt) {
    return function (css, result) {
        var isRgb=/\brgb\(|\bhsl\(/; //判断值里面有没有 rgb( hsl(
        css.walkDecls(function(decl){
            var value=decl.value;
            if(isRgb.test(value)){
                //使用了rgb,报错
                result.warn(msg,{node:decl,type:errorType});
            }
        });
    }
});
