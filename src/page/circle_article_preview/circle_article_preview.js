require('page/common/common.js');

require('./circle_article_preview.less');

var jsmod=require('lib/self/jsmod/jsmod_extend.js');

var page_url = window.location.href;

var TPL_COOPERATE=require('./tmpls/cooperate_preview_detail.tpl');

var TPL_ACTIVITY=require('./tmpls/activity_preview_detail.tpl');

var TPL_NEWS=require('./tmpls/news_preview_detail.tpl');

var URL_PREVIEW = 'http://test.im-dangdang.com/ddweb/v1/article/preview';

var TPL_MAP = {
    '1':TPL_NEWS,
    '2':TPL_ACTIVITY,
    "3":TPL_COOPERATE
}

var CircleArticlePreview = jsmod.util.klass({
    initialize:function(option){
        var self = this;
        self.option = option;
        self.$container = $('.container');
        self.getAjax(page_url);
    },

    getAjax:function(url){
        var self = this;

        //url='http://test.im-dangdang.com/ddweb/v1/article/preview?userId=200119&previewId=76';
        var data={};

        data.userId=jsmod.util.url.getParam(url,'userId');
        data.previewId=jsmod.util.url.getParam(url,'previewId');

        $.ajax({
            url:URL_PREVIEW,
            dataType:'jsonp',
            data:data,
            jsonp:'callback',
            success:function(json){
                if(json.data){
                    var tpl = swig.render(TPL_MAP[json.data.articleInfo.articleType],{locals:{data:json.data}});
                    self.$container.html(tpl);
                }
            }
        })
    }
})

new CircleArticlePreview();
