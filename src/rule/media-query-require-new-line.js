/**
 *  [强制] Media Query 如果有多个逗号分隔的条件时，应将每个条件放在单独一行中。
 */

var postcss = require('postcss');
var utils = require("../utils");
var name = 'media-query-require-new-line';
var msg = 'each query conditions for one line';
var errorType = 'error'

module.exports = postcss.plugin(name, function (opt) {
    return function (css, result) {

        var notNewline=/,(?!\s*[\n\r])/g; //判断,后面没有换行符

        css.walkAtRules(function(atRule){
            if(atRule.name=='media'){

                var params = atRule.params;

                var beforeAtRuleString=atRule.raws.before.replace(/\n/,"");

                var condition;
                while(condition=notNewline.exec(params)){

                    var cssString = beforeAtRuleString + params.substring(0,condition.index);
                    var position = utils.getLineAndColumn(cssString,atRule.source.start);
                    var content = "@media"+atRule.raws.between+atRule.params;

                    result.warn(msg,{node:atRule,type:errorType,content: content,line: position.line,column: position.column});
                }


            }
        });
    }
});
