/**
 * [强制] 列表型属性值 书写在单行时，, 后必须跟一个空格。
 *  TODO 报一个错就好
 */
"use strict"

var postcss=require('postcss');
var name='decl-comma';
var msg='Single attribute comma must have a space';
var errorType='error';

module.exports=postcss.plugin(name,function(opt){
    return function(css,result){

        var isBreakLineReg=/^\n/;//判断换行
        var spaceReg=/^\s*/; //提取字符串开头的空白符
        css.walkDecls(function(decl){
            var value=decl.value;
            var valueArray=value.split(','); //这里不能使用postcss.list.comma,因为格式化后不能携带空格等信息
            valueArray.shift(); //抛弃第一个无意义值;
            valueArray.forEach(function(value){
                if(!isBreakLineReg.test(value)){
                    //非换行情况
                    var match=value.match(spaceReg)[0];
                    if(match!=' '){
                        //不是一个空格开头
                        result.warn(msg,{type:errorType,node:decl});
                    }
                }else{
                    //TODO 换行后判断对齐问题
                }
            })
        });
    }
})