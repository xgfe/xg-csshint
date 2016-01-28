/**
 * [建议] CSS 文件使用无 BOM 的 UTF-8 编码
 */
'use strict';

var csshint = require('../../src/parse');
var utils = require('../../src/utils');
var path = require('path');
var getContent = utils.getContent;
var options = {};
options.config = require('../../src/config');
describe("without-bom", function () {
    beforeAll(function () {
        var cssPath = path.join(__dirname, 'css', "/without-bom.css");
        this.cssString = getContent(cssPath);
        this.cssPath = cssPath;
        this.messages = csshint(this.cssString, cssPath,options);
    });

    it('messages should be right', function () {
        expect(this.messages.length).toBe(1);
    });

    it('messages text should be right', function () {
        expect(this.messages[0].text).toEqual("File could not have bom");
    })
});