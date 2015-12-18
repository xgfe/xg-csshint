/**
 *  [强制] Media Query 如果有多个逗号分隔的条件时，应将每个条件放在单独一行中。
 */
'use strict';

var csshint = require('../../src/parse');
var utils = require('../../src/utils');
var path = require('path');
var getContent = utils.getContent;

describe("media-query-require-new-line", function () {
    beforeAll(function () {
        var cssPath = path.join(__dirname, 'css', 'media-query-require-new-line.css');
        this.cssString = getContent(cssPath);
        this.cssPath = cssPath;
        this.messages = csshint(this.cssString, cssPath);
    });

    it('messages length should right',function(){
        expect(this.messages.length).toBe(1);
        //console.log(this.messages);
    })

    it('messages text should right',function(){
        expect(this.messages[0].text).toEqual("each query conditions for one line");
    })
});