var Vue = require('vue');

require('page/common/common.js');

require('./detail.less');

var TPL_DETAIL = require('./tmpls/detail.tpl');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var share = require('lib/self/share.js');

var setupWebViewJavascriptBridge = require('lib/self/setupWebViewJavascriptBridge.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/circle/house/detail';

var URL_HOUSE = PATH_ORIGIN + PATH_NAME;

var errorComponent = require('page/components/error/error.js');

new Vue({
    el: '#work-detail',

    template: TPL_DETAIL,

    components: {
        Err: errorComponent
    },

    data: function(){
        return {
            isViewAll: false, // 查看全部或收起 是否显示
            viewAllStatus: true, // 查看全部 是否显示
            maxLen: 80,
            desc: '1.配合产品、UI，一起构思并设计产品的视觉交互效果；<br>2.充分理解产品，并根据需要，实现用户操作流程、交互效果;<br>3.设计内容包括手机App客户端、PC网站、H5页面及应用后台等设计'
        }
    },

    methods: {
        init () {

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
    },

    mounted: function(){
        this.$nextTick(() => {
            this.init();
        })
    }
})
