/**
 *  [强制] 带私有前缀的属性由长到短排列，按冒号位置对齐，标准属性放在最后。
 */
'use strict';

var csshint = require('../../src/parse');
var utils = require('../../src/utils');
var path = require('path');
var getContent = utils.getContent;
var options = {};
 options.config = require('../../src/config');
describe("vendor-prefixes-sort", function () {
    beforeAll(function () {
        var cssPath = path.join(__dirname, 'css', "vendor-prefixes-sort.css");
        this.cssString = getContent(cssPath);
        this.cssPath = cssPath;
        this.messages = csshint(this.cssString, cssPath,options);
    });

    it('messages should be right', function () {

        expect(this.messages.length).toBe(3);
    });

    it('messages text should be right', function () {
        expect(this.messages[0].text).toEqual("With private prefix attribute from long to short, according to the colon position alignment");
    })
});