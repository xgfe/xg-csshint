/**
 *  [强制] PC端Web页面，其字号应不小于 12px
 */

var postcss = require('postcss');
var name = 'min-font-size';

module.exports = postcss.plugin(name, function (options) {
    return function (css, result) {

        var config = options.config;
        var errorLevel = config[name].level;
		if(errorLevel===0) return;
        var minimumSize = config[name].minimumSize;
        var msg = 'font-size is not less than '+minimumSize+'px';

        var getFontSize = /(\d+)px/;//只匹配px，忽略rem,em等
        css.walkDecls(function (decl) {
            if (decl.prop == 'font-size') {
                var match = decl.value.match(getFontSize);

                if (!match) return;

                var fontSzie = match[1];
                if (fontSzie < minimumSize) {
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
        })
    }
});
