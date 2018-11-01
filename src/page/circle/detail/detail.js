require('page/common/common.js');

require('./detail.less');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var trans = require('lib/self/trans.js');

var AudioHandler = require('lib/self/audioHandler.js');

var share = require('lib/self/share.js');

var setupWebViewJavascriptBridge = require('lib/self/setupWebViewJavascriptBridge.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/article/detail';

var URL_CIRCLE = PATH_ORIGIN + PATH_NAME;

var TPL_NEWS = require('./tmpls/news.tpl');

var TPL_ACTIVITY = require('./tmpls/activity.tpl');

var TPL_COOPERATE = require('./tmpls/cooperate.tpl');

var TPL_LIVE = require('./tmpls/live.tpl');

var Empty = require('page/components/empty/empty.js');

// require('aplayer/dist/APlayer.min.css')
// var APlayer = require('aplayer');

var TPL_MAP = {
    '1': TPL_NEWS,
    '2': TPL_ACTIVITY,
    '3': TPL_COOPERATE,
    '4': TPL_LIVE
}

var CircleDetail = jsmod.util.klass({
    initialize: function(option){
        this.option = option;
        this.$container = $('.container');
        this.getAjax();
    },

    getAjax: function(){
        var self = this;

        // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/circleArticleDetail?articleId=4272&userId=1015782&shareType=17&shareId=3307&shareUserId=179708&isAdminIdentity=0&source=1';
        // URL_CIRCLE = 'http://dev.im-dangdang.com/ddweb/v1/article/detail';

        var data = {}, isAdminIdentity, supportHb, source;

        data.userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId');
        data.articleId = jsmod.util.url.getParam(HREF_ORIGIN,'articleId');
        isAdminIdentity  = jsmod.util.url.getParam(HREF_ORIGIN,'isAdminIdentity') || 0;
        supportHb = jsmod.util.url.getParam(HREF_ORIGIN,'supportHb');
        source = jsmod.util.url.getParam(HREF_ORIGIN,'source');
        if(supportHb){
            data.supportHb = supportHb
        }
        $.ajax({
            url: URL_CIRCLE,
            dataType: 'jsonp',
            data: data,
            jsonp: 'callback',
            success: function(json){
                if(json.status == 1){
                    self.data = json.data;
                    self.initTitle();
                    self.commentCount = json.data.webShowInfo.commentCount;
                    self.render(json.data, isAdminIdentity, supportHb, source);
                    var MonitorRQT = +new Date; //数据请求到服务器数据时间点
                    var MonitorFST = MonitorRQT - MonitorST; //首屏时间（页面出现可见元素内容）
                    console.log('头部资源加载时间: ' + MonitorHT + 'ms');
                    console.log('首屏时间: ' + MonitorFST + 'ms');
                    return;
                }

                var html = new Empty({
                    word: json.msg
                }).render();

                self.$container.html(html);

            },
            error: function(error,errorType,errorMsg){
                var html = new Empty({
                    word: errorMsg,
                }).render();

                self.$container.html(html);
            }

        })


    },

    initTitle: function(){
        document.title = this.data.circleInfo.circleName;
    },

    render: function(data, isAdminIdentity, supportHb, source){

        data.articleInfo.detail = trans(data.articleInfo.detail);
        if((data.articleInfo.articleType == '2') && (data.articleInfo.activityInfo.review)){
            data.articleInfo.activityInfo.review = trans(data.articleInfo.activityInfo.review);
        }
        if((data.articleInfo.articleType == '3') && (data.articleInfo.coopInfo.review)){
            data.articleInfo.coopInfo.review = trans(data.articleInfo.coopInfo.review);
        }
        var html = swig.render(TPL_MAP[data.articleInfo.articleType],{
            locals:{
                data: $.extend(data, {'isAdminIdentity': isAdminIdentity, 'supportHb': supportHb, 'source': source})
            }
        });

        this.$container.html(html);

        this.$container.find('.detail-content').delegate('a','click',function(e){
            (e.target.nodeName === 'IMG') && e.stopPropagation()
        })

        // console.log($('.circle-news-source').offset().top);

        this.initEnlarge();

        this.initShare();

        this.initBridge();

        this.initAudioHandler();

        this.initEvents();

    },

    initEvents: function(){
        var self = this;
        var source = jsmod.util.url.getParam(HREF_ORIGIN,'source');
        var userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId');
        this.$container.delegate('.vote-action', ' click', function(){
            if(source == 1){
                window.location.href = '/ddweb/vote/detail?userId='+ userId +'&voteId='+ self.data.voteInfo.voteId +'&source=1'
            }
        })
    },

    allAudioPause: function(){
        var $audio = $('audio');
        $audio.each(function(index, item){
            if(!item.paused){
                item.pause();
            }
        })
        // Object.keys(self.audioAP).forEach(function(key){
        //     self.audioAP[key].pause();
        // })
    },

    allVideoPause: function(){
        var $video = $('video');
        $video.each(function(index, item){
            if(!item.paused){
                item.pause();
            }
        })
    },

    initAudioHandler: function(){
        var self = this;
        new AudioHandler({
            playcallback: function(){
                self.bridge.callHandler('beginAudio');
                self.allVideoPause();
            },
            pausecallback: function(){
                self.bridge.callHandler('pauseAudio');
            },
            endedcallback: function(){
                self.bridge.callHandler('completeAudio')
            }
        });
    },

    initAudio: function(){
        var self = this;
        this.audioAP = {};
        var $audio = $('audio');
        if(!$audio.length) return

        $audio.each(function(index, item){
            var url = item.src;

            self.audioAP['ap_' + index] = new APlayer({
                container: item.parentNode,
                fixed: false,
                loop: 'none',
                audio: {
                    name: '音频',
                    artist: '',
                    cover: 'http://s1.im-dangdang.com/online/20180507/audio_icon.png',
                    url: url
                }
            })

            self.audioAP['ap_' + index].on('play', function() {
                var $video = $('video');
                $video.each(function(index, item){
                    if(!item.paused){
                        item.pause();
                    }
                })
                self.bridge.callHandler('beginAudio');
            })

            self.audioAP['ap_' + index].on('pause', function() {
                self.bridge.callHandler('pauseAudio');
            })

            self.audioAP['ap_' + index].on('ended', function() {
                self.bridge.callHandler('completeAudio')
            })

        })

    },

    initShare: function(){
        share();
    },

    initEnlarge: function(){
        var self = this;

        this.$imgList = this.$container.find('.common-detail-wrap .detail-content img,.circle-news-detail .detail-content img');
        var imgList = $.map($.makeArray(self.$imgList), function(item){
            return {
                'url': $(item).attr('src')
            }
        })

        this.$reviewImgList = this.$container.find('.common-review-wrap .review-content img');
        var reviewImgList = $.map($.makeArray(self.$reviewImgList), function(item){
            return {
                'url': $(item).attr('src')
            }
        })

        imgList = imgList.concat(reviewImgList);

        this.baseInfo = {
            "userId": this.data.webShowInfo.userId,
            "adminId" : this.data.circleInfo.userId,
            "adminName" : this.data.circleInfo.userName,
            "adminPictureUrl" : this.data.circleInfo.userImage && this.data.circleInfo.userImage.pictureUrl,
            "targetId": this.data.articleInfo.articleId,
            "articleId": this.data.articleInfo.articleId,
            "type": this.data.articleInfo.articleType,
            "circleId": this.data.circleInfo.circleId,
            "circleName": this.data.circleInfo.circleName,
            "pictureUrl": this.data.circleInfo.circleLogo.pictureUrl,
            "memberType": this.data.circleInfo.memberType,
            "showAccess": this.data.articleInfo.showAccess,
            "closeComment": this.data.articleInfo.closeComment,
            "isCanComment": this.data.articleInfo.isCanComment,
            "activityIsCanSignUp": this.data.articleInfo.activityInfo ? this.data.articleInfo.activityInfo.isCanSignUp : null,
            "coopIsCanSignUp": this.data.articleInfo.coopInfo ? this.data.articleInfo.coopInfo.isCanSignUp : null,
            "location": this.data.articleInfo.location,
            "latitude": this.data.articleInfo.latitude,
            "longitude": this.data.articleInfo.longitude,
            "articleTitle": this.data.articleInfo.articleTitle,
            "auditType": this.data.articleInfo.activityInfo ? this.data.articleInfo.activityInfo.auditType : null,
            "needCharge": this.data.articleInfo.activityInfo ? this.data.articleInfo.activityInfo.needCharge : null,
            "chargeName": this.data.articleInfo.activityInfo ? this.data.articleInfo.activityInfo.chargeName : null,
            "chargeAmount": this.data.articleInfo.activityInfo ? this.data.articleInfo.activityInfo.chargeAmount : null,
            "chargeDesc": this.data.articleInfo.activityInfo ? this.data.articleInfo.activityInfo.chargeDesc : null,
            "needInfo": this.data.articleInfo.activityInfo ? this.data.articleInfo.activityInfo.needInfo : null,
            "signupRules": this.data.articleInfo.activityInfo ? this.data.articleInfo.activityInfo.signupRules : null,
            "imgList": imgList,
            "hbInfo": this.data.articleInfo.hbInfo,
            "liveInfo": this.data.articleInfo.liveInfo,
            "voteInfo": this.data.voteInfo
        }

        this.logoInfo = {
            "imgUrl": this.data.circleInfo.circleLogo
        }
    },

    initBridge: function(){
        var self = this;

        setupWebViewJavascriptBridge(function(bridge){

            if(!bridge) return

            self.bridge = bridge;

            bridge.callHandler('baseInfo', self.baseInfo, function() {})

            if(!window.isIOS){
                bridge.init(function(message, responseCallback) {});
            }

            bridge.registerHandler('increaseCommment', function(data, responseCallback) {
                self.$container.find('.comment-num').text(++self.commentCount);
            })

            bridge.registerHandler('doChangeStatus', function(data, responseCallback) {
                self.$container.find('.sign-btn').removeClass('sign-btn').addClass('communicate-btn').html('<i class="leavemsg-icon"></i><span>留言</span>');
            })

            bridge.registerHandler('redEnvelopeStatus', function(data, responseCallback) {
                window.location.reload()
            })

            bridge.registerHandler('videoPause', function(data, responseCallback){
                self.allVideoPause()
            })

            bridge.registerHandler('audioPause', function(data, responseCallback){
                self.allAudioPause();
            })

            bridge.registerHandler('liveStatusChange', function(data, responseCallback){
                switch (data) {
                    case '1':

                        break;
                    case '2':
                        $('.live-cellphone-wrap').removeClass('init finish').addClass('suspend')
                        break;
                    case '3':
                        $('.live-cellphone-wrap').removeClass('init suspend').addClass('finish')
                        break;
                    default:

                }
            })

            self.$container.delegate('.tap-avatar','click',function(){
                bridge.callHandler('tapUserImage',self.logoInfo,function(){})
            })

            self.$container.delegate('.tap-sign','click',function(){
                bridge.callHandler('tapAppliedUserList')
            })

            self.$container.delegate('.tap-donate','click',function(){
                bridge.callHandler('tapDonateList')
            })

            self.$container.delegate('.donate-btn','click',function(){
                bridge.callHandler('donate')
            })

            self.$container.delegate('.sign-btn','click',function(){
                bridge.callHandler('apply')
            })

            self.$container.delegate('.edit-btn','click',function(){
                bridge.callHandler('edit')
            })

            self.$container.delegate('.communicate-btn','click',function(){
                bridge.callHandler('doChat')
            })

            self.$container.delegate('.show-access','click',function(){
                bridge.callHandler('tapShowAccess')
            })

            self.$container.delegate('.comment-wrap','click',function(){
                bridge.callHandler('doComment')
            })

            self.$container.delegate('.tap-location','click',function(){
                bridge.callHandler('tapPlace')
            })

            self.$container.delegate('.common-detail-wrap .detail-content img,.circle-news-detail .detail-content img', 'click', function(){
                var index = $.makeArray(self.$imgList).indexOf($(this).get(0));
                bridge.callHandler('tapEnlarge', index, function(){})
            })

            self.$container.delegate('.common-review-wrap .review-content img', 'click', function(){
                var index = $.makeArray(self.$reviewImgList).indexOf($(this).get(0)) + self.$imgList.length;
                bridge.callHandler('tapEnlarge', index, function(){})
            })

            self.$container.find('video').on('play',function(e){
                bridge.callHandler('beginVideo');
                self.allAudioPause();
            })

            self.$container.find('video').on('pause',function(e){
                bridge.callHandler('pauseVideo')
            })

            self.$container.find('video').on('ended',function(e){
                bridge.callHandler('completeVideo')
            })

            self.$container.find('audio').on('play',function(e){
                bridge.callHandler('beginAudio');
                self.allVideoPause();
            })

            self.$container.find('audio').on('pause',function(e){
                bridge.callHandler('pauseAudio')
            })

            self.$container.find('audio').on('ended',function(e){
                bridge.callHandler('completeAudio')
            })

            self.$container.delegate('.circle-red-envelope', 'click', function(){
                bridge.callHandler('redEnvelope')
            })

            self.$container.delegate('.live-btn', 'click', function(){
                bridge.callHandler('liveEnter')
            })

            self.$container.delegate('.continue-live-btn', 'click', function(){
                bridge.callHandler('liveContinue')
            })

            self.$container.delegate('.circle-live-wrapper', 'click', function(){
                bridge.callHandler('goLive')
            })

            self.$container.delegate('.live-agree', ' click', function(){
                bridge.callHandler('liveAgree')
            })

            self.$container.delegate('.vote-action', ' click', function(){
                bridge.callHandler('vote')
            })

        })

    }

})

new CircleDetail();
