require('page/common/common.js');

require('./comment_detail.less');

var jsmod=require('lib/self/jsmod/jsmod_extend.js');

var comment_header_tpl=require('./tmpls/comment_header.tpl');

var share_tpl=require('./tmpls/share_detail.tpl');

var praise_tpl=require('./tmpls/praise_detail.tpl');

var reply_tpl=require('./tmpls/reply_detail.tpl');

var URL_COMMENT = 'http://test.im-dangdang.com/ddweb/v1/newsComment/detail/base';

var URL_SHARE = 'http://test.im-dangdang.com/ddweb/v1/newsComment/detail/share';

var URL_PRAISE = 'http://test.im-dangdang.com/ddweb/v1/newsComment/detail/praise';

var URL_COMMENT_DETAIL = 'http://test.im-dangdang.com/ddweb/v1/newsComment/detail/reply';

var page_url=window.location.href;

function baseInfoRender(data){
    var tpl = swig.render(comment_header_tpl,{locals:{data:data}});
    $('.comment-header-container').html(tpl);
}

function getAjaxBase(url){

    var data= {};

    data.commentId=jsmod.util.url.getParam(url,'commentId');
    data.userId=jsmod.util.url.getParam(url,'userId');
    data.ddtoken=jsmod.util.url.getParam(url,'ddtoken');

    $.ajax({
        url:URL_COMMENT,
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

    var data= {};

    data.commentId=jsmod.util.url.getParam(url,'commentId');
    data.userId=jsmod.util.url.getParam(url,'userId');
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
    var data= {};


    data.commentId=jsmod.util.url.getParam(url,'commentId');
    data.userId=jsmod.util.url.getParam(url,'userId');
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
    var data= {};

    data.commentId=jsmod.util.url.getParam(url,'commentId');
    data.userId=jsmod.util.url.getParam(url,'userId');
    data.ddtoken=jsmod.util.url.getParam(url,'ddtoken');

    $.ajax({
        url:URL_COMMENT_DETAIL,
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

var $commentContainer=$('.container');

$commentContainer.delegate('.slide-down-btn','click',function(){
    $(this).removeClass('slide-down-btn').addClass('slide-up-btn').text('收起').prev().removeClass('content-outline');
});

$commentContainer.delegate('.slide-up-btn','click',function(){
    $(this).removeClass('slide-up-btn').addClass('slide-down-btn').text('全文').prev().addClass('content-outline');
});