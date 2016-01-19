/**
 * [强制] !important前必须有一个空格。
 */
'use strict';

var csshint = require('../../src/parse');
var options = {};
 options.config = require('../../src/config');
describe('important', function () {
    it('before must one space', function () {
        var cssString = 'html {\n    font-size: 14px !important;\n}';
        var messages = csshint(cssString,null,options);
        expect(messages.length).toBe(0);
    });

    it('before tab', function () {
        var cssString = 'html {\n    font-size: 14px\t!important;\n}';
        var messages = csshint(cssString,null,options);
        expect(messages.length).toBe(1);
    });

    it('before two space',function(){
        var cssString = 'html {\n    font-size: 14px  !important;\n}';
        var messages = csshint(cssString,null,options);
        expect(messages.length).toBe(1);
    });

    it('error msg',function(){
        var cssString = 'html {\n    font-size: 14px  !important;\n}';
        var messages = csshint(cssString,null,options);
        expect(messages[0].text).toEqual("Must have a space before the !important");
    })



});