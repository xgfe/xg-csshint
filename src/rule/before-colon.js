/**
 * [强制] : 与 属性值 之间必须包含空格。
 */
"use strict"

var postcss=require('postcss');
var name='before-colon';
var msg='There must be nothing in front of the colon';
var config = global.config;
var errorLevel=config[name].level;

module.exports=postcss.plugin(name,function(opt){
    return function(css,result){
        css.walkDecls(function(decl){
           var before=decl.raws.between.split(':')[0];
            if(before!==''){
                var cssString = decl.toString();
                var column = decl.prop.length + decl.source.start.column;
                result.warn(msg,{level:errorLevel,node:decl,content:cssString,column:column})
            }
        });
    }
})