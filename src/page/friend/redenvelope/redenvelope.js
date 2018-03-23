var Vue = require('vue');

require('page/common/common.js');

require('./redenvelope.less');

var TPL_REDENVELOPE = require('./tmpls/redenvelope.tpl');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var share = require('lib/self/share.js');

var setupWebViewJavascriptBridge = require('lib/self/setupWebViewJavascriptBridge.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/gift/hb/detail';

var URL_FRIEND_HB = PATH_ORIGIN + PATH_NAME;

Vue.filter('amount_convert',function(val){
    return (val/100).toFixed(2)
})

Vue.filter('bg_convert',function(val){
    if(!val) return 'http://s1.im-dangdang.com/20180322/1521700918307235.jpg'
    return (JSON.parse(val)).picture
})

new Vue({
    el: '#lotto-red-envelope',

    template: TPL_REDENVELOPE,

    data: function () {
        return {
            receiveInfo: null,
            receiveBg: '',
            bridge: ''
        }
    },

    methods: {

        init () {
            var self = this;

            // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/friendcode/hb/detail?userId=200254&hbId=2438'
            // URL_FRIEND_HB = 'http://dev.im-dangdang.com/ddweb/v1/gift/hb/detail'

            var data = {}, shareUserId;

            data.userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId');
            data.hbId = jsmod.util.url.getParam(HREF_ORIGIN,'hbId');

            $.ajax({
                url: URL_FRIEND_HB,
                dataType: 'jsonp',
                data: data,
                jsonp: 'callback',
                success: function(json){
                    if(json.status == 1){
                        self.receiveInfo = json.data.receiveInfo;
                        self.receiveBg = json.data.receiveInfo.info.activityInfo.hbBackground && JSON.parse(json.data.receiveInfo.info.activityInfo.hbBackground).picture || 'http://s1.im-dangdang.com/online/20180227/bg_share_star_dream.png'
                        self.initShare();
                        self.initBridge();
                    }
                }
            })

        },

        initShare () {
            share();
        },

        initBridge() {
            var self = this;
            setupWebViewJavascriptBridge(function(bridge){
                self.bridge = bridge;
                self.bridge.callHandler('baseInfo', self.receiveInfo, function(){})
            })
        },

        tapUser () {
            if(!this.bridge) return
            this.bridge.callHandler('tapUser', this.receiveInfo, function(){})
        },

        tapCodeUser () {
            if(!this.bridge) return
            this.bridge.callHandler('tapCodeUser', this.receiveInfo, function(){})
        }
    },

    mounted: function () {
        this.$nextTick(() => {
            this.init()
        })
    }

})
