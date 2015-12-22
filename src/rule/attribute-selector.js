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
            var selectorString=rule.raws.before+rule.selector;

            while(attributeSelector=getAttributeSelectorReg.exec(selectorString)){
                var attributeString = attributeSelector[1];
                var attributeValue=attributeString.split('=')[1];

                var analysisResult = analysis(selectorString.substring(0,attributeSelector.index),attributeSelector[0]);
                var line = analysisResult.line + rule.source.start.line - 1;//因为即使没有换行，分析后的也是1+xx，所以会多一行所以减去1
                var column = analysisResult.column;

                if(!doubleQuotationMarks.test(attributeValue)){
                    result.warn(msg,{node:rule,type:errorType,line:line,column:column,content:attributeString});
                }
            }
        });
    }
});

/**
 * 传入 article[character=juliet] 中的 article部分,得到几行几列
 * @param selectorString
 */
function analysis(selectorString,attr){
    var rows=selectorString.split(/\n/);//拆分为多行
    var lastRow = rows[rows.length-1];
    var column = lastRow.length + attr.split('=')[0].length+2;//=号是1个;编辑器是从1开始;所以需要+2
    return {
        line:rows.length,
        column:column
    }
}
