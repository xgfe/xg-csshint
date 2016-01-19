/**
 *[强制] 长度为 0 时须省略单位。 (也只有长度单位可省)
 */

var postcss = require('postcss');
var utils = require('../utils');

var name = 'omit-unit';
var msg = 'Unit of length is zero must be omitted';

module.exports = postcss.plugin(name, function (options) {
    return function (css, result) {

        var config = options.config;
        var errorLevel = config[name].level;


        var notOmitUnit = /\b0[a-zA-Z]+?\b/g;//找出0px,0rem,0xxx
        css.walkDecls(function (decl) {
            var value = decl.value;
            var beforeString = decl.raws.before.replace(/\n/, "") + decl.prop + decl.raws.between;
            var noOmit;
            while (noOmit = notOmitUnit.exec(value)) {

                var cssString = beforeString + value.substring(0, noOmit.index);
                var position = utils.getLineAndColumn(cssString, decl.source.start);
                var content = cssString + noOmit[0];

                result.warn(msg, {
                    node: decl,
                    level: errorLevel,
                    content: content,
                    line: position.line,
                    column: position.column,

                });
            }

        })
    }
});
