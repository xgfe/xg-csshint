/**
 *  [建议] 选择器的嵌套层级应不大于 3 级，位置靠后的限定条件应尽可能精确。
 */
'use strict';

var csshint = require('../../src/parse');
var utils = require('../../src/utils');
var path = require('path');
var getContent = utils.getContent;
var options = {};
options.config = require('../../src/config');

describe("selector-nested", function () {
    beforeAll(function () {
        var cssPath = path.join(__dirname, 'css', "selector-nested.css");
        this.cssString = getContent(cssPath);
        this.cssPath = cssPath;
        this.messages = csshint(this.cssString, cssPath, options);
    });

    it('messages should be right', function () {
        expect(this.messages.length).toBe(1);
    });

    it('messages text should be right', function () {
        expect(this.messages[0].text).toEqual("The selector nested hierarchy is not greater than 3");
    })
});