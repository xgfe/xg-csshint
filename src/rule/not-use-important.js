/**
 *  尽量不使用 !important 声明
 */

var postcss = require('postcss');
var utils = require('../utils');
var name = 'not-use-important';
var msg = 'Try not to use !important';


module.exports = postcss.plugin(name, function (options) {
    return function (css, result) {
        var config = options.config;
        var errorLevel = config[name].level;
        css.walkDecls(function(decl){
            if(decl.important){
                var content = decl.prop+": "+decl.value+" !important";
                result.warn(msg,{
                    level: errorLevel,
                    node:decl,
                    content: content,
                });
            }
        });
    }
});
