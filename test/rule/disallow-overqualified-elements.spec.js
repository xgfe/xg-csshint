/**
 * 建议] 如无必要，不得为 id、class 选择器添加类型选择器进行限定
 */
'use strict';

var csshint = require('../../src/parse');
var utils = require('../../src/utils');
var path = require('path');
var getContent = utils.getContent;
var options = {};
options.config = require('../../src/config');
describe("disallow-overqualified-elements", function () {
    beforeAll(function () {
        var cssPath = path.join(__dirname, 'css', "disallow-overqualified-elements.css");
        this.cssString = getContent(cssPath);
        this.cssPath = cssPath;
        this.messages = csshint(this.cssString, cssPath,options);
    });

    it('messages should be right', function () {
        expect(this.messages.length).toBe(3);
    });

    it('messages text should be right', function () {
        expect(this.messages[0].text).toEqual("Not allowed to add a type selector is limited to ID, class selector");
    })
});