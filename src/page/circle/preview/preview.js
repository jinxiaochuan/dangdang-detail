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

var Empty = require('page/components/empty/empty.js');

var TPL_MAP_PRE = {
    '1':TPL_NEWS_PRE,
    '2':TPL_ACTIVITY_PRE,
    "3":TPL_COOPERATE_PRE
}

var CirclePreview = jsmod.util.klass({
    initialize: function(option){
        this.option = option;
        this.$container = $('.container');
        this.getAjax();
    },

    initBridge: function(){
        var self = this;

        /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
        setupWebViewJavascriptBridge(function(bridge){

            bridge.callHandler('baseInfo',self.baseInfo,function(){})

            self.$container.delegate('.tap-avatar','click',function(){

                bridge.callHandler('tapUserImage')

            })

        })

    },

    getAjax: function(){
        var self = this;

        // HREF_ORIGIN = 'http://app.im-dangdang.com/ddweb/v1/article/detail?userId=1000000&articleId=1376874';
        // HREF_ORIGIN = 'http://app.im-dangdang.com/ddweb/v1/article/detail?userId=200180&articleId=1346';
        // HREF_ORIGIN = 'http://app.im-dangdang.com/ddweb/v1/article/detail?userId=200180&articleId=1376777';
        // URL_CIRCLE = 'http://app.im-dangdang.com/ddweb/v1/article/detail';

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
                var $video = $('body').find('video');
                $video.each(function(index, item){
                    if(!item.paused){
                        item.pause();
                    }
                })
            },
            pausecallback: function(){

            },
            endedcallback: function(){

            }
        })
    },

    initEvents: function(){
        this.$container.delegate('.close-icon','click',function(){
            $(this).parents('.preview-fix').remove();
        })
        this.$container.find('.detail-content video').on('play',function(){
            var $audio = $('body').find('audio');
            $audio.each(function(index, item){
                if(!item.paused){
                    item.pause();
                }
            })
        })
    },

    deviceDetect: function () {
        var self = this;

        var u = window.navigator.userAgent;

        window.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;

        window.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    }

})

new CirclePreview();
