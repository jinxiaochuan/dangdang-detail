var Vue = require('vue');

require('page/common/common.js');

require('./wait.less');

var TPL_WAIT = require('./tmpls/wait.tpl');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var setupWebViewJavascriptBridge = require('lib/self/setupWebViewJavascriptBridge.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/ttl/hb/cardNum';

var URL_LOTTO = PATH_ORIGIN + PATH_NAME;

new Vue({
    el: '#lotto-wait',

    template: TPL_WAIT,

    data: function () {
        return {
            cardNum: 0
        }
    },

    methods: {

        init () {
            var self = this;

            // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/ttl/wait?userId=200119';
            // URL_LOTTO = 'http://dev.im-dangdang.com/ddweb/v1/ttl/hb/cardNum';

            var data = {};

            data.userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId');

            $.ajax({
                url: URL_LOTTO,
                dataType: 'jsonp',
                data: data,
                jsonp: 'callback',
                success: function(json){
                    if(json.status == 1){
                        self.cardNum = json.data.cardNum;
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
