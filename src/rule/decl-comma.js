/**
 * [强制] 列表型属性值 书写在单行时，, 后必须跟一个空格。
 *
 */
"use strict"

var postcss=require('postcss');
var utils = require("../utils");
var name='decl-comma';
var msg='Single attribute comma must have a space';
var config = global.config;
var errorLevel=config[name].level;

module.exports=postcss.plugin(name,function(opt){
    return function(css,result){

        var isBreakLineReg=/^\n/;//判断换行
        var spaceReg=/^\s*/; //提取字符串开头的空白符
        var commaSpaceReg=/,([\s\n]*)/g;
        css.walkDecls(function(decl){
            var value=decl.value;
            var v;
            while(v=commaSpaceReg.exec(value)){
                var after = v[1];

                if(after !== " " && after.indexOf("\n") == -1){
                    var cssString = decl.prop + decl.raws.between + value.substring(0, v.index+1)

                    var before = decl.raws.before.replace(/\n/,"");
                    var position = utils.getLineAndColumn(before+cssString,decl.source.start);
                    result.warn(msg,{level: errorLevel,node:decl,content:cssString,line:position.line,column:position.column});
                }
            }

            //
            //var valueArray=value.split(','); //这里不能使用postcss.list.comma,因为格式化后不能携带空格等信息
            //valueArray.shift(); //抛弃第一个无意义值;
            //valueArray.forEach(function(value){
            //    if(!isBreakLineReg.test(value)){
            //        //非换行情况
            //        var match=value.match(spaceReg)[0];
            //        if(match!=' '){
            //            //不是一个空格开头
            //            result.warn(msg,{level: errorLevel,node:decl});
            //        }
            //    }else{
            //        //TODO 换行后判断对齐问题
            //    }
            //})
        });
    }
})