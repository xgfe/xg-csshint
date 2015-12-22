/**
 * [强制] 属性选择器中的值必须用双引号包围。
 */
var csshint = require('../../src/parse');

describe('attribute-selector',function(){

    it('Attribute selectors must be enclosed in double quotation marks',function(){
        var cssString='article[character="juliet"] {\n    voice-family: "Vivien Leigh", victoria, female;\n}';
        var messages=csshint(cssString);

        expect(messages.length).toBe(0);
    });

    it('Single quotes',function(){
        var cssString="article[character='juliet'] {\n    voice-family: \"Vivien Leigh\", victoria, female;\n}";
        var messages=csshint(cssString);
        expect(messages.length).toBe(1);
    });

    it('No quotes',function(){
        var cssString="article[character=juliet] {\n    voice-family: \"Vivien Leigh\", victoria, female;\n}";
        var messages=csshint(cssString);
        expect(messages.length).toBe(1);
    });

    it('No quotes,more',function(){
        var cssString="article[character=juliet],\narticle[name=juliet] {\n    voice-family: \"Vivien Leigh\", victoria, female;\n}";
        var messages=csshint(cssString);
        expect(messages.length).toBe(2);
    })

    it('error msg',function(){
        var cssString="article[character=juliet] {\n    voice-family: \"Vivien Leigh\", victoria, female;\n}";
        var messages=csshint(cssString);
        expect(messages[0].text).toEqual('Attribute selectors of values must be enclosed in double quotation marks');
    });

    it('error type',function(){
        var cssString="article[character=juliet] {\n    voice-family: \"Vivien Leigh\", victoria, female;\n}";
        var messages=csshint(cssString);
        expect(messages[0].type).toEqual('error');
    })

    it('right line&column',function(){
        var cssString=" article[character=juliet] {\n    voice-family: \"Vivien Leigh\", victoria, female;\n}";
        var messages=csshint(cssString);
        expect(messages[0].line).toBe(1);
        expect(messages[0].column).toBe(20);
    })
});