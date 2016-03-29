/**
 *  颜色值在同一个项目中不要又有大写又有小写
 */

var postcss = require('postcss');
var utils = require('../utils');
var name = 'color-case';
var msg = 'Color values must be ';


module.exports = postcss.plugin(name, function (options) {
    return function (css, result) {
        var config = options.config;
        var errorLevel = config[name].level;

        if(errorLevel===0) return;

        var colorReg = /#(\w+)/g; //提取color字符串
        var uppercaseReg = /[A-Z]/; //大写
        var lowercaseReg = /[a-z]/;//小写

        css.walkDecls(function(decl){
            var value = decl.value;

            var execResult = null;
            while(execResult = colorReg.exec(value)){
                var colorString = execResult[1];
                for(var i=0;i<colorString.length;i++){
                    var char = colorString[i];
                    if(uppercaseReg.test(char)){
                        //大写
                        if(options.colorLowercase===undefined){
                            //根据第一个字母判断全局采用小写还是大写
                            options.colorLowercase = false;
                            continue;
                        }

                        if(options.colorLowercase){
                            var fullMsg = msg + "lowercase"
                            var content = decl.prop+decl.raws.between+decl.value;
                            result.warn(fullMsg,{
                                node:decl,
                                level:errorLevel,
                                content:content,
                            });
                            return;
                        }
                    }else if(lowercaseReg.test(char)){
                        //小写
                        if(options.colorLowercase===undefined){
                            options.colorLowercase = true;
                            continue;
                        }

                        if(!options.colorLowercase){
                            var fullMsg = msg + "uppercase";
                            var content = decl.prop+decl.raws.between+decl.value;
                            result.warn(fullMsg,{
                                node:decl,
                                level:errorLevel,
                                content:content,
                            });
                            return;
                        }

                    }
                }
            }
        });
    }
});
