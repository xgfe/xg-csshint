/**
 * post-css-plugin
 * [强制] 使用 4 个空格做为一个缩进层级，不允许使用 2 个空格 或 tab 字符。
 * done 处理带私有前缀问题 私有前缀直接忽视
 */

var postcss = require('postcss');
var prefixes = require('../prefixes');

var name = 'text-indent';
var msg = 'text-indent must be 4 space';
var errorLevel, textIndent;

module.exports = postcss.plugin(name, function (options) {
    return function (css, result) {

        var config = options.config;
        errorLevel = config[name].level;
        textIndent = config[name].textIndent;//缩进字符

        css.walkRules(function (rule) {
            var atRules = [];
            var parentRule = rule.parent;

            while (parentRule.type == 'atrule') {
                atRules.unshift(parentRule);
                parentRule = parentRule.parent;
            }
            dealRules(atRules, rule, result);
        });
    }
});

function dealRules(atRules, rule, result) {

    if (atRules.length == 0) {
        //证明rule的startpos=1;
        var textIndentStr = textIndent;

        rule.walkDecls(function (decl) {
            var content = decl.raws.before.replace(/\n/, "") + decl.toString();
            if (!ignor(decl.prop) && decl.raws.before !== '\n' + textIndentStr) {
                result.warn(msg, {
                    node: decl,
                    level: errorLevel,
                    content: content,

                });
            }
        });
    } else {
        atRules.forEach(function (atr, index) {
            if (index == 0) {
                //第一层暂时没想好需不需要顶格书写，忽略掉

            } else {
                var beforeStr = atr.raws.before;
                var textIndentStr = "";
                for (var i = 0; i < index; i++) {
                    textIndentStr += textIndent;
                }
                if (beforeStr !== '\n' + textIndentStr) {
                    var content = atr.raws.before.replace(/\n/, "") + "@" + atr.name + atr.raws.between + atr.params;
                    result.warn(msg, {
                        node: atr,
                        level: errorLevel,
                        content: content,

                    });
                }
            }


            if (index == atRules.length - 1) {
                //处理每个decl
                index++;
                var beforeStr = rule.raws.before;
                var textIndentStr = "";
                for (var i = 0; i < index; i++) {
                    textIndentStr += textIndent;
                }

                if (beforeStr !== '\n' + textIndentStr) {
                    var content = rule.raws.before.replace(/\n/, "") + rule.selector;
                    result.warn(msg, {
                        node: rule,
                        level: errorLevel,
                        content: content,

                    });
                }
                index++;
                //这里不用atrule 防止重复报错
                rule.walkDecls(function (decl) {
                    var beforeStr = decl.raws.before;
                    var textIndentStr = "";
                    for (var i = 0; i < index; i++) {
                        textIndentStr += textIndent;
                    }
                    if (beforeStr !== '\n' + textIndentStr) {
                        var content = decl.raws.before.replace(/\n/, "") + decl.toString();
                        result.warn(msg, {
                            node: decl,
                            level: errorLevel,
                            content: content,

                        });
                    }
                });
            }
        });
    }
}
var prefixesReg = /^(-webkit-|-moz-|-ms-|-o-)/;//判断是否有前缀
/**
 * 需要前缀的属性不管缩进，因为不好判断
 * @param prop
 * @returns {boolean}
 */
function ignor(prop) {
    if (prefixesReg.test(prop)) return true;
    if (prefixes[prop]) return true;
    return false;
}