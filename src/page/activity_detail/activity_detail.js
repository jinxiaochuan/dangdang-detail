require('page/common/common.js');

require('./activity_detail.less');

var jsmod=require('lib/self/jsmod/jsmod_extend.js');

var page_url=window.location.href;

var TPL_ACTIVITY=require('./tmpls/activity_detail_tpl.tpl');

var TPL_NEWS=require('./tmpls/news_detail.tpl');

var URL_ACTIVITY = 'http://test.im-dangdang.com/ddweb/v1/article/detail';

function activityRender(data){
    var tpl = swig.render(TPL_ACTIVITY,{locals:{data:data}});
    $('.container').html(tpl);
}

function newsRender(data){
    var tpl = swig.render(TPL_NEWS,{locals:{data:data}});
    $('.container').html(tpl);
}

function getAjaxActivity(url){

    //url='http://test.im-dangdang.com/ddweb/v1/article/detail?userId=200119&articleId=24';
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
                if(json.data.articleInfo.articleType == 2){
                    activityRender(json.data);
                }else if(json.data.articleInfo.articleType == 1){
                    newsRender(json.data);
                }else{

                }

            }
        }
    })

}
getAjaxActivity(page_url);