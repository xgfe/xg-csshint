/**
 * [强制] 属性名 与之后的 : 之间不允许包含空格
 */
"use strict"

var postcss=require('postcss');
var name='after-colon';
var msg='After the colon must have a space';
var config = global.config;
var errorLevel=config[name].level;

module.exports=postcss.plugin(name,function(opt){
    return function(css,result){
        css.walkDecls(function(decl){
            var after=decl.raws.between.split(':')[1];
            if(after!==' '){
                var cssString = decl.toString();
                var column = decl.source.start.column + decl.prop.length + decl.raws.between.length - after.length;//计算`:`的具体位置
                result.warn(msg,{level:errorLevel,node:decl,content:cssString,column:column})
            }
        });
    }
})