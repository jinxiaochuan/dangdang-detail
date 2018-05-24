var Vue = require('vue');

require('page/common/common.js');

require('./detail.less');

var TPL_DETAIL = require('./tmpls/detail.tpl');

var share = require('lib/self/share.js');

var setupWebViewJavascriptBridge = require('lib/self/setupWebViewJavascriptBridge.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var iSlider = require('islider.js');
require('islider.js/build/islider.animate.min.js')

new Vue({
    el: '#house-detail',

    template: TPL_DETAIL,

    data: function(){
        return {
            list: [
                {
                    content: 'http://s1.im-dangdang.com/online/20180523/5GPtEj5XR5.jpeg'
                },
                {
                    content: 'http://s1.im-dangdang.com/online/20180523/wFRJYWaQpi.jpeg'
                },
                {
                    content: 'http://s1.im-dangdang.com/online/2018/05/23/1527054297809433.png'
                }
            ],
            slideIndex: 0
        }
    },

    methods: {
        init() {

        },

        initiSlider() {
            var self = this;

            var S = new iSlider(document.getElementById('iSlider-wrapper'), this.list, {
                isAutoplay: 1,
                isLooping: 1,
                isOverspread: 1,
                animateTime: 800,
                animateType: 'rotate'
            });

            S.on('slideChanged', function(){
                self.slideIndex = arguments[0]
            });

        },

        initAMap() {
            var map = new AMap.Map("AMap-wrapper", {
                resizeEnable: true,
                center: [116.397428, 39.90923],//地图中心点
                zoom: 13 //地图显示的缩放级别
            });
        }
    },

    mounted: function(){
        this.$nextTick(() => {
            this.init();
            this.initiSlider();
            this.initAMap();
        })
    }
})
