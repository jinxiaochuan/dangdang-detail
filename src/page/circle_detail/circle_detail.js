require('page/common/common.js');

require('./circle_detail.less');

var jsmod=require('lib/self/jsmod/jsmod_extend.js');

var TPL_CIRCLE=require('./tmpls/circle_detail_tpl.tpl');

var URL_CIRCLE = 'http://test.im-dangdang.com/ddweb/v1/circle/base';

var page_url=window.location.href;

function circleRender(data){
    var tpl = swig.render(TPL_CIRCLE,{locals:{data:data}});
    $('.container').html(tpl);
}

function getAjaxCircle(url){
    //url='http://test.im-dangdang.com/ddweb/v1/circle/base?userId=200119&circleId=14865973';

    var data= {};

    data.userId=jsmod.util.url.getParam(url,'userId');
    data.circleId=jsmod.util.url.getParam(url,'circleId');

    $.ajax({
        url:URL_CIRCLE,
        data:data,
        dataType:'jsonp',
        jsonp:'callback',
        success:function(json){
            if(json.data){
                circleRender(json.data)
            }
        }
    })
}

getAjaxCircle(page_url);