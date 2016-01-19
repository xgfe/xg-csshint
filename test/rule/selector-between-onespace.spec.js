/**
 * [强制] 选择器 与 { 之间必须包含空格。
 */
'use strict';

var csshint=require('../../src/parse');
var utils=require('../../src/utils');
var path=require('path');
var options = {};
 options.config = require('../../src/config');
describe('selector-between-onespace',function(){
    var cssPath=path.join(__dirname,'css');

    it('break not allowed',function(){
        var fileP=path.join(cssPath,'selector-between-break.css');
        var content = utils.getContent(fileP);
        var messages = getMessageByPulgin(csshint(content,fileP,options),'selector-between-onespace');

        expect(messages.length).toBe(1);
        expect(messages[0].text).toEqual('brace after selector need one space before brace');

    })

    it('no error',function(){
        var fileP=path.join(cssPath,'selector-between-onespace.css');
        var content = utils.getContent(fileP);
        var messages = getMessageByPulgin(csshint(content,fileP,options),'selector-between-onespace');

        expect(messages.length).toBe(0);
    });
})

function getMessageByPulgin(messages,pluginName){
    var ms=[];
    messages.forEach(function(m){
        if(m.plugin==pluginName) ms.push(m);
    })
    return ms;
}