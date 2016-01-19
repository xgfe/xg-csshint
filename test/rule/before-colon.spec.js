/**
 * [强制] : 与 属性值 之间必须包含空格。
 */

'use strict';

var csshint=require('../../src/parse');
var utils=require('../../src/utils');
var path=require('path');
var cssPath=path.join(__dirname,'css');
var options = {};
 options.config = require('../../src/config');
describe('before-colon',function(){
    it('not space',function(){
        var fileP=path.join(cssPath,'after-colon-before-prop-not-space.css');
        var content = utils.getContent(fileP);
        var messages = getMessageByPulgin(csshint(content,fileP,options),'before-colon');

        expect(messages.length).toBe(2);
        //expect(messages[0].type).toEqual('error');
        expect(messages[0].text).toEqual('There must be nothing in front of the colon');
    });

    it('right line&column',function(){
        var fileP=path.join(cssPath,'after-colon-before-prop-not-space.css');
        var content = utils.getContent(fileP);
        var message = getMessageByPulgin(csshint(content,fileP,options),'before-colon')[0];
        expect(message.line).toBe(4);
        expect(message.column).toBe(12);
    })
});


function getMessageByPulgin(messages,pluginName){
    var ms=[];
    messages.forEach(function(m){
        if(m.plugin==pluginName) ms.push(m);
    })
    return ms;
}