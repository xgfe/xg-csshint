/**
 *  [强制] font-family 不区分大小写，但在同一个项目中，同样的 Family Name 大小写必须统一。
 */
'use strict';

var csshint = require('../../src/parse');
var utils = require('../../src/utils');
var path = require('path');
var getContent = utils.getContent;

describe("unifying-font-family-case-sensitive", function () {
    beforeAll(function () {
        var cssPath = path.join(__dirname, 'css', 'unifying-font-family-case-sensitive.css');
        this.cssString = getContent(cssPath);
        this.cssPath = cssPath;
        this.messages = csshint(this.cssString, cssPath);
    });

    it('messages length should be 1',function(){
        expect(this.messages.length).toBe(2);
    });

    it('messages text should right',function(){
       expect(this.messages[0].text).toEqual('`font-family` case insensitive, but in the same project, the same` Family Name` case must be unified. should replace `Arial`');
    });
});