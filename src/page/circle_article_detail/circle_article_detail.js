require('page/common/common.js');

require('./circle_article_detail.less');

var jsmod=require('lib/self/jsmod/jsmod_extend.js');

var page_url=window.location.href;

var TPL_COOPERATE=require('./tmpls/cooperate_detail_tpl.tpl');

var TPL_ACTIVITY=require('./tmpls/activity_detail_tpl.tpl');

var TPL_NEWS=require('./tmpls/news_detail.tpl');

var URL_ACTIVITY = 'http://test.im-dangdang.com/ddweb/v1/article/detail';

var TPL_MAP = {
    '1':TPL_NEWS,
    '2':TPL_ACTIVITY,
    "3":TPL_COOPERATE
}

var CircleArticleDetail = jsmod.util.klass({
    initialize:function(option){
        var self = this;
        self.option = option;
        self.$container = $('.container')
        self.getAjax(page_url);
    },

    getAjax:function(page_url){
        var self = this;

        url='http://test.im-dangdang.com/ddweb/v1/article/detail?userId=200119&articleId=916';
        var data={};

        data.userId=jsmod.util.url.getParam(url,'userId');
        data.articleId=jsmod.util.url.getParam(url,'articleId');

        $.ajax({
            url:URL_ACTIVITY,
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

new CircleArticleDetail();
