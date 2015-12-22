/**
 *  [强制] 属性定义后必须以分号结尾。
 */
var postcss=require('postcss');
var name='decl-end-of-semicolon';
var msg='Attributes must end with a semicolon';
var errorType='error';

module.exports=postcss.plugin(name,function(opt){
    return function(css,result){
        css.walkRules(function(rule){

            //POSTCSS会将最后一行带有`;`的规则的raws.semicolon设置为true
            if(rule.raws.semicolon){
                return;
            }

            var lastDecl = rule.last;
            //如果最后一行是注释，postcss也会解析成未加`;`
            if(lastDecl && lastDecl.type!=='comment'){
                var content = lastDecl.toString();
                var line = lastDecl.source.start.line;
                var column = lastDecl.source.start.column + content.length;
                result.warn(msg,{node:rule,type:errorType,content:content,line:line,column:column});
            }
        });
    }
});
