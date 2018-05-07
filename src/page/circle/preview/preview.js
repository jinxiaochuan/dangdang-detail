require('page/common/common.js');

require('./preview.less');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var trans = require('lib/self/trans.js');

var AudioHandler = require('lib/self/audioHandler.js');

var setupWebViewJavascriptBridge = require('lib/self/setupWebViewJavascriptBridge.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/article/detail';

var URL_CIRCLE = PATH_ORIGIN + PATH_NAME;

var TPL_NEWS_PRE = require('./tmpls/news.tpl');

var TPL_ACTIVITY_PRE = require('./tmpls/activity.tpl');

var TPL_COOPERATE_PRE = require('./tmpls/cooperate.tpl');

var TPL_LIVE_PRE = require('./tmpls/live.tpl');

var Empty = require('page/components/empty/empty.js');

require('aplayer/dist/APlayer.min.css')
var APlayer = require('aplayer');

var TPL_MAP_PRE = {
    '1': TPL_NEWS_PRE,
    '2': TPL_ACTIVITY_PRE,
    '3': TPL_COOPERATE_PRE,
    '4': TPL_LIVE_PRE
}

var CirclePreview = jsmod.util.klass({
    initialize: function(option){
        this.option = option;
        this.$container = $('.container');
        this.getAjax();
    },

    initBridge: function(){
        var self = this;

        setupWebViewJavascriptBridge(function(bridge){

            bridge.callHandler('baseInfo',self.baseInfo,function(){})

            self.$container.delegate('.tap-avatar','click',function(){

                bridge.callHandler('tapUserImage')

            })

        })

    },

    getAjax: function(){
        var self = this;

        // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/v1/article/detail?userId=200207&articleId=3931';
        // URL_CIRCLE = 'http://dev.im-dangdang.com/ddweb/v1/article/detail';

        var data = {};

        data.userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId');
        data.articleId = jsmod.util.url.getParam(HREF_ORIGIN,'articleId');

        $.ajax({
            url: URL_CIRCLE,
            dataType: 'jsonp',
            data: data,
            jsonp: 'callback',
            success: function(json){
                if(json.status == 1){
                    self.data = json.data;
                    self.baseInfo = {
                        "userId":json.data.webShowInfo.userId,
                        "targetId":json.data.articleInfo.articleId,
                        "articleId":json.data.articleInfo.articleId,
                        "type":json.data.articleInfo.articleType,
                        "circleId":json.data.circleInfo.circleId,
                        "circleName":json.data.circleInfo.circleName,
                        "memberType":json.data.circleInfo.memberType,
                        "isCanComment":json.data.articleInfo.isCanComment,
                        "pictureUrl":json.data.circleInfo.circleLogo.pictureUrl,
                        "articleTitle":json.data.articleInfo.articleTitle
                    }
                    self.data.articleInfo.detail = trans(self.data.articleInfo.detail);
                    var html = swig.render(TPL_MAP_PRE[json.data.articleInfo.articleType],{locals:{data:self.data}});
                    self.$container.html(html);
                    self.$container.find('.detail-content').delegate('a','click',function(e){
                        e.preventDefault();
                    })
                    self.initBridge();

                    self.initAudioHandler();

                    self.initEvents();
                    return;
                }

                if(json.status == 10865){
                    var html = new Empty({
                        word: json.msg,
                        invalid: 1
                    }).render();
                }else {
                    var html = new Empty({
                        word: json.msg,
                    }).render();
                }

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

    initEvents: function(){
        var self = this;

        this.$container.delegate('.close-icon','click',function(){
            $(this).parents('.preview-fix').remove();
        })

        this.$container.find('video').on('play',function(){
            self.allAudioPause();
        })
    }

})

new CirclePreview();
