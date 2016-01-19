/**
 * [强制] 属性定义后必须以分号结尾。
 */
'use strict';

var csshint = require('../../src/parse');
var options = {};
 options.config = require('../../src/config');
describe("decl-end-of-semicolon", function () {
    it('Attributes must end with a semicolon', function () {
        var cssString = "html {\n    font-size: 14px;\n    color: #000;\n}\nbody {\n}";
        var messages=csshint(cssString,null,options);

        expect(messages.length).toBe(0);
    });

    it("Attributes didn't end with a semicolon",function(){
        var cssString="html {\n    font-size: 14px;\n    color: #000\n}\nbody {\n}";
        var messages=csshint(cssString,null,options);
        expect(messages.length).toBe(1);
    });

    it('error msg',function(){
        var cssString="html {\n    font-size: 14px;\n    color: #000\n}\nbody {\n}";
        var messages=csshint(cssString,null,options);
        expect(messages[0].text).toEqual("Attributes must end with a semicolon");
    });

});