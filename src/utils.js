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
