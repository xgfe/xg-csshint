/**
 *  [强制] font-weight 属性必须使用数值方式描述。
 */
'use strict';

var csshint = require('../../src/parse');
var utils = require('../../src/utils');
var path = require('path');
var getContent = utils.getContent;

describe("font-weight-number", function () {
    beforeAll(function () {
        var cssPath = path.join(__dirname, 'css', 'font-weight-number.css');
        this.cssString = getContent(cssPath);
        this.cssPath = cssPath;
        this.messages = csshint(this.cssString, cssPath);
    });

    it('messages length should right',function(){
        expect(this.messages.length).toBe(1);
    })

    it('messages text should right',function(){
        expect(this.messages[0].text).toEqual('font-weight attribute must be number')
    })
});