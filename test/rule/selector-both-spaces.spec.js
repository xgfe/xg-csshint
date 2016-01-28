/**
 * [强制] >、+、~ 选择器的两边各保留一个空格。
 */
var csshint = require('../../src/parse');
var options = {};
 options.config = require('../../src/config');
describe('selector-both-spaces',function(){

    it('On both sides of the selector Spaces',function(){
        var cssString="p + p,\np > p,\np ~ p {\n    background: #000;\n}";
        var messages=csshint(cssString,null,options);
        console.log(messages);
        expect(messages.length).toBe(0);
    })

    it('On both sides of the selector only a space',function(){
        var cssString="p +\tp,\np  > p,\np ~ \tp {\n    background: #000;\n}";
        var messages=csshint(cssString,null,options);
        expect(messages.length).toBe(3);
    });

    it('On both sides of the selector must have a space',function(){
        var cssString="p +p,\np> p,\np ~ p {\n    background: #000;\n}";
        var messages=csshint(cssString,null,options);
        expect(messages.length).toBe(2);
    });

    it('error msg',function(){
        var cssString="p +p,\np> p,\np ~ p {\n    background: #000;\n}";
        var messages=csshint(cssString,null,options);
        expect(messages[0].text).toEqual("On both sides of the selector one and only one space");
    })



})