require('./empty.less');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var TPL_EMPTY = require('./tmpls/empty.tpl');

var TPL_INVALID = require('./tmpls/invalid.tpl');

var Empty = jsmod.util.klass({
    initialize: function(option){
        this.option = option;
    },
    render: function(){
        var option = this.option, TPL;

        if(option && option.word){
            TPL = TPL_EMPTY;

            if(option.invalid){
                TPL = TPL_INVALID;
            }
            
            var html = swig.render(TPL,{
                locals: {
                    word: option.word
                }
            })

            return html;
        }

        return TPL_EMPTY;
    }
})

module.exports = Empty;
