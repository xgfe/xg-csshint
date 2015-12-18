/**
 * [强制] 文本内容必须用双引号包围。
 */
'use strict';

var csshint = require('../../src/parse');

describe("content-double-quotation",function(){
    it("Surrounded by text content must be enclosed in double quotation marks",function(){
       var cssString='html p::before {\n    font-family: "Microsoft YaHei", sans-serif;\n    content: "a";\n}';
        var messages=csshint(cssString);
        expect(messages.length).toBe(0);
    });

    it('Text surrounded with single quotation marks',function(){
        var cssString='html p::before {\n    font-family: \'Microsoft YaHei\', sans-serif;\n    content: \'a\';\n}';
        var messages=csshint(cssString);
        expect(messages.length).toBe(2);
    });

    it('css quotes',function(){
        var cssString='html {\n    quotes: "\""  "\"";\n}';
        var messages=csshint(cssString);
        expect(messages.length).toBe(0);
    });

    it('css quotes single quotation',function(){
        var cssString="html {\n    quotes: '\"' '\"';\n}";
        var messages=csshint(cssString);
        expect(messages.length).toBe(1);
    });

    it('css quotes not surrounded',function(){
        var cssString="html {\n    quotes: < >;\n}";
        var messages=csshint(cssString);
        expect(messages.length).toBe(1);
    });

    it('error msg',function(){
        var cssString='html p::before {\n    font-family: \'Microsoft YaHei\', sans-serif;\n    content: \'a\';}';
        var messages=csshint(cssString);
        expect(messages[0].text).toEqual("Surrounded by text content must be enclosed in double quotation marks");
    });

    it('error type',function(){
        var cssString='html p::before {\n    font-family: \'Microsoft YaHei\', sans-serif;\n    content: \'a\';}';
        var messages=csshint(cssString);
        expect(messages[0].type).toEqual("error");
    });
});