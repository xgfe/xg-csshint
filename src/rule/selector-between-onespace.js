/**
 * [强制] 选择器 与 { 之间必须包含空格。
 */
var postcss=require('postcss');
var utils = require('../utils');


var name = 'selector-between-onespace';
var errorType='error';
var msg='brace after selector need one space before brace';

module.exports=postcss.plugin(name,function(opt){
    return function(css,result){
        css.walkRules(function(rule){
            var between=rule.raws.between;

            if(between!==' '){//只有一个空格

                var cssString = rule.raws.before.replace(/\n/,"") + rule.selector
                var position = utils.getLineAndColumn(cssString,rule.source.start);
                var content= cssString + rule.raws.between + '{';
                result.warn(msg,{type:errorType,node:rule,content:content,line:position.line,column:position.column});
            }
        });
    }
})

