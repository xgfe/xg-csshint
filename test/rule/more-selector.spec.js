/**
 * [强制] 当一个 rule 包含多个 selector 时，每个选择器声明必须独占一行。
 */
var csshint = require('../../src/parse');
var options = {};
 options.config = require('../../src/config');
describe('more-selector',function(){
    it('Each selector must be exclusive',function(){
        var cssString=".post,\n.page,\n.comment {\n    line-height: 1.5;\n}";
        var messages = csshint(cssString,null,options);
        expect(messages.length).toBe(0);
    });

    it('A line of have more than one selector',function(){
        var cssString=".post,.page,\n.comment {\n    line-height: 1.5;\n}";
        var messages = csshint(cssString,null,options);
        expect(messages[0].text).toEqual("Each selector must be exclusive");
    });

    it('type error',function(){
        var cssString=".post,.page,.comment {\n    line-height: 1.5;\n}";
        var messages = csshint(cssString,null,options);
        expect(messages.length).toBe(2);
    });
});