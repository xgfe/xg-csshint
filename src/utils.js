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