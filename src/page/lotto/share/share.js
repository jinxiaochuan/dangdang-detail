var Vue = require('vue');

require('page/common/common.js');

require('./share.less');

var TPL_SHARE = require('./tmpls/share.tpl');

var share = require('lib/self/share.js');

var setupWebViewJavascriptBridge = require('lib/self/setupWebViewJavascriptBridge.js');

new Vue({
    el: '#lotto-share',

    template: TPL_SHARE,

    data: function () {
        return {
            activityInfo: null,
            pictureUrl: '',
            cardNum: 0,
            code: '',
            hasCard: null,
            baseInfo: null
        }
    },

    methods: {
        init () {
            var self = this;


        }
    },

    mounted: function () {
        this.$nextTick(() => {
            this.init()
        })
    }

})
