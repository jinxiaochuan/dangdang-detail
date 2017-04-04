require('page/common/common.js');

require('./activity_preview.less');

var jsmod=require('lib/self/jsmod/jsmod_extend.js');

var page_url=window.location.href;

var TPL_ACTIVITY=require('./tmpls/activity_preview_detail.tpl');

var TPL_NEWS=require('./tmpls/news_preview_detail.tpl');

var URL_PREVIEW = 'http://test.im-dangdang.com/ddweb/v1/article/preview';

function activityRender(data){
    var tpl = swig.render(TPL_ACTIVITY,{locals:{data:data}});
    $('.container').html(tpl);
}

function newsRender(data){
    var tpl = swig.render(TPL_NEWS,{locals:{data:data}});
    $('.container').html(tpl);
}

function getAjaxActivity(url){

    //url='http://test.im-dangdang.com/ddweb/v1/article/preview?userId=200119&previewId=1';
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