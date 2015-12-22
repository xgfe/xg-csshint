/**
 * [强制] >、+、~ 选择器的两边各保留一个空格。
 */
"use strict"

var postcss=require('postcss');
var utils = require("../utils");
var name='selector-both-spaces';
var msg='On both sides of the selector one and only one space';
var errorType='error';

module.exports=postcss.plugin(name,function(opt){

    return function(css,result){
        var selectorReg=/(\s*)[~>+](\s*)/g; //取出选择器两边的所有空白符

        css.walkRules(function(rule){

            var match;
            var selector = rule.selector;
            while(match=selectorReg.exec(selector)){

                if(match[1] != " " || match[2] != " "){
                    var cssString = selector.substring(0,match.index);
                    var position = utils.getLineAndColumn(cssString,rule.source.start);
                    var index = selector.indexOf(",",match.index);
                    index = index==-1?selector.length:index;
                    var content = selector.substring(0,index);
                    result.warn(msg, {node: rule, type: errorType,line:position.line,column:position.column,content:content});
                }
            }



        });
    }

});