/**
 *[强制] 长度为 0 时须省略单位。 (也只有长度单位可省)
 */

var postcss=require('postcss');
var name='omit-unit';
var msg='Unit of length is zero must be omitted';
var errorType='error';

module.exports=postcss.plugin(name,function(opt){
    return function(css,result){
        var notOmitUnit=/\b0[a-zA-Z]+?\b/;//找出0px,0rem,0xxx
        css.walkDecls(function(decl){
            var value = decl.value;

            if(notOmitUnit.test(value)){
                result.warn(msg,{node:decl,type:errorType});
            }
        })
    }
});
