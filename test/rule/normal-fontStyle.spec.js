/**
 *  需要在 Windows 平台显示的中文内容，不要使用除 normal 外的 font-style。其他平台也应慎用
 */
'use strict';

var csshint = require('../../src/parse');
var utils = require('../../src/utils');
var path = require('path');
var getContent = utils.getContent;
var options = {};
options.config = require('../../src/config');

describe("normal-fontStyle", function () {
    beforeAll(function () {
        var cssPath = path.join(__dirname, 'css', "normal-fontStyle.css");
        this.cssString = getContent(cssPath);
        this.cssPath = cssPath;
        this.messages = csshint(this.cssString, cssPath, options);
    });

    it('messages should be right', function () {
        expect(this.messages.length).toBe(1);
    });

    it('messages text should be right', function () {
        expect(this.messages[0].text).toEqual("Please use the font-style: normal;");
    })
});