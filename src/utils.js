/**
 * 工具库
 */
var fs=require('fs');
var path=require('path');

exports.getContent=function(path){
   return fs.readFileSync(path,'utf-8');
}


exports.contentFormat=function(content){
    return content.replace(/[\r\n]|\r\n/g,'\n');
}

/**
 * 获取最后一行最后一个字符的 line column
 * @param string
 */
exports.getLineAndColumn=function(string,start){
    var rows = string.split(/\n/);
    var line = rows.length + start.line -1;
    var column =  rows[rows.length-1].length+1;
    return {line:line,column:column};
}

/**
 * 合并函数
 * @param to 被合并对象
 * @param form 来源
 */
exports.merage=function(to,form){
    var value;
    for (var k in form) {
        if (form.hasOwnProperty(k)) {
            value = form[k];
            if (exports.isObject(value)) {
                to[k] =to[k]|| {};
            } else if (exports.isArray(value)) {
                to[k] =to[k]|| [];
            }else{
                //非数组和对象不处理
                to[k]=form[k];
                continue;
            }
            arguments.callee(to[k], form[k]);
        }
    }
    return to;
}

var list = ['Arguments', 'Object', 'Array', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'];
list.forEach(function (name) {
    exports['is' + name] = function (obj) {
        return toString.call(obj) === '[object ' + name + ']';
    };
})

var form={
    files:"text"
}
var to={
    files:"xxxx",
    ignore:'123'
}
