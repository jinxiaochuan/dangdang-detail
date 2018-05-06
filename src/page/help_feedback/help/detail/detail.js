require('page/common/common.js');

require('./detail.less');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var trans = require('lib/self/trans.js');

var TPL_DETAIL = require('./tmpls/detail.tpl');

var HREF_ORIGIN = window.location.href;

var paramUrl = jsmod.util.url.getParamStr(HREF_ORIGIN);

var Detail = jsmod.util.klass({
    initialize: function(option){
        this.option = option;
        this.$container = $('.container');
        this.render();
    },

    initTitle: function(){
        document.title = this.data.helpInfo.title;
    },

    render: function(){
        var self = this;
        $.ajax({
            url:'/ddweb/v1/feedback/help/detail?'+ paramUrl,
            dataType :'jsonp',
            jsonp:'callback',
            success: function(json){

                if(json.status == 1){
                    self.data = json.data;

                    self.data.helpInfo.content = trans(self.data.helpInfo.content);
                    var html = swig.render(TPL_DETAIL,{
                        locals: self.data
                    })

                    self.$container.html(html);
                    self.initTitle();
                    return;
                }

            }
        })
    }
})

new Detail();
