/**
 * [强制] 属性定义必须另起一行，即使只有一个属性值。
 */
"use strict"

var postcss=require('postcss');
var chalk = require("chalk");
var name='a-line-of-decl';
var msg='Attribute must be a new line';
var config = global.config;
var errorLevel=config[name].level;

module.exports=postcss.plugin(name,function(opt){
    return function(css,result){

        var isNewLine=/[\r\n]/;

        css.walkDecls(function(decl){
            var before=decl.raws.before;
            if(!isNewLine.test(before)){

                var cssString = decl.toString();
                result.warn(msg,{node:decl,level:errorLevel,content:cssString});
            }
        });
    }
});
