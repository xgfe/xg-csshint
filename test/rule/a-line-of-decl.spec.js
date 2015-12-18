/**
 * [强制] 属性定义必须另起一行，即使只有一个属性值。
 */
'use strict';

var csshint = require('../../src/parse');

describe('a-line-of-decl', function () {

    it('Attribute must be a new line', function () {
        var cssString = "html {\n    font-size: 14px;\r    color: #000;\r\n    margin: 0;}";
        var messages=csshint(cssString);

        expect(messages.length).toBe(1);
    });

    it('attribute one line',function(){
        var cssString = "html {\n    font-size: 14px;    color: #000;\n}";
        var messages=csshint(cssString);
        expect(messages.length).toBe(2);
    });

    it('error msg',function(){
        var cssString = "html {\n    font-size: 14px;\t    color: #000;\n}";
        var messages=csshint(cssString);
        expect(messages[0].text).toBe("Attribute must be a new line");
    });

    it('error type',function(){
        var cssString = "html {\n    font-size: 14px;\t    color: #000;\n}";
        var messages=csshint(cssString);
        expect(messages[0].type).toBe('error');
    });
});