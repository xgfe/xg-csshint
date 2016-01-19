/**
 *  [强制] 必须同时给出水平和垂直方向的位置。
 */

var postcss = require('postcss');
var name = 'horizontal-vertical-position';
var msg = 'Must give the horizontal and vertical position';

module.exports = postcss.plugin(name, function (options) {
    return function (css, result) {

        var config = options.config;
        var errorLevel = config[name].level;


        css.walkDecls(function (decl) {

            if (decl.prop == 'background-position') {
                var parts = postcss.list.space(decl.value);
                if (parts.length < 2) {

                    var content = decl.toString();
                    var column = decl.source.start.column + decl.prop.length + decl.raws.between.length;

                    result.warn(msg, {
                        node: decl,
                        level: errorLevel,
                        content: content,
                        column: column,

                    });
                }


            }
        });
    }
});
