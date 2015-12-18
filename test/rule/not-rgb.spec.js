/**
 *  [强制] RGB颜色值必须使用十六进制记号形式 #rrggbb。不允许使用 rgb()。
 */
'use strict';

var csshint = require('../../src/parse');
var utils=require('../../src/utils');
var path=require('path');
var getContent = utils.getContent;

describe("hex-color", function () {
    beforeAll(function(){
        var cssPath=path.join(__dirname,'css','hex-color.css');
        this.cssString=getContent(cssPath);
        this.cssPath=cssPath;
        this.messages=csshint(this.cssString,cssPath);
    });

    it("message's length should 1",function(){
        expect(this.messages.length).toBe(1);
    });

    it("error text",function(){
        expect(this.messages[0].text).toEqual("Color values must use hex,such as `#eee`");
    });

    it('error type',function(){
        expect(this.messages[0].type).toEqual("error");
    })

});