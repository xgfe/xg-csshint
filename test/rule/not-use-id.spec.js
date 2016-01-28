/**
 *  [建议] 尽量不使用id选择器定义样式
 */
'use strict';

var csshint = require('../../src/parse');
var utils = require('../../src/utils');
var path = require('path');
var getContent = utils.getContent;
var options = {};
options.config = require('../../src/config');

fdescribe("not-use-id", function () {
    beforeAll(function () {
        var cssPath = path.join(__dirname, 'css', "not-use-id.css");
        this.cssString = getContent(cssPath);
        this.cssPath = cssPath;
        this.messages = csshint(this.cssString, cssPath, options);
    });

    it('messages should be right', function () {
        expect(this.messages.length).toBe(1);
    });

    it('messages text should be right', function () {
        expect(this.messages[0].text).toEqual("Do not use the id selector");
    })
});