require('page/common/common.js');

var jsmod=require('lib/self/jsmod/jsmod_extend.js');

require('./square_detail.less');

var square_header_tpl=require('./tmpls/square_header.tpl');

var share_tpl=require('./tmpls/share_detail.tpl');

var praise_tpl=require('./tmpls/praise_detail.tpl');

var reply_tpl=require('./tmpls/reply_detail.tpl');

var URL_SQUARE = 'http://test.im-dangdang.com/ddweb/v1/square/detail/base';

var URL_SHARE = 'http://test.im-dangdang.com/ddweb/v1/square/detail/share/list';

var URL_PRAISE = 'http://test.im-dangdang.com/ddweb/v1/square/detail/zan/list';

var URL_COMMENT = 'http://test.im-dangdang.com/ddweb/v1/square/detail/comment/list';

var page_url=window.location.href;

function baseInfoRender(data){
    var tpl = swig.render(square_header_tpl,{locals:{data:data}});
    $('.square-header-container').html(tpl);
    jsmod.util.stretchImg($('.single-image')[0],360,360,false,true);
}

function getAjaxBase(url){

    //url='http://test.im-dangdang.com/ddweb/v1/square/detail/base?userId=189568&squareId=488&ddtoken=E7EF5740EA71A056430C3AC2FCDC94AD4D75B10A90D22B3F8C2A5E08E1A4742D038789815B66F374D17FA134BEE9E46FEDF22E5098DA5F29D2B9F4AB111A2975A666C2D43A08BFF44A34BE16A91B88DA';

    var data= {};

    data.userId=jsmod.util.url.getParam(url,'userId');
    data.squareId=jsmod.util.url.getParam(url,'squareId');
    data.ddtoken=jsmod.util.url.getParam(url,'ddtoken');

    $.ajax({
        url:URL_SQUARE,
        type:'GET',
        dataType:'jsonp',
        jsonp:'callback',
        data:data,
        success:function(json){
         if(json.data){
            baseInfoRender(json.data);
         }
        }
    });
}

getAjaxBase(page_url);

function shareInfoRender(data){
    var tpl=swig.render(share_tpl,{locals:{data:data}});
    $('.share-detail-container').html(tpl);
}

function getAjaxShare(url){
    //url='http://test.im-dangdang.com/ddweb/v1/square/detail/base?userId=189568&squareId=488&ddtoken=E7EF5740EA71A056430C3AC2FCDC94AD4D75B10A90D22B3F8C2A5E08E1A4742D038789815B66F374D17FA134BEE9E46FEDF22E5098DA5F29D2B9F4AB111A2975A666C2D43A08BFF44A34BE16A91B88DA';

    var data= {};

    data.userId=jsmod.util.url.getParam(url,'userId');
    data.squareId=jsmod.util.url.getParam(url,'squareId');
    data.ddtoken=jsmod.util.url.getParam(url,'ddtoken');
    $.ajax({
        url:URL_SHARE,
        type:'GET',
        dataType:'jsonp',
        jsonp:'callback',
        data:data,
        success:function(json){
            if(json.data){
                shareInfoRender(json.data);
            }
        }
    });
}

getAjaxShare(page_url);


function praiseInfoRender(data){
    var tpl=swig.render(praise_tpl,{locals:{data:data}});
    $('.praise-detail-container').html(tpl);
}

function getAjaxPraise(url){
    //url='http://test.im-dangdang.com/ddweb/v1/square/detail/base?userId=189568&squareId=488&ddtoken=E7EF5740EA71A056430C3AC2FCDC94AD4D75B10A90D22B3F8C2A5E08E1A4742D038789815B66F374D17FA134BEE9E46FEDF22E5098DA5F29D2B9F4AB111A2975A666C2D43A08BFF44A34BE16A91B88DA';

    var data= {};

    data.userId=jsmod.util.url.getParam(url,'userId');
    data.squareId=jsmod.util.url.getParam(url,'squareId');
    data.ddtoken=jsmod.util.url.getParam(url,'ddtoken');
    $.ajax({
        url:URL_PRAISE,
        type:'GET',
        dataType:'jsonp',
        jsonp:'callback',
        data:data,
        success:function(json){
            if(json.data){
                praiseInfoRender(json.data);
            }
        }
    });
}

getAjaxPraise(page_url);

function commentInfoRender(data){
    var tpl=swig.render(reply_tpl,{locals:{data:data}});
    $('.reply-detail-container').html(tpl);
}

function getAjaxComment(url){
    //url='http://test.im-dangdang.com/ddweb/v1/ddweb/detail/base?userId=189568&squareId=488&ddtoken=E7EF5740EA71A056430C3AC2FCDC94AD4D75B10A90D22B3F8C2A5E08E1A4742D038789815B66F374D17FA134BEE9E46FEDF22E5098DA5F29D2B9F4AB111A2975A666C2D43A08BFF44A34BE16A91B88DA';

    var data= {};

    data.userId=jsmod.util.url.getParam(url,'userId');
    data.squareId=jsmod.util.url.getParam(url,'squareId');
    data.ddtoken=jsmod.util.url.getParam(url,'ddtoken');
    $.ajax({
        url:URL_COMMENT,
        type:'GET',
        dataType:'jsonp',
        jsonp:'callback',
        data:data,
        success:function(json){
            if(json.data){
                commentInfoRender(json.data);
            }
        }
    });
}

getAjaxComment(page_url);


var $squareContainer=$('.container');

$squareContainer.delegate('.slide-down-btn','click',function(){
    $(this).removeClass('slide-down-btn').addClass('slide-up-btn').text('收起').prev().removeClass('content-outline');
});

$squareContainer.delegate('.slide-up-btn','click',function(){
    $(this).removeClass('slide-up-btn').addClass('slide-down-btn').text('全文').prev().addClass('content-outline');
});

