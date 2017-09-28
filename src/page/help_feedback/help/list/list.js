require('page/common/common.js');

require('./list.less');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var TPL_LIST = require('./tmpls/list.tpl');

var HREF_ORIGIN = window.location.href;

var userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId');

var ddtoken = jsmod.util.url.getParam(HREF_ORIGIN,'ddtoken');

var List = jsmod.util.klass({
    initialize: function(option){
        this.option = option;
        this.$container = $('.container');
        this.render();
    },

    render: function(){
        var html = swig.render(TPL_LIST,{
            locals: {
                ddtoken: ddtoken,
                userId: userId
            }
        })

        this.$container.html(html);
    }
})

new List();
