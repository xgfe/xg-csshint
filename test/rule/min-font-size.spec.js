/**
 *  [强制] PC端Web页面，其字号应不小于 12px
 */
'use strict';

var csshint = require('../../src/parse');
var utils = require('../../src/utils');
var path = require('path');
var getContent = utils.getContent;
var options = {};
 options.config = require('../../src/config');
describe("min-font-size", function () {
    beforeAll(function () {
        var cssPath = path.join(__dirname, 'css', 'min-font-size.css');
        this.cssString = getContent(cssPath);
        this.cssPath = cssPath;
        this.messages = csshint(this.cssString, cssPath,options);
    });

    it('messages should be 1',function(){
        expect(this.messages.length).toBe(1);
    })
    it('messages text should be right',function(){
        expect(this.messages[0].text).toEqual('font-size is not less than 12px')
    })
});