/**
 * post-css-plugin
 * [强制] 使用 4 个空格做为一个缩进层级，不允许使用 2 个空格 或 tab 字符。
 * TODO 处理带私有前缀问题
 */

var postcss=require('postcss');
var prefixes = require('../prefixes');

var name='text-indent';
var msg='text-indent must be 4 space';
var errorType='error';
var shouldIndent="    ";//缩进字符
module.exports=postcss.plugin(name,function(opt){
    return function(css,result){
        css.walkRules(function(rule){
            var atRules=[];
            var parentRule=rule.parent;

            while(parentRule.type=='atrule'){
                atRules.unshift(parentRule);
                parentRule=parentRule.parent;
            }
            dealRules(atRules,rule,result);
        });
    }
});

function dealRules(atRules,rule,result){

    if(atRules.length==0){
        //证明rule的startpos=1;
        var shouldIndentStr=shouldIndent;

        rule.walkDecls(function(decl){
           if(!ignor(decl.prop) && decl.raws.before !== '\n'+shouldIndentStr){
               result.warn(msg,{node:decl,type:errorType});
           }
        });
    }else{
        atRules.forEach(function(atr,index){
            if(index==0){
                //第一层暂时没想好需不需要顶格书写，忽略掉

            }else{
                var beforeStr=atr.raws.before;
                var shouldIndentStr="";
                for(var i=0;i<index;i++){
                    shouldIndentStr+=shouldIndent;
                }
                if(beforeStr!=='\n'+shouldIndentStr){
                    result.warn(msg,{node:atr,type:errorType});
                }
            }


            if(index==atRules.length-1){
                //处理每个decl
                index++;
                var beforeStr=rule.raws.before;
                var shouldIndentStr="";
                for(var i=0;i<index;i++){
                    shouldIndentStr+=shouldIndent;
                }
                if(beforeStr!=='\n'+shouldIndentStr){
                    result.warn(msg,{node:rule,type:errorType});
                }
                index++;
                //这里不用atrule 防止重复报错
                rule.walkDecls(function(decl){
                    var beforeStr=decl.raws.before;
                    var shouldIndentStr="";
                    for(var i=0;i<index;i++){
                        shouldIndentStr+=shouldIndent;
                    }
                    if(beforeStr!=='\n'+shouldIndentStr){
                        result.warn(msg,{node:decl,type:errorType});
                    }
                });
            }
        });
    }
}
var prefixesReg = /^(-webkit-|-moz-|-ms-|-o-)/;//判断是否有前缀
/**
 * 需要前缀的属性不管缩进，因为不好判断
 * @param prop
 * @returns {boolean}
 */
function ignor(prop){
    if(prefixesReg.test(prop)) return true;
    if(prefixes[prop]) return true;
    return false;
}