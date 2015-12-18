/**
 * [强制] 当数值为 0 - 1 之间的小数时，省略整数部分的 0。
 */

'use strict';

var csshint = require('../../src/parse');

describe('omit-zero',function(){
    it('When the value is between 0 and 1 decimal, omit the integer part of 0',function(){
        var cssString="html {\n    font-size: .12rem;\n    opacity: .8;\n    border-width: 12.12px;\n}";
        var messages=csshint(cssString);

        expect(messages.length).toBe(0);
    })

    it('When the value is between 0 and 1 decimal not omitted',function(){
        var cssString="html {\n    font-size: 0.12rem;\n    opacity: 0.8;\n}";
        var messages=csshint(cssString);
        expect(messages.length).toBe(2);
    });

    it('error msg',function(){
        var cssString="html {\n    font-size: 0.12rem;\n    opacity: 0.8;\n}";
        var messages=csshint(cssString);
        expect(messages[0].text).toEqual("When the value is between 0 and 1 decimal omit zero");
    })
    it('error type',function(){
        var cssString="html {\n    font-size: 0.12rem;\n    opacity: 0.8;\n}";
        var messages=csshint(cssString);
        expect(messages[0].type).toEqual('error');
    })
});