/**
 * [强制] 每行不得超过 80 个字符，除非单行不可分割。
 */
'use strict';

var csshint = require('../../src/parse');
var options = {};
 options.config = require('../../src/config');
describe('line-of-legth',function(){

    it('No more than 80 characters',function(){
        var cssString='html {\n    background: transparent url(aVeryVeryVeryLongUrlIsPlacedHere);\n}';
        var messages=csshint(cssString,null,options);
        expect(messages.length).toBe(0);
    });

    it('But more than 80 characters in a row',function(){
        var cssString='html {\n    background: url(aVeryVeryVeryLongUrlIsPlacedHereaVeryVeryVeryLongUrlIsPlacedHereaVeryVeryVeryLongUrlIsPlacedHere)\n    repeat;\n}';
        var messages=csshint(cssString,null,options);
        expect(messages.length).toBe(0);
    });

    it('more than 80 characters',function(){
        var cssString='html {\n    background: url(aVeryVeryVeryLongUrlIsPlacedHereaVeryVeryVeryLongUrlIsPlacedHereaVeryVeryVeryLongUrlIsPlacedHere) repeat;\n}';
        var messages=csshint(cssString,null,options);
        expect(messages.length).toBe(1);
    });

    it('error msg',function(){
        var cssString='html {\n    background: url(aVeryVeryVeryLongUrlIsPlacedHereaVeryVeryVeryLongUrlIsPlacedHereaVeryVeryVeryLongUrlIsPlacedHere) repeat;\n}';
        var messages=csshint(cssString,null,options);
        expect(messages[0].text).toBe('A line of no more than 80 characters');
    });


});