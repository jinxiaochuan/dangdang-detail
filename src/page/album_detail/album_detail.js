require('page/common/common.js');

require('./album_detail.less');

var jsmod=require('lib/self/jsmod/jsmod_extend.js');

var TPL_ALBUM = require('./tmpls/album_detail_tpl.tpl');

var URL_ALBUM = 'http://test.im-dangdang.com/ddweb/v1/album/detail';

var page_url=window.location.href;

function albumRender(data){
    var tpl = swig.render(TPL_ALBUM,{locals:{data:data}});
    $('.container').html(tpl);
}

function getAjaxAlbum(url){
    //url='http://test.im-dangdang.com/ddweb/v1/album/detail?userId=200039&albumId=131';
    var data={};

    data.userId=jsmod.util.url.getParam(url,'userId');
    data.albumId=jsmod.util.url.getParam(url,'albumId');

    $.ajax({
        url:URL_ALBUM,
        data:data,
        dataType:'jsonp',
        jsonp:'callback',
        success:function(json){
            if(json.data){
                albumRender(json.data)
            }
        }
    })
}

getAjaxAlbum(page_url);

var $albumContainer=$('.container');

$albumContainer.delegate('.slide-down-btn','click',function(){
    $(this).removeClass('slide-down-btn').addClass('slide-up-btn').text('收起').prev().removeClass('content-outline');
});

$albumContainer.delegate('.slide-up-btn','click',function(){
    $(this).removeClass('slide-up-btn').addClass('slide-down-btn').text('全文').prev().addClass('content-outline');
});
