/**
 * [强制] !important前必须有一个空格。
 */
"use strict"

var postcss=require('postcss');
var name='important';
var msg='Must have a space before the !important';

module.exports=postcss.plugin(name,function(options){
    return function(css,result){

        var config = options.config;
        var errorLevel=config[name].level;


        css.walkDecls(function(decl){
            if(decl.important){
                //这里因为postcss不会提取只有一个空格的important，所以decl.raws.important有值就证明不正确
                var importantString=decl.raws.important;
                if(importantString){
                    var column = decl.source.end.column - 10;//10是`!important`的长度
                    var content = decl.toString();
                    result.warn(msg,{
                        level: errorLevel,
                        node:decl,
                        content: content,
                        column: column,

                    });
                }
            }
        });
    };
})