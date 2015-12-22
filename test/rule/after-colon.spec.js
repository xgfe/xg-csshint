/**
 * [强制] 属性名 与之后的 : 之间不允许包含空格
 */

'use strict';

var csshint=require('../../src/parse');
var utils=require('../../src/utils');
var path=require('path');
var cssPath=path.join(__dirname,'css');

describe('after-colon',function(){
    it('one space',function(){
        var fileP=path.join(cssPath,'after-colon-before-prop-not-space.css');
        var content = utils.getContent(fileP);
        var messages = getMessageByPulgin(csshint(content,fileP),'after-colon');

        expect(messages.length).toBe(2);
        expect(messages[0].type).toEqual('error');
        expect(messages[0].text).toEqual('After the colon must have a space');
    });

    it('right line&column',function(){
        var fileP=path.join(cssPath,'after-colon-before-prop-not-space.css');
        var content = utils.getContent(fileP);
        var message = getMessageByPulgin(csshint(content,fileP),'after-colon')[0];

        expect(message.line).toBe(3);
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