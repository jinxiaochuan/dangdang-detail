require('./empty.less');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var TPL_EMPTY = require('./tmpls/empty.tpl');

var Empty = jsmod.util.klass({
    initialize: function(option){
        this.option = option;
    },
    render: function(){
        var option = this.option;
        if(option && option.word){
            var html = swig.render(TPL_EMPTY,{
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
