/**
 * [强制] 当一个 rule 包含多个 selector 时，每个选择器声明必须独占一行。
 */
"use strict"

var postcss=require('postcss');
var utils = require('../utils');
var name='more-selector';
var msg='Each selector must be exclusive';
var errorType='error';

module.exports=postcss.plugin(name,function(opt){
    return function(css,result){

        var newLineReg = /,(?!\n)/g
        css.walkRules(function(rule){
            var noNewLine;
            while(noNewLine=newLineReg.exec(rule.selector)){

                var cssString = rule.selector.substring(0,noNewLine.index) + ',';
                var endIndex= rule.selector.indexOf(',',noNewLine.index+1);
                endIndex = endIndex==-1?rule.selector.length:endIndex;
                var content = rule.selector.substring(0,  endIndex);
                var position = utils.getLineAndColumn(cssString,rule.source.start);

                result.warn(msg,{type:errorType,node:rule,content: content,line:position.line,column:position.column});

            }
        })

    }
});
