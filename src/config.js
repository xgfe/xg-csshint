/**
 * Author liuyang46@meituan.com
 * Date 16/1/5
 * Describe csshint的默认配置文件
 */
"use strict";

// level 0 忽略 1 错误 2 警告

var config = {
    //默认当前目录下的所有css文件,只在命令行模式下有效
    files: ["**/*.css"],
    //不忽略任何文件,只在命令行模式下有效
    ignore: [""],

    // [强制] 属性定义必须另起一行，即使只有一个属性值。
    "a-line-of-decl": {
        level: 1
    },

    //[强制] : 与 属性值 之间必须包含空格。
    "after-colon": {
        level: 1,
    },

    //[强制] 属性选择器中的值必须用双引号包围。
    "attribute-selector": {
        level: 1
    },

    //[强制] 属性名 与之后的 : 之间不允许包含空格
    "before-colon": {
        level: 1
    },

    // [强制] 颜色值可以缩写时，必须使用缩写形式。
    "color-abbr": {
        level: 1
    },

    // [强制] 文本内容必须用双引号包围。
    "content-double-quotation": {
        level: 1
    },
    // [强制] 列表型属性值 书写在单行时，, 后必须跟一个空格。
    "decl-comma": {
        level: 1,
        followedComma: " ", //`,`后面跟随一个空格
    },

    //[强制] 属性定义后必须以分号结尾。
    "decl-end-of-semicolon": {
        level: 1,
    },

    // [强制] 不要使用 @import
    "disallow-import": {
        level: 1,
    },

    // [强制] 颜色值不允许使用命名色值
    "disallow-named-color": {
        level: 1
    },

    // [强制] url() 函数中的路径不加引号。
    "disallow-quotes-in-url": {
        level: 1
    },

    // [强制] 禁止使用 Expression
    "disallow-use-expression": {
        level: 1,
    },

    // [强制] font-weight 属性必须使用数值方式描述。
    "font-weight-number": {
        level: 1
    },

    // [强制] RGB颜色值必须使用十六进制记号形式 #rrggbb。不允许使用 rgb()。
    "hex-color": {
        level: 1
    },

    // [强制] 必须同时给出水平和垂直方向的位置。
    "horizontal-vertical-position": {
        level: 1
    },

    // [强制] !important前必须有一个空格。
    "important": {
        level: 1
    },

    // [强制] 每行不得超过 80 个字符，除非单行不可分割。
    "line-of-length": {
        level: 1,
        maximumLength: 80, //每行最大长度
    },

    // [强制] Media Query 如果有多个逗号分隔的条件时，应将每个条件放在单独一行中。
    "media-query-require-new-line": {
        level: 1
    },

    // [强制] PC端Web页面，其字号应不小于 12px
    "min-font-size": {
        level: 1,
        minimumSize: 12, //配置最小字号,注意是<判断
    },

    // [强制] 当一个 rule 包含多个 selector 时，每个选择器声明必须独占一行。
    "more-selector": {
        level: 1
    },

    // [强制] 长度为 0 时须省略单位。 (也只有长度单位可省)
    "omit-unit": {
        level: 1
    },

    // [强制] 当数值为 0 - 1 之间的小数时，省略整数部分的 0。
    "omit-zero": {
        level: 1
    },

    // [强制] 使用 transition 时应指定 transition-property
    "require-transition-property": {
        level: 1
    },

    // [强制] 选择器 与 { 之间必须包含空格。
    "selector-between-onespace": {
        level: 1,
        contains: ' ', //这里设置包含多少个空格,默认一个
    },

    // [强制] >、+、~ 选择器的两边各保留一个空格。
    "selector-both-spaces": {
        level: 1,
        afterSelector: ' ', //设置选择器之后空格
        beforeSelector: ' ',//设置选择器之前空格
    },

    // [强制] 使用 4 个空格做为一个缩进层级，不允许使用 2 个空格 或 tab 字符。
    "text-indent": {
        level: 1,
        textIndent:"    ",//缩进4个空格
    },

    // [强制] font-family 不区分大小写，但在同一个项目中，同样的 Family Name 大小写必须统一。
    "unifying-font-family-case-sensitive": {
        level: 1
    },

    // [强制] 带私有前缀的属性由长到短排列，按冒号位置对齐，标准属性放在最后。
    "vendor-prefixes-sort": {
        level: 1
    },

    // [建议] CSS 文件使用无 BOM 的 UTF-8 编码。
    "without-bom":{
        level: 2
    },

    //建议] 如无必要，不得为 id、class 选择器添加类型选择器进行限定
    "disallow-overqualified-elements":{
        level: 2
    }
}

module.exports = config;