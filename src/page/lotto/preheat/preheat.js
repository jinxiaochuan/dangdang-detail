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
            cardNum: null,
            code: '',
            hasCard: null
        }
    },

    components:{
        VideoComponent
    },

    methods: {

        init () {
            var self = this;

            HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/ttl/detail?activityId=19&userId=200119&shareType=11&shareId=19';
            URL_LOTTO = 'http://dev.im-dangdang.com/ddweb/v1/ttl/activity/detail';

            var data = {};

            data.userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId');
            data.activityId = jsmod.util.url.getParam(HREF_ORIGIN,'activityId');

            $.ajax({
                url: URL_LOTTO,
                dataType: 'jsonp',
                data: data,
                jsonp: 'callback',
                success: function(json){
                    console.log(json);
                    if(json.status == 1){
                        self.activityInfo = json.data.activityInfo;
                        self.cardNum = json.data.cardNum;
                        self.code = json.data.code;
                        self.hasCard = jsmod.util.url.getParam(HREF_ORIGIN,'hasCard');
                    }
                }
            })

        }

    },

    mounted: function () {
        this.$nextTick(() => {
            this.init()
        })
    }

})
