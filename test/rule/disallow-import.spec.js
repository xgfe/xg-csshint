/**
 *  [强制] 不要使用 @import
 */
'use strict';

var csshint = require('../../src/parse');
var utils = require('../../src/utils');
var path = require('path');
var getContent = utils.getContent;

describe("disallow-import", function () {
    beforeAll(function () {
        var cssPath = path.join(__dirname, 'css', "disallow-import\.css");
        this.cssString = getContent(cssPath);
        this.cssPath = cssPath;
        this.messages = csshint(this.cssString, cssPath);
    });

    it('messages should be right', function () {
        expect(this.messages.length).toBe(1);
    });

    it('messages text should be right', function () {
        expect(this.messages[0].text).toEqual("Do not use the import");
    })
});