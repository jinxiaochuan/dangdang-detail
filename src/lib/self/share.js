var jsmod = require('lib/self/jsmod/jsmod_extend.js');

function share () {

    var HREF_ORIGIN_ = window.location.href;
    console.log(HREF_ORIGIN_);
    HREF_ORIGIN_ = jsmod.util.url.deleParam(HREF_ORIGIN_, 'ddrelay');
    console.log(HREF_ORIGIN_);

    var PATH_ORIGIN = window.location.origin;

    var WEIXIN_HREF = '/ddweb/weixin';

    var userId = jsmod.util.url.getParam(HREF_ORIGIN_, 'userId');
    var shareType = jsmod.util.url.getParam(HREF_ORIGIN_, 'shareType');
    var shareId = jsmod.util.url.getParam(HREF_ORIGIN_, 'shareId');

    $.ajax({
        url: PATH_ORIGIN + WEIXIN_HREF,
        dataType: 'jsonp',
        jsonp: 'callback',
        data:{
            url: HREF_ORIGIN_,
            shareType: shareType,
            shareId: shareId,
            userId: userId
        },
        success: function (json) {
            if(json.status == 1){
                shareWxConfig(json.data, HREF_ORIGIN_);
            }
        }
    })
}

function shareWxConfig (configParam, shareLink) {
    window.wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx394248922854ae74', // 必填，公众号的唯一标识
        timestamp: configParam.timestamp, // 必填，生成签名的时间戳
        nonceStr: configParam.nonceStr, // 必填，生成签名的随机串
        signature: configParam.signature,// 必填，签名，见附录1
        jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })

    window.wx.error(function(res){
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        console.log('---------wx.error-----------');
        console.log(res);
    });

    console.log(configParam.shareInfo);
    console.log('------------outer-----------');

    window.wx.ready(function (){
        console.log(configParam.shareInfo);
        console.log('------------inner-----------');
        //分享到朋友圈
        window.wx.onMenuShareTimeline({
            title: configParam.shareInfo.shareTitle || '', // 分享标题
            desc: configParam.shareInfo.shareDetail || '', // 分享描述
            link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: configParam.shareInfo.outImageUrl || '', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        //分享给朋友
        window.wx.onMenuShareAppMessage({
            title: configParam.shareInfo.shareTitle || '', // 分享标题
            desc: configParam.shareInfo.shareDetail || '', // 分享描述
            link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: configParam.shareInfo.outImageUrl || '', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        //分享到QQ
        window.wx.onMenuShareQQ({
            title: configParam.shareInfo.shareTitle || '', // 分享标题
            desc: configParam.shareInfo.shareDetail || '', // 分享描述
            link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: configParam.shareInfo.outImageUrl || '', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            success: function () {
               // 用户确认分享后执行的回调函数
            },
            cancel: function () {
               // 用户取消分享后执行的回调函数
            }
        });
        //分享到腾讯微博
        window.wx.onMenuShareWeibo({
            title: configParam.shareInfo.shareTitle || '', // 分享标题
            desc: configParam.shareInfo.shareDetail || '', // 分享描述
            link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: configParam.shareInfo.outImageUrl || '', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            success: function () {
               // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        //分享到QQ空间
        window.wx.onMenuShareQZone({
            title: configParam.shareInfo.shareTitle || '', // 分享标题
            desc: configParam.shareInfo.shareDetail || '', // 分享描述
            link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: configParam.shareInfo.outImageUrl || '', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            success: function () {
               // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

    })

}

module.exports = share;
