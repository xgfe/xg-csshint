/**
 *  尽量少用 * 选择器
 */
'use strict';

var csshint = require('../../src/parse');
var utils = require('../../src/utils');
var path = require('path');
var getContent = utils.getContent;
var options = {};
options.config = require('../../src/config');

describe("not-use-asterisk", function () {
    beforeAll(function () {
        var cssPath = path.join(__dirname, 'css', "not-use-asterisk.css");
        this.cssString = getContent(cssPath);
        this.cssPath = cssPath;
        this.messages = csshint(this.cssString, cssPath, options);
    });

    it('messages should be right', function () {
        expect(this.messages.length).toBe(2);
    });

    it('messages text should be right', function () {
        expect(this.messages[0].text).toEqual("Try not to use the * selector");
    })
});