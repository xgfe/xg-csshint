/**
 * [强制] 选择器 与 { 之间必须包含空格。
 */
var postcss=require('postcss');
var name = 'selector-between-onespace';
var errorType='error';
var msg='brace after selector need one space before brace';

module.exports=postcss.plugin(name,function(opt){
    return function(css,result){
        css.walkRules(function(rule){
            var between=rule.raws.between;

            if(between!==' '){//只有一个空格
                result.warn(msg,{type:errorType,node:rule});
            }
        });
    }
})