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
    var config = {};
    //指定配置文件路径
    if (args[0] === '-p')
        config = loadConfig(args[1]);
    else
        config = loadConfig();

    //指定单个文件或者目录
    if (args[0] === '-f') {
        var filePath = args[1];
        if(fs.statSync(filePath).isDirectory()){
            var cliConfig = {
                files:path.join(filePath,"/**/*.css")
            }
            config = utils.merage(config,cliConfig);

            getFileList(config);
        }else{
            parseFiles([args[1]],config);
        }
    } else {
        getFileList(config);
    }

}

function parseFiles(files,config) {
    var messages = {};
    var options={};
    options.config=config;
    files.forEach(function (file,idx) {
        var filePath = path.resolve(cwd, file);

        var cssContent = utils.getContent(filePath);

        messages[file] = parse(cssContent, file,options);
    });

    var errorNumber = 0;
    var warningNumber = 0;
    for (var file in messages) {
        if (messages.hasOwnProperty(file)) {
            if (messages[file].length)    console.log(file);

            messages[file].forEach(function (message) {
                if (message.level == 1) errorNumber++;
                else if (message.level == 2) warningNumber++;
                console.log(messagesToString(message));
            });
        }
    }

    console.log('\n---errors:%d,warnings:%d---', errorNumber, warningNumber);
    //process.exit() 1错误 0无错误
    if (errorNumber) {
        process.exit(1);
    } else {
        process.exit(0);
    }
}
/**
 * 格式化message对象，提供给console输出
 * @param message
 */
function messagesToString(message) {
    var level = message.level;
    var text = chalk.gray("'" + message.text + "'");
    var line = message.line;
    var column = message.column;
    var content = chalk.magenta(message.content);
    if (level == '1') {
        var type = chalk.bgRed("ERROR");
        type = chalk.white(type);
    }else if(level == '2'){
        var type = chalk.bgBlue("WARNING");
        type = chalk.white(type);
    }
    return type + " Line:" + line + ", Colum:" + column + " " + content + " " + text;
}

function getFileList(config) {
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
            parseFiles(matchs,config);
        }
    })
}
/**
 * 加载config
 * @param userPath
 */
function loadConfig(userPath) {

    //加载配置文件，读取文件规则和忽略规则
    var configPath
    if (userPath)
        configPath = path.resolve(cwd, userPath);
    else
        configPath = path.join(cwd, "xg-csshint.json");//默认配置文件

    var defaultConfig = require("./config");
    if (fs.existsSync(configPath))
        var config = require(configPath);
    else
        var config = {};

    //将用户配置和默认配置合并，用户的配置优先级高
    config = utils.merage(defaultConfig, config);

    return config;
}