/**
 *  [强制] 必须同时给出水平和垂直方向的位置。
 */

var postcss = require('postcss');
var name = 'horizontal-vertical-position';
var msg = 'Must give the horizontal and vertical position';
var errorType = 'error'

module.exports = postcss.plugin(name, function (opt) {
    return function (css, result) {
        css.walkDecls(function (decl) {

            if (decl.prop == 'background-position') {
                var parts = postcss.list.space(decl.value);
                if (parts.length < 2) {
                    result.warn(msg,{node:decl,type:errorType});
                }
            }
        });
    }
});
