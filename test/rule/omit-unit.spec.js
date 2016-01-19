/**
 * [强制] 长度为 0 时须省略单位。 (也只有长度单位可省)
 */
'use strict';

var csshint = require('../../src/parse');
var options = {};
 options.config = require('../../src/config');
describe("omit-unit",function(){
    it('Unit of length is zero must be omitted',function(){
        var cssString="body {\n    padding: 0 5px .1rem;\n}";
        var messages=csshint(cssString,null,options);

        expect(messages.length).toBe(0);
    });

    it('Not omit the unit length of 0',function(){
        var cssString="body {\n    padding: 5px 0px;\n    margin: 0px;}";
        var messages=csshint(cssString,null,options);
        expect(messages.length).toBe(2);
    })

    it('error msg',function(){
        var cssString="body {\n    padding: 0px 5px;\n    margin: 0px;}";
        var messages=csshint(cssString,null,options);
        expect(messages[0].text).toEqual("Unit of length is zero must be omitted");
    });


});