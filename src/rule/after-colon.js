/**
 * [强制] 属性名 与之后的 : 之间不允许包含空格
 */
"use strict"

var postcss=require('postcss');
var name='after-colon';
var msg='After the colon must have a space';
var errorType='error';

module.exports=postcss.plugin(name,function(opt){
    return function(css,result){
        css.walkDecls(function(decl){
            var after=decl.raws.between.split(':')[1];
            if(after!==' '){
                result.warn(msg,{type:errorType,node:decl})
            }
        });
    }
})