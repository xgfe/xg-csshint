/**
 *  [强制] 禁止使用 Expression
 */
'use strict';

var csshint = require('../../src/parse');
var utils = require('../../src/utils');
var path = require('path');
var getContent = utils.getContent;

describe("disallow-use-expression", function () {
    beforeAll(function () {
        var cssPath = path.join(__dirname, 'css', "disallow-use-expression\.css");
        this.cssString = getContent(cssPath);
        this.cssPath = cssPath;
        this.messages = csshint(this.cssString, cssPath);
    });

    it('messages should be right', function () {
        expect(this.messages.length).toBe(1);
    });

    it('messages text should be right', function () {
        expect(this.messages[0].text).toEqual('It is prohibited to use expression');
    })
});