/**
 *[强制] 颜色值可以缩写时，必须使用缩写形式。
 */
'use strict';

var csshint = require('../../src/parse');
var utils = require('../../src/utils');
var path = require('path');
var getContent = utils.getContent;

describe("color-abbr", function () {
    beforeAll(function () {
        var cssPath = path.join(__dirname, 'css', 'color-abbr.css');
        this.cssString = getContent(cssPath);
        this.cssPath = cssPath;
        this.messages = csshint(this.cssString, cssPath);
    });

    it('message\'s length should be 1',function(){
        expect(this.messages.length).toBe(1);
    })

    it('error text',function(){
        expect(this.messages[0].text).toEqual('The color value can be abbreviated, must use abbreviations');
    })

    it('error type',function(){
        expect(this.messages[0].type).toEqual('error');
    })
});