/**
 * [强制] url() 函数中的路径不加引号。
 */

var postcss=require('postcss');
var name='disallow-quotes-in-url';
var msg='The paths through the url function without quotation marks';
var errorType='error'

module.exports=postcss.plugin(name,function(opt){
   return function(css,result){
       var getUrlValue=/\burl\(['"][\s\S]+?['"]\)/g;//提取url('xxxx') url("xxx")
        css.walkDecls(function(decl){
            var value = decl.value;
            var urlPath;
            while(urlPath=getUrlValue.exec(value)){
                //只报一次错
                result.warn(msg,{node:decl,type:errorType});
                break;
            }
        });
   }
});