/**
 *  [强制] 必须同时给出水平和垂直方向的位置。
 */
'use strict';

var csshint = require('../../src/parse');
var utils = require('../../src/utils');
var path = require('path');
var getContent = utils.getContent;
var options = {};
 options.config = require('../../src/config');
describe("horizontal-vertical-position", function () {
    beforeAll(function () {
        var cssPath = path.join(__dirname, 'css', 'horizontal-vertical-position.css');
        this.cssString = getContent(cssPath);
        this.cssPath = cssPath;
        this.messages = csshint(this.cssString, cssPath,options);
    });

    it('should retrun 1 messages',function(){
        expect(this.messages.length).toBe(1);
    });

    it('should return right messages text',function(){
        expect(this.messages[0].text).toEqual('Must give the horizontal and vertical position');
    });
});