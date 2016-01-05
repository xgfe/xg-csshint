/**
 * xg-csshint 处理命令行
 */

var path = require("path");
var glob = require('glob');
var chalk = require("chalk");
var fs = require("fs");

var parse = require("./parse");
var utils = require("./utils");
var package = require("../package.json")

var cwd = process.cwd();

module.exports = function (args) {
    var args = args.slice(2);
    //console.log(args);
    //打印版本
    if (args[0] === '-v' || args[0] === '-version') {
        console.log("version:", package['version']);
        return;
    }

    //指定文件
    if(args[0] === '-f'){
        parseFiles([args[1]]);
        return;
    }

    //指定配置文件路径
    if (args[0] === '-p')
        getFileList(args[1]);
    else
        getFileList();



}

function parseFiles(files) {
    var messages = {};
    files.forEach(function (file) {
        var filePath = path.resolve(cwd, file);
        var cssContent = utils.getContent(filePath);

        messages[file] = parse(cssContent, file);
    });
    var errorNumber=0;
    var warningNumber=0;
    for (var file in messages) {
        if (messages.hasOwnProperty(file)) {

            if(messages[file].length)    console.log(file);

            messages[file].forEach(function (message) {
                if(message.type.toLowerCase() == 'error') errorNumber++;
                else if(message.type.toLowerCase() == 'warning') warningNumber++;
                console.log(messagesToString(message));
            });
        }
    }

    console.log('\n---errors:%d,warnings:%d---',errorNumber,warningNumber);
}
/**
 * 格式化message对象，提供给console输出
 * @param message
 */
function messagesToString(message) {
    var type = message.type.toUpperCase();

    var text = chalk.gray("'" + message.text + "'");
    var line = message.line;
    var column = message.column;
    var content =chalk.magenta( message.content );
    if (type == 'ERROR') {
        type = chalk.bgRed(type);
        type = chalk.white(type);
    }

    return type + " Line:" + line + ", Colum:" + column + " "+content+" "+ text;
}

function getFileList(userPath) {
    //加载配置文件，读取文件规则和忽略规则
    var configPath
    if(userPath)
        configPath = path.resolve(cwd,userPath);
    else
        configPath = path.join(cwd, "xg-csshint.json");//默认配置文件

    var defaultConfig = require("./config");
    if(fs.existsSync(configPath))
        var config = require(configPath);
    else
        var config={};
    config=utils.merage(config,defaultConfig);

    var files = config['files'];
    var ignore = config['ignore'];

    if (!Array.isArray(files)) files = [files];
    if (!Array.isArray(ignore)) ignore = [ignore];

    //这里有个坑，glob加{}时，必须每个后面都要加个`,`不然会忽略没有`,`结尾的pattern

    files = "{" + files.join(',') + ",}";
    ignore = "{" + ignore.join(',') + ",}";

    glob(files, {mark: true, cwd: cwd, ignore: ignore}, function (err, matchs) {
        if (err) {
            console.log(err);
        } else {
            parseFiles(matchs);
        }
    })
}