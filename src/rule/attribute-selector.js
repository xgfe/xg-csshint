/**
 * [强制] 属性选择器中的值必须用双引号包围。
 */
"use strict"

var postcss=require('postcss');
var name='attribute-selector';
var msg='Attribute selectors of values must be enclosed in double quotation marks';
var errorType='error';

module.exports=postcss.plugin(name,function(opt){
    return function(css,result){

        var getAttributeSelectorReg=/\[([\s\S]*?)\]/g;
        var doubleQuotationMarks=/^"[\s\S]*?"$/;
        css.walkRules(function(rule){
            var attributeSelector;
            while(attributeSelector=getAttributeSelectorReg.exec(rule)){
                var attributeString = attributeSelector[1];
                var attributeValue=attributeString.split('=')[1];
                if(!doubleQuotationMarks.test(attributeValue)){
                    result.warn(msg,{node:rule,type:errorType});
                }
            }
        });
    }
});