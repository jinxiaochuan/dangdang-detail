var Vue = require('vue');

require('page/common/common.js');

require('./preheat.less');

var TPL_PREHEAT = require('./tmpls/preheat.tpl');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var trans = require('lib/self/trans.js');

var share = require('lib/self/share.js');

var VideoComponent = require('page/components/video/video.js');

var setupWebViewJavascriptBridge = require('lib/self/setupWebViewJavascriptBridge.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/ttl/activity/detail';

var URL_LOTTO = PATH_ORIGIN + PATH_NAME;

new Vue({
    el: '#lotto-preheat',

    template: TPL_PREHEAT,

    data: function () {
        return {
            activityInfo: null,
            pictureUrl: '',
            cardNum: null,
            code: '',
            hasCard: null,
            baseInfo: null
        }
    },

    components:{
        VideoComponent
    },

    methods: {

        init () {
            var self = this;

            // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/ttl/detail?activityId=28&userId=200256&shareType=11&shareId=28';
            // URL_LOTTO = 'http://dev.im-dangdang.com/ddweb/v1/ttl/activity/detail';

            var data = {};

            data.userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId');
            data.activityId = jsmod.util.url.getParam(HREF_ORIGIN,'activityId');

            $.ajax({
                url: URL_LOTTO,
                dataType: 'jsonp',
                data: data,
                jsonp: 'callback',
                success: function(json){
                    if(json.status == 1){
                        self.activityInfo = json.data.activityInfo;
                        self.pictureUrl = json.data.activityInfo.coverImage.pictureUrl;
                        self.cardNum = json.data.cardNum;
                        self.code = json.data.code;
                        self.hasCard = jsmod.util.url.getParam(HREF_ORIGIN,'hasCard');
                        self.initBridge();
                    }
                }
            })

        },

        initBridge () {

            var self  = this;
            var $imgList = $(this.activityInfo.desc).find('img');
            var imgList = $.map($.makeArray($imgList), function(item){
                return {
                    'url': $(item).attr('src')
                }
            })

            if(this.activityInfo.coverImage && !this.activityInfo.coverImage.videoUrl){
                imgList.unshift({
                    'url': this.pictureUrl
                })
            }

            var baseInfo = {
                "imgList": imgList
            }

            setupWebViewJavascriptBridge(function(bridge){

                if(!window.isIOS){
                    bridge.init(function(message, responseCallback) {

                    });
                }

                bridge.callHandler('baseInfo', baseInfo,function(){})

                $('.container').delegate('img', 'click', function(){
                    var url = $(this).attr('src'), index = -1;
                    var index = imgList.indexOf({'url': $(this).attr('src')});
                    imgList.forEach(function(item, idx){
                        if(item.url == url){
                            index = idx
                            return false
                        }
                    })
                    bridge.callHandler('tapEnlarge', index, function(){})
                })

            })

        }

    },

    mounted: function () {
        this.$nextTick(() => {
            this.init()
        })
    }

})
