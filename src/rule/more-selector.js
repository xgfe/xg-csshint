/**
 * [强制] 当一个 rule 包含多个 selector 时，每个选择器声明必须独占一行。
 */
"use strict"

var postcss=require('postcss');
var name='more-selector';
var msg='Each selector must be exclusive';
var errorType='error';

module.exports=postcss.plugin(name,function(opt){
    return function(css,result){
        var breakLineReg=/\n/;
        css.walkRules(function(rule){
            var selectors=rule.selector.split(',');
            selectors.shift();//丢掉第一个选择器

            selectors.forEach(function(selector){
                if(!breakLineReg.test(selector)){
                    result.warn(msg,{type:errorType,node:rule});
                }
            });
        });
    }
});
