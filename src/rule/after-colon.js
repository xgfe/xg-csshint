/**
 * [强制] : 与 属性值 之间必须包含空格。
 */
"use strict"

var postcss=require('postcss');
var name='after-colon';
var msg='After the colon must have a space';

module.exports=postcss.plugin(name,function(options){
    return function(css,result){

        var config = options.config;
        var errorLevel=config[name].level;
		if(errorLevel===0) return;


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