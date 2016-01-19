/**
 * Author liuyang46@meituan.com
 * Date 16/1/19
 * Describe 暴露给别人通过require引入
 */
var parse = require("./parse.js");
var defaultConfig = require("./config.js");
var utils = require("./utils.js");

module.exports = function (config) {
    var options = {};
    config = config||{};
    config=utils.merage(defaultConfig,config);
    options.config = config;
    return function (css, path) {
        var messages= parse(css, path, options);
        messages=messages.map(function(message){
            return {
                text:message.text,
                line:message.line,
                column:message.column,
                level:message.level,
                content:message.content,
                plugin:message.plugin
            }
        });

        return messages;
    }
}