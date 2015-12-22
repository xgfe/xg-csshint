/**
 *  [强制] 使用 transition 时应指定 transition-property
 */

var postcss = require('postcss');
var utils = require("../utils");
var name = 'require-transition-property';
var msg = 'Use the transition should be specified the transition-property';
var errorType = 'error'

module.exports = postcss.plugin(name, function (opt) {
    return function (css, result) {
        css.walkDecls(function (decl) {
            if (decl.prop == 'transition' || decl.prop == 'transition-property') {
                var value = decl.value.toLowerCase();
                var beforeString = decl.raws.before.replace(/\n/,"")+decl.prop+decl.raws.between;
                var index = value.indexOf('all');
                if (index > -1) {
                    var cssString = beforeString + value.substring(0,index);
                    var position = utils.getLineAndColumn(cssString,decl.source.start);
                    var content = decl.toString();
                    result.warn(msg, {node: decl, type: errorType,line:position.line,column:position.column,content:content});
                }
            }
        })
    }
});
