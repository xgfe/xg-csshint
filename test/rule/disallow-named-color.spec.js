/**
 *  [强制] 颜色值不允许使用命名色值
 */
'use strict';

var csshint = require('../../src/parse');
var utils = require('../../src/utils');
var path = require('path');
var getContent = utils.getContent;

describe("disallow-named-color", function () {
    beforeAll(function () {
        var cssPath = path.join(__dirname, 'css', 'disallow-named-color.css');
        this.cssString = getContent(cssPath);
        this.cssPath = cssPath;
        this.messages = csshint(this.cssString, cssPath);
    });

    it('should return right messages',function(){
        expect(this.messages[0].text).toEqual("Color values using named color value is not allowed");
    });

    it('should return right length',function(){
       expect(this.messages.length).toBe(2);
    });
});