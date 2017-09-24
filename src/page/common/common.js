require('./common.less');

require('lib/third/reset.css');

require('lib/third/flexible.js');

require('lib/self/filter.js');

var COMMON_FIX = require('./tmpls/common_fix.tpl');

var jsmod=require('lib/self/jsmod/jsmod_extend.js');

var url = window.location.href;

var source=jsmod.util.url.getParam(url,'source');

if(source == 1){
    $('.container').after(COMMON_FIX);
}

//针对打开进行操作

var mobileDevice = function(){
    var u = window.navigator.userAgent;
    var isTrident = u.indexOf('Trident') > -1;//IE内核isPresto: u.indexOf('Presto') > -1, //opera内核
    var isWebKit = u.indexOf('AppleWebKit') > -1; //苹果、谷歌内核
    var isGecko = u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1; //火狐内核
    var isMobil = !!u.match(/AppleWebKit.*Mobile.*/); //是否为移动终端
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    var isWeixin = (/MicroMessenger/i).test(u)?true:false;
    var isWeibo = (/WeiBo/i).test(u)?true:false;
    var isQQ = (/QQ/i).test(u)?true:false;

    return {
        isTrident:isTrident,
        isWebKit:isWebKit,
        isGecko:isGecko,
        isMobil:isMobil,
        isAndroid:isAndroid,
        isiOS:isiOS,
        isWei:isWeixin
    }
};

var $app = $('.app-btn');

var ios_html = '<i class="ios-icon"></i>';

var android_html = '<i class="android-icon"></i>';

var html = mobileDevice().isiOS?ios_html:android_html;

jsmod.util.Dialog.setOpacity(0.2);

var dialog = new jsmod.util.Dialog({
    html:html,
    backgroundColor:'none',
    closeToTop:true
});

$app.on('click',function(){
    if(mobileDevice().isWei){
        dialog.show({fade:true});
        return;
    };

    var the_href="http://im-dangdang.com/hxhServer/pages/user/download.html";
    window.location="dangdangsocialcontact://my.com/";//打开某手机上的某个app应用
    setTimeout(function(){
        window.location=the_href;//如果超时就跳转到app下载页
    },5000);
});

$('.mod-dialog-frame').on('click',function(){
    dialog.hide({fade:true});
});

document.body.addEventListener('touchstart', function () {});
