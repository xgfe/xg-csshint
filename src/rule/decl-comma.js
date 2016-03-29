/**
 * [强制] 列表型属性值 书写在单行时，, 后必须跟一个空格。
 *
 */
"use strict"

var postcss=require('postcss');
var utils = require("../utils");
var name='decl-comma';
var msg='Single attribute comma must have a space';

module.exports=postcss.plugin(name,function(options){
    return function(css,result){

        var config = options.config;
        var errorLevel=config[name].level;
		if(errorLevel===0) return;


        var followedComma = config[name].followedComma; //`,`后面跟随比较的内容
        var commaSpaceReg=/,([\s\n]*)/g;
        css.walkDecls(function(decl){
            var value=decl.value;
            var v;
            while(v=commaSpaceReg.exec(value)){
                var after = v[1];

                if(after !== followedComma && after.indexOf("\n") == -1){
                    var cssString = decl.prop + decl.raws.between + value.substring(0, v.index+1)

                    var before = decl.raws.before.replace(/\n/,"");
                    var position = utils.getLineAndColumn(before+cssString,decl.source.start);
                    result.warn(msg,{
                        level: errorLevel,
                        node:decl,
                        content:cssString,
                        line:position.line,
                        column:position.column,

                    });
                }
            }

        });
    }
})