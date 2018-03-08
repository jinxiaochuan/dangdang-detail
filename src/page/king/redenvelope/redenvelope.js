var Vue = require('vue');

require('page/common/common.js');

require('./redenvelope.less');

var TPL_REDENVELOPE = require('./tmpls/redenvelope.tpl');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var share = require('lib/self/share.js');

var setupWebViewJavascriptBridge = require('lib/self/setupWebViewJavascriptBridge.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/ttl/hb/king';

var URL_KING = PATH_ORIGIN + PATH_NAME;

Vue.filter('amount_convert',function(val){
    return (val/100).toFixed(2)
})

new Vue({
    el: '#king-red-envelope',

    template: TPL_REDENVELOPE,

    data: function () {
        return {
            record: null,
            recordBg: '',
            bridge: ''
        }
    },

    methods: {
        init () {
            var self = this;

            // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/v1/ttl/hb/king?winId=1&userId=200098&shareType=12&shareId=10274&shareUserId=200098&source=1'
            // URL_KING = 'http://dev.im-dangdang.com/ddweb/v1/ttl/hb/king'

            var data = {}, shareUserId;

            data.userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId');
            data.winId = jsmod.util.url.getParam(HREF_ORIGIN,'winId');
            shareUserId = jsmod.util.url.getParam(HREF_ORIGIN,'shareUserId');
            shareUserId && (data.shareUserId = shareUserId)

            $.ajax({
                url: URL_KING,
                dataType: 'jsonp',
                data: data,
                jsonp: 'callback',
                success: function(json){
                    if(json.status == 1){
                        self.record = json.data;
                        self.recordBg = json.data.hbBackgroundImage && JSON.parse(json.data.hbBackgroundImage).picture || 'http://s1.im-dangdang.com/online/20180227/bg_share_star_dream.png'
                        self.initShare();
                        self.initBridge();
                    }
                }
            })

        },

        initShare () {
            share();
        },

        initBridge () {
            var self = this;
            setupWebViewJavascriptBridge(function(bridge){
                self.bridge = bridge;
                self.bridge.callHandler('baseInfo', self.record, function(){})
            })
        },

        tapUser () {
            if(!this.bridge) return
            this.bridge.callHandler('tapUser', this.record, function(){})
        }

    },

    mounted: function () {
        this.$nextTick(() => {
            this.init()
        })
    }

})
