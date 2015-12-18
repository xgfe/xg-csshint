/**
 * [强制] url() 函数中的路径不加引号。
 */
'use strict';

var csshint = require('../../src/parse');
describe('disallow-quotes-in-url', function () {
    it('The paths through the url function without quotation marks', function () {
        var cssString = "html {\n    background: url(http://www.w3school.com.cn/);\n}";
        var messages = csshint(cssString);
        expect(messages.length).toBe(0);
    });

    it('single quotes', function () {
        var cssString = "html {\n    background: url(http://www.w3school.com.cn/), url('http://www.w3school.com.cn/');\n}";
        var messages = csshint(cssString);
        expect(messages.length).toBe(1);
    })

    it('double quotes', function () {
        var cssString = "html {\n    background: url(\"http://www.w3school.com.cn/\");\n}";
        var messages = csshint(cssString);
        expect(messages.length).toBe(1);
    })

    it('error msg', function () {
        var cssString = "html {\n    background: url(\"http://www.w3school.com.cn/\");\n}";
        var messages = csshint(cssString);
        expect(messages[0].text).toEqual('The paths through the url function without quotation marks');
    })

    it('error type', function () {
        var cssString = "html {\n    background: url(\"http://www.w3school.com.cn/\");\n}";
        var messages = csshint(cssString);
        expect(messages[0].type).toEqual('error');

    })
})