require('page/common/common.js');

require('./list.less');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var TPL_LIST = require('./tmpls/list.tpl');

//var HREF_ORIGIN = window.location.href;
var HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/v1/feedback/help/list?userId=200119&ddtoken=5%2b9XQOpxoFZDDDrC%2fNyUrcha1Nazbuvz5XitGS8b8D03M764qxAvl5787cW2puKQbbBr06yaviiPsMrIpcICCHGD89SgF75rbXczJX0QzNI%3d&platform=ios';

var userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId');

var ddtoken = jsmod.util.url.getParam(HREF_ORIGIN,'ddtoken');

var paramUrl = jsmod.util.url.getParamStr(HREF_ORIGIN);
var List = jsmod.util.klass({
    initialize: function(option){
        this.option = option;
        this.$container = $('.container');
        this.render();
    },

    render: function(){
        var self = this;
        $.ajax({
            url:HREF_ORIGIN,
            dataType :'jsonp',
            jsonp:'callback',
            success:function(data){
                console.log(data);
                var html = swig.render(TPL_LIST,{
                    //locals:data
                    locals: {
                        data: data,
                        ddtoken: ddtoken,
                        userId: userId,
                        paramUrl:paramUrl
                    }
                });
                self.$container.html(html);
            }
        });
        // var html = swig.render(TPL_LIST,{
        //     locals: {
        //         ddtoken: ddtoken,
        //         userId: userId
        //     }
        // })
    }
})

new List();
