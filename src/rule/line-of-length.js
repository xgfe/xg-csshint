/**
 * [强制] 每行不得超过 80 个字符，除非单行不可分割。
 */
"use strict"

var postcss=require('postcss');
var name='line-of-length';
var msg='A line of no more than 80 characters';

module.exports=postcss.plugin(name,function(options){
    return function(css,result){

        var config = options.config;
        var errorLevel=config[name].level;
        var maximumLength=config[name].maximumLength;


        //注意，这里只判断了value的长度，并没有算上prop的长度
        css.walkDecls(function(decl){
            var value = decl.value;

            var lines=value.split('\n');
            lines.forEach(function(line){
                line = line.trim(); //去掉首尾空格，因为判断是否是多属性的依据是里面有没有空格
               if(line.length>maximumLength && line.indexOf(' ')!==-1){
                   //一行超过80,并且是多个属性

                   var content = decl.toString();

                   result.warn(msg,{
                       level: errorLevel,
                       node:decl,
                       content: content,
                   });
               }
            });
        });
    };
});