/**
 * [强制] 属性名 与之后的 : 之间不允许包含空格
 * \
 */
"use strict"

var postcss=require('postcss');
var name='before-colon';
var msg='There must be nothing in front of the colon';

module.exports=postcss.plugin(name,function(options){
    return function(css,result){

        var config = options.config;
        var errorLevel=config[name].level;
		if(errorLevel===0) return;


        css.walkDecls(function(decl){
           var before=decl.raws.between.split(':')[0];
            if(before!==''){
                var cssString = decl.toString();
                var column = decl.prop.length + decl.source.start.column;
                result.warn(msg,{
                    level:errorLevel,
                    node:decl,
                    content:cssString,
                    column:column,

                })
            }
        });
    }
})