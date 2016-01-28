/**
 *  需要在 Windows 平台显示的中文内容，不要使用除 normal 外的 font-style。其他平台也应慎用
 */

var postcss = require('postcss');
var utils = require('../utils');
var name = 'normal-fontStyle';
var msg = 'Please use the font-style: normal;';


module.exports = postcss.plugin(name, function (options) {
    return function (css, result) {
        var config = options.config;
        var errorLevel = config[name].level;

        css.walkDecls(function(decl){
            if(decl.prop==='font-style'){
                if(decl.value !== 'normal' && decl.value !== 'inherit'){

                    var content = decl.prop+decl.raws.between+decl.value;


                    result.warn(msg, {
                        node: decl,
                        level: errorLevel,
                        content: content,
                    });
                }
            }
        })
    }
});
