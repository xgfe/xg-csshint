/**
 * [强制] 属性定义必须另起一行，即使只有一个属性值。
 */
'use strict';

var csshint = require('../../src/parse');
var config = require('../../src/config');
var options={};
options.config=config;
describe('a-line-of-decl', function () {

    it('Attribute must be a new line', function () {
        var cssString = "html {\n    font-size: 14px;\r    color: #000;\r\n    margin: 0;}";
        var messages=csshint(cssString,null,options);

        expect(messages.length).toBe(0);
    });

    it('attribute one line',function(){
        var cssString = "html {\n    font-size: 14px;    color: #000;\n}";
        var messages=csshint(cssString,null,options);

        expect(messages.length).toBe(2);
    });

    it('error msg',function(){
        var cssString = "html {\n    font-size: 14px;\t    color: #000;\n}";
        var messages=csshint(cssString,null,options);
        expect(messages[0].text).toBe("Attribute must be a new line");
    });



    it('error type',function(){
        var cssString = "html {\n    font-size: 14px;\t    color: #000;\n}";
        var messages=csshint(cssString,null,options);
        expect(messages[0].line).toBe(2);
        expect(messages[0].column).toBe(26);
    });
});