var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var WEIXIN_HREF = '/ddweb/weixin';

function share (param) {
    
    $.ajax({
        url: PATH_ORIGIN + WEIXIN_HREF,
        dataType: 'jsonp',
        data:{
            url: HREF_ORIGIN
        },
        success: function (json) {
            if(json.status == 1){
                shareWxConfig(json.data, param);
            }
        }
    })
}

function shareWxConfig (configParam, param) {
    window.wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx49e8f98deed815c1', // 必填，公众号的唯一标识
        timestamp: configParam.timestamp, // 必填，生成签名的时间戳
        nonceStr: configParam.nonceStr, // 必填，生成签名的随机串
        signature: configParam.signature,// 必填，签名，见附录1
        jsApiList: [
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })

    window.wx.ready(function (){
        window.wx.onMenuShareAppMessage({
            title: param && param.title || '', // 分享标题
            desc: param && param.desc || '', // 分享描述
            link: param && param.link || HREF_ORIGIN, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: param && param.imgUrl || '', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        })
    })

}

module.exports = share;
