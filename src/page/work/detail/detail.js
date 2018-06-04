import Vue from 'vue';

import vueTips from 'vue-tips'

import VueClipboard from 'vue-clipboard2'

Vue.use(vueTips)

Vue.use(VueClipboard)

Vue.filter('formatTime', function (value) {
    if (!value) return '00:00'
    var min = parseInt(value/60) > 9 ? parseInt(value/60) : '0' + parseInt(value/60);
    var sec = parseInt(value%60) > 9 ? parseInt(value%60) : '0' + parseInt(value%60);
    return min + ':' + sec
})

require('page/common/common.js');

require('./detail.less');

var TPL_DETAIL = require('./tmpls/detail.tpl');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var share = require('lib/self/share.js');

var setupWebViewJavascriptBridge = require('lib/self/setupWebViewJavascriptBridge.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/circle/job/detail';

var URL_WORK = PATH_ORIGIN + PATH_NAME;

var errorComponent = require('page/components/error/error.js');
var longTouch = require('lib/self/vueDir.js');

new Vue({
    el: '#work-detail',

    template: TPL_DETAIL,

    directives: {longTouch},

    components: {
        Err: errorComponent
    },

    data: function(){
        return {
            work: null,
            isAdmin: 0,
            userId: 0,
            source: 0,
            isViewAll: false, // 查看全部或收起 是否显示
            viewAllStatus: true, // 查看全部 是否显示
            maxLen: 100
        }
    },

    methods: {
        init () {
            var self = this;

            // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/circle/work/detail?jobId=568&userId=200073&isAdmin=0';
            // URL_WORK = 'http://dev.im-dangdang.com/ddweb/v1/circle/job/detail';

            this.isAdmin = jsmod.util.url.getParam(HREF_ORIGIN,'isAdmin') || 0;
            this.source = jsmod.util.url.getParam(HREF_ORIGIN,'source') || 0;
            this.userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId') || 0;

            var data = {};

            data.userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId');
            data.jobId = jsmod.util.url.getParam(HREF_ORIGIN,'jobId');
            data.isAdmin = jsmod.util.url.getParam(HREF_ORIGIN,'isAdmin') || 0;

            $.ajax({
                url: URL_WORK,
                dataType: 'jsonp',
                data: data,
                jsonp: 'callback',
                success: function(json){
                    if(json.status == 1){
                        self.work = json.data.detail;
                    }
                }
            })

        },

        handleDesc (text) {
            var len = text.length;
            this.isViewAll = len > this.maxLen;
            if(this.isViewAll && this.viewAllStatus) return text.slice(0, this.maxLen) + '...'
            return text
        },

        togView () {
            this.viewAllStatus = !this.viewAllStatus
        },

        tapPV (index) {
            this.bridge && this.bridge.callHandler('tapPV', index.toString(), function(){})
        },

        tapUser () {
            this.bridge && this.bridge.callHandler('tapUser')
        },

        tapOffLine () {
            this.bridge && this.bridge.callHandler('tapOffLine')
        },

        tapPublish () {
            this.bridge && this.bridge.callHandler('tapPublish')
        },

        tapEdit () {
            this.bridge && this.bridge.callHandler('tapEdit')
        },

        tapDel () {
            this.bridge && this.bridge.callHandler('tapDel')
        },

        handleLongTouch () {
            var v = this;
            this.bridge && this.bridge.callHandler('tapCopy');

            // ios禁止复制操作，导致无法使用以下代码
            // this.$copyText(this.work.email).then(function(e){
            //     v.$tips.show('已复制', {
            //         delay: 1000
            //     });
            // }, function(e){
            //     v.$tips.show('复制失败', {
            //         delay: 1000
            //     });
            // })

        }
    },

    mounted: function(){
        this.$nextTick(() => {
            this.init();
        })
    }
})
