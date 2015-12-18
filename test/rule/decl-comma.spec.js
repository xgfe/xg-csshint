/**
 * [强制] 列表型属性值 书写在单行时，, 后必须跟一个空格。
 */
'use strict';

var csshint=require('../../src/parse');
var utils=require('../../src/utils');
var path=require('path');
var cssPath=path.join(__dirname,'css');

describe('decl-comma',function(){
    it('one space',function(){
        var fileP=path.join(cssPath,'decl-comma.css');
        var content = utils.getContent(fileP);
        var messages = getMessageByPulgin(csshint(content,fileP),'decl-comma');

        expect(messages.length).toBe(1);
        expect(messages[0].type).toEqual('error');
        expect(messages[0].text).toEqual('Single attribute comma must have a space');
    });
});


function getMessageByPulgin(messages,pluginName){
    var ms=[];
    messages.forEach(function(m){
        if(m.plugin==pluginName) ms.push(m);
    })
    return ms;
}