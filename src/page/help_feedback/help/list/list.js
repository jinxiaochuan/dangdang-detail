require('page/common/common.js');

require('./list.less');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var TPL_LIST = require('./tmpls/list.tpl');

var HREF_ORIGIN = window.location.href;

// var HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/help/list?userId=200072&channelId=100000&os=11.0&platform=ios&appVersion=1.2.4&ddtoken=5+9XQOpxoFZDDDrC/NyUrQ9+6WbrruAyv+vBUSzvuJdo8WoBH7IdZm9Whj5Do1ZrZMg7ncAOOJqp2EDTmi5YiSQUTVQC2vKtjxuFGtXkycU';

var ddtoken = jsmod.util.url.getParam(HREF_ORIGIN,'ddtoken');
var PARAMS = jsmod.util.url.getParamMap(HREF_ORIGIN);
PARAMS = $.extend(PARAMS,{'ddtoken':encodeURIComponent(ddtoken)})

var PARAMSMAP = [];
$.each(PARAMS,function(key,value){
    PARAMSMAP.push(key + '=' + value)
})
var PARAMSTRING = PARAMSMAP.join('&');

var List = jsmod.util.klass({
    initialize: function(option){
        this.option = option;
        this.$container = $('.container');
        this.render();
    },

    render: function(){
        var self = this;
        $.ajax({
            url: '/ddweb/v1/feedback/help/list?' + PARAMSTRING,
            dataType :'jsonp',
            jsonp:'callback',
            cache:true,
            success:function(data){
                var html = swig.render(TPL_LIST,{
                    locals: {
                        data: data,
                        paramUrl: PARAMSTRING
                    }
                });
                self.$container.html(html);

            }
        });
    }
})

new List();
