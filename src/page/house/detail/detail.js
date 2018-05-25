var Vue = require('vue');

require('page/common/common.js');

require('./detail.less');

var TPL_DETAIL = require('./tmpls/detail.tpl');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var share = require('lib/self/share.js');

var MAPPING = require('lib/self/mapping.js');

var setupWebViewJavascriptBridge = require('lib/self/setupWebViewJavascriptBridge.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/circle/house/detail';

var URL_HOUSE = PATH_ORIGIN + PATH_NAME;

var iSlider = require('islider.js');
require('islider.js/build/islider.animate.min.js')

new Vue({
    el: '#house-detail',

    template: TPL_DETAIL,

    data: function(){
        return {
            house: null,
            list: [],
            slideIndex: 0,
            facilities: MAPPING.H_FACILITY,
            userId: 0,
            source: 0
        }
    },

    filters:{
        map: function(value, typeMap){
            switch (typeMap) {
                case 'H_BUILD_TIME':
                    if(value == 1900){
                        return MAPPING[H_BUILD_TIME]
                    }
                    return value + '年'
                    break;
                default:
                return MAPPING[typeMap][value]
            }

        },

    },

    methods: {

        isExist: function(value){
            for(var i = 0; i < this.house.communityFacilities.length; i++){
                if(this.house.communityFacilities[i] == value)
                return true
            }

            return false
        },

        init() {
            var self = this;


            // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/circle/house/detail?houseId=2&userId=200073&isAdmin=1';
            // URL_HOUSE = 'http://dev.im-dangdang.com/ddweb/v1/circle/house/detail';

            this.isAdmin = jsmod.util.url.getParam(HREF_ORIGIN,'isAdmin') || 0;
            this.source = jsmod.util.url.getParam(HREF_ORIGIN,'source') || 0;
            this.userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId') || 0;

            var data = {};

            data.userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId');
            data.houseId = jsmod.util.url.getParam(HREF_ORIGIN,'houseId');
            data.isAdmin = jsmod.util.url.getParam(HREF_ORIGIN,'isAdmin') || 0;


            $.ajax({
                url: URL_HOUSE,
                dataType: 'jsonp',
                data: data,
                jsonp: 'callback',
                success: function(json){
                    if(json.status == 1){
                        self.house = json.data.detail;
                        self.initShare();
                        self.initBridge();
                        self.initiSlider();
                        self.initAMap();
                    }
                }
            })
        },

        initShare () {
            share();
        },

        tapPV () {
            this.bridge && this.bridge.callHandler('tapPV', this.slideIndex, function(){})
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

        initBridge() {
            var self = this;
            setupWebViewJavascriptBridge(function(bridge){
                self.bridge = bridge;
                self.bridge.callHandler('baseInfo', self.house, function(){})
            })
        },

        initiSlider() {
            var self = this;

            this.list = this.house.pvList.map(function(item){
                return {
                    content: item.pictureUrl
                }
            })

            var S = new iSlider(this.$refs.iSlider, this.list, {
                isAutoplay: 1,
                isLooping: 1,
                isOverspread: 1,
                animateTime: 800,
                animateType: 'rotate',
                fixPage: false
            });

            S.on('slideChanged', function(){
                self.slideIndex = arguments[0]
            });

        },

        initAMap() {
            var self = this;

            var map = new AMap.Map("AMap", {
                resizeEnable: false,
                center: [this.house.location.longitude, this.house.location.latitude],//地图中心点
                zoom: 13 //地图显示的缩放级别
            });

            var marker = new AMap.Marker({
                position: map.getCenter(),  //标记的地图坐标
                map: map
            });

            map.on('click', function(){
                self.bridge && self.bridge.callHandler('tapMap')
            })

        }
    },

    mounted: function(){
        this.$nextTick(() => {
            this.init();
        })
    }
})
