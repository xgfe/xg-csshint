/**
 * 测试规则 空格
 * [强制] 使用 4 个空格做为一个缩进层级，不允许使用 2 个空格 或 tab 字符。
 */

var csshint=require('../../src/parse');
var utils=require('../../src/utils');
var path=require('path');

describe('text-indent',function(){
    var cssPath=path.join(__dirname,'css');

    it('ignore end-of-line',function(){
        var fileP=path.join(cssPath,'text-indent.css');
        var content = utils.getContent(fileP);
        var messages = getMessageByPulgin(csshint(content,fileP),'text-indent');

        expect(messages.length).toEqual(2);
    });

    it('type is error',function(){
        var fileP=path.join(cssPath,'text-indent.css');
        var content = utils.getContent(fileP);
        var messages = getMessageByPulgin(csshint(content,fileP),'text-indent');

        expect(messages[0].type).toEqual('error');
    });

    it('error message',function(){
        var fileP=path.join(cssPath,'text-indent.css');
        var content = utils.getContent(fileP);
        var messages = getMessageByPulgin(csshint(content,fileP),'text-indent');

        expect(messages[0].text).toEqual('text-indent must be 4 space');
    });

    it('tab not allowed',function(){
        var fileP=path.join(cssPath,'text-indent-tab.css');
        var content = utils.getContent(fileP);
        var messages = getMessageByPulgin(csshint(content,fileP),'text-indent');

        expect(messages.length).toBe(2);
    })

    it('atRule indent',function(){
        var fileP=path.join(cssPath,'text-indent2.css');
        var content = utils.getContent(fileP);
        var messages = csshint(content,fileP);

        expect(messages.length).toBe(3)
    })
});

function getMessageByPulgin(messages,pluginName){
    var ms=[];
    messages.forEach(function(m){
        if(m.plugin==pluginName) ms.push(m);
    })
    return ms;
}