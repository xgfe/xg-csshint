/**
 * [强制] >、+、~ 选择器的两边各保留一个空格。
 */
"use strict"

var postcss=require('postcss');
var name='selector-both-spaces';
var msg='On both sides of the selector one and only one space';
var errorType='error';

module.exports=postcss.plugin(name,function(opt){

    return function(css,result){
        var selectorReg=/\s*[~>+]\s*/g; //取出选择器两边的所有空白符
        var standard = /^ [~>+] $/; //验证是不是两边只有一个空格
        css.walkRules(function(rule){
            var match = rule.selector.match(selectorReg);
            if(match) {
                for (var i = 0, m; m = match[i++];)
                    if (!standard.test(m)) result.warn(msg, {node: rule, type: errorType});
            }

        });
    }

});