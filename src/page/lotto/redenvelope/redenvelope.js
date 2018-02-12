var Vue = require('vue');

require('page/common/common.js');

require('./redenvelope.less');

var TPL_REDENVELOPE = require('./tmpls/redenvelope.tpl');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var share = require('lib/self/share.js');

var setupWebViewJavascriptBridge = require('lib/self/setupWebViewJavascriptBridge.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/ttl/hb/detail';

var URL_LOTTO = PATH_ORIGIN + PATH_NAME;

Vue.filter('amount_convert',function(val){
    return (val/100).toFixed(2)
})

new Vue({
    el: '#lotto-red-envelope',

    template: TPL_REDENVELOPE,

    data: function () {
        return {
            record: null,
            bridge: ''
        }
    },

    methods: {

        init () {
            var self = this;

            // HREF_ORIGIN = 'http://app.im-dangdang.com/ddweb/ttl/hb/detail?winId=1016&userId=1000371&shareType=12&shareId=1016&source=1'
            // URL_LOTTO = 'http://app.im-dangdang.com/ddweb/v1/ttl/hb/detail'

            var data = {}, shareUserId;

            data.userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId');
            data.activityId = jsmod.util.url.getParam(HREF_ORIGIN,'activityId');
            data.winId = jsmod.util.url.getParam(HREF_ORIGIN,'winId');
            shareUserId = jsmod.util.url.getParam(HREF_ORIGIN,'shareUserId');
            shareUserId && (data.shareUserId = shareUserId)

            $.ajax({
                url: URL_LOTTO,
                dataType: 'jsonp',
                data: data,
                jsonp: 'callback',
                success: function(json){
                    if(json.status == 1){
                        self.record = json.data.record;
                        self.initTitle();
                        self.initShare();
                        self.initBridge();
                    }
                }
            })

        },

        initTitle () {
            document.title = this.record.title
        },

        initShare () {
            share();
        },

        initBridge() {
            var self = this;
            setupWebViewJavascriptBridge(function(bridge){
                self.bridge = bridge;
                self.bridge.callHandler('baseInfo', self.record, function(){})
            })
        },

        tapUser () {
            if(!this.bridge) return
            this.bridge.callHandler('tapUser', this.record, function(){})
        },

        tapDetail () {
            if(!this.bridge){
                window.location.href = this.record.openUrl + '&source=1'
                return
            }

            this.bridge.callHandler('tapDetail', this.record, function(){})
        }

    },

    mounted: function () {
        this.$nextTick(() => {
            this.init()
        })
    }

})
