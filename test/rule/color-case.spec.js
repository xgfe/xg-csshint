/**
 *  颜色值在同一个项目中不要又有大写又有小写
 */
'use strict';

var csshint = require('../../src/parse');
var utils = require('../../src/utils');
var path = require('path');
var getContent = utils.getContent;
var options = {};
options.config = require('../../src/config');

describe("color-case", function () {
    beforeAll(function () {
        var cssPath = path.join(__dirname, 'css', "color-case.css");
        this.cssString = getContent(cssPath);
        this.cssPath = cssPath;
        this.messages = csshint(this.cssString, cssPath, options);
    });

    it('messages should be right', function () {
        expect(this.messages.length).toBe(1);
    });

    it('messages text should be right', function () {
        expect(this.messages[0].text).toEqual("Color values must be lowercase");
    })
});