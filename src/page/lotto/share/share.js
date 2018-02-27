var Vue = require('vue');

require('page/common/common.js');

require('./share.less');

var TPL_SHARE = require('./tmpls/share.tpl');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var share = require('lib/self/share.js');

var setupWebViewJavascriptBridge = require('lib/self/setupWebViewJavascriptBridge.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/ttl/share/activity/detail';

var URL_LOTTO = PATH_ORIGIN + PATH_NAME;

new Vue({
    el: '#lotto-share',

    template: TPL_SHARE,

    data: function () {
        return {
            data: '',
            userImage: '',
            showName: '',
            shareGreeting: '',
            showNo: '',
            shareCode: '',
            shareStory: '',
            shareTitle: '',
            code: '',
            bridge: '',
            source: null,
            shareBg: ''
        }
    },

    methods: {
        init () {
            var self = this;

            // HREF_ORIGIN = 'http://app.im-dangdang.com/ddweb/ttl/share/activity/detail?hbShareId=36&userId=1000002&shareType=13&shareId=36&shareUserId=1000002&source=1'
            // URL_LOTTO = 'http://app.im-dangdang.com/ddweb/v1/ttl/share/activity/detail'
            // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/ttl/share/activity/detail?hbShareId=225&userId=200119&shareType=13&shareId=225&shareUserId=200119&source=1'
            // URL_LOTTO = 'http://dev.im-dangdang.com/ddweb/v1/ttl/share/activity/detail'

            this.source = jsmod.util.url.getParam(HREF_ORIGIN,'source');

            var data = {};

            data.userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId');
            data.hbShareId = jsmod.util.url.getParam(HREF_ORIGIN,'hbShareId');

            $.ajax({
                url: URL_LOTTO,
                dataType: 'jsonp',
                data: data,
                jsonp: 'callback',
                success: function(json){
                    if(json.status == 1){
                        self.data = json.data;
                        self.userImage = json.data.userInfo.userImage;
                        self.showName = json.data.userInfo.showName;
                        self.shareGreeting = json.data.shareInfo.shareGreeting;
                        self.showNo = json.data.shareInfo.showNo;
                        self.shareCode = json.data.shareInfo.shareCode;
                        self.shareStory = json.data.shareInfo.shareStory;
                        self.shareTitle = json.data.shareInfo.shareTitle;
                        self.code = json.data.codeInfo.code;
                        self.shareBg = json.data.shareInfo.hbBackgroundImage && JSON.parse(json.data.shareInfo.hbBackgroundImage).picture || 'http://s1.im-dangdang.com/online/20180227/bg_share_star_dream.png'
                        self.initTitle();
                        self.initShare();
                        self.initBridge();
                    }
                }
            })

        },

        initTitle () {
            document.title = this.shareTitle;
        },

        initShare () {
            share();
        },

        initBridge () {
            var self = this;
            setupWebViewJavascriptBridge(function(bridge){
                self.bridge = bridge;
                self.bridge.callHandler('baseInfo', self.data, function(){})
            })
        },

        openEnvelope () {
            if(!this.bridge) return
            this.bridge.callHandler('openHB', this.data, function(){})
        },

        tapUser () {
            if(!this.bridge) return
            this.bridge.callHandler('tapUser', this.data, function(){})
        }

    },

    mounted: function () {
        this.$nextTick(() => {
            this.init()
        })
    }

})
