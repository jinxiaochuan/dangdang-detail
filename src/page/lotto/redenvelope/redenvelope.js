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
            record: null
        }
    },

    methods: {

        init () {
            var self = this;

            // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/ttl/hb/detail?winId=1&userId=200119&activityId=19'
            // URL_LOTTO = 'http://dev.im-dangdang.com/ddweb/v1/ttl/hb/detail'

            var data = {};

            data.userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId');
            data.activityId = jsmod.util.url.getParam(HREF_ORIGIN,'activityId');
            data.winId = jsmod.util.url.getParam(HREF_ORIGIN,'winId');

            $.ajax({
                url: URL_LOTTO,
                dataType: 'jsonp',
                data: data,
                jsonp: 'callback',
                success: function(json){
                    if(json.status == 1){
                        console.log(json);
                        self.record = json.data.record;
                        self.initShare();
                    }
                }
            })

        },

        initShare () {
            share();
        }

    },

    mounted: function () {
        this.$nextTick(() => {
            this.init()
        })
    }

})
