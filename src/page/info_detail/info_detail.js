require('page/common/common.js');

require('./info_detail.less');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var page_url = window.location.href;

var TPL_INFO = require('./tmpls/info_detail_tpl.tpl');

var URL_INFO = 'http://test.im-dangdang.com/comment/v1/news/detail';

var infoDetail = jsmod.util.klass({
    initialize:function(option){
        var self = this;
        self.option = option;
        self.$container = $('.container');
        self.getAjaxInfo(page_url);

    },

    getAjaxInfo:function(url){
        var self = this;

        //url = 'http://test.im-dangdang.com/comment/v1/news/detail?userId=200119&newsId=1';

        var data = {};

        data.userId = jsmod.util.url.getParam(url,'userId');
        data.newsId = jsmod.util.url.getParam(url,'newsId');

        $.ajax({
            url:URL_INFO,
            dataType:'json',
            data:data,
            jsonp:'callback',
            success:function(json){
                if(json.data){
                    console.log(json.data);
                    self.data = json.data;
                    self.infoRender(self.data);
                }
            }

        })
    },

    infoRender:function(data){
        var self = this;

        var tpl = swig.render(TPL_INFO, {
            locals: {
                data: data
            }
        });

        self.$container.html(tpl);

    }
})

new infoDetail();
