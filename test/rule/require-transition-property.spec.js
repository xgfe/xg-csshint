/**
 *  [强制] 使用 transition 时应指定 transition-property
 */
'use strict';

var csshint = require('../../src/parse');
var utils = require('../../src/utils');
var path = require('path');
var getContent = utils.getContent;

describe("require-transition-property", function () {
    beforeAll(function () {
        var cssPath = path.join(__dirname, 'css', 'require-transition-property.css');
        this.cssString = getContent(cssPath);
        this.cssPath = cssPath;
        this.messages = csshint(this.cssString, cssPath);
    });

    it('messages should be right',function(){
       expect(this.messages.length).toBe(3);
    });

    it('messages text should be right',function(){
        expect(this.messages[0].text).toEqual("Use the transition should be specified the transition-property");
    })
});