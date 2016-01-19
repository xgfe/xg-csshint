/**
 * csshint 入口文件
 */var postcss = require('postcss');
var fs = require('fs');
var path = require('path');
var utils=require('./utils')

/**
 * 解析css
 * @param content css内容
 * @param path css文件路径
 * @param options 包含config,并且也是一个持久变量，供unifying-font-family-case-sensitive临时存放数据
 * @returns {*} 包含报错结果
 */
function parse(content,path,options) {
    content=utils.contentFormat(content);
    var plugins = getPlugins(options);
    var processor=postcss(plugins);
    var lazy=processor.process(content,{from:path});

    lazy.catch(function(err){
        console.log(err.stack);
    });
    //返回警告信息
    // TODO 警告信息里面加入位置和错误文字截取

    return lazy.result.messages;
}

function getPlugins(options) {
    var rulePath = path.join(__dirname, 'rule');
    var plugins=[];
    var files=fs.readdirSync(rulePath);

    for (var i = 0, file; file = files[i++];) {
        var pluginPath='./rule/'+file;

        var pluginFn=require(pluginPath);
        plugins.push(pluginFn(options));
    }

    return plugins;

}


//var cssString="article {\n    quotes: '\"' '\"';\n}";

//var cssString=utils.getContent(path.resolve("../test/rule/css/unifying-font-family-case-sensitive.css"));
//parse(cssString,path.resolve('../test/rule/css/bom3.css'))

module.exports = parse;