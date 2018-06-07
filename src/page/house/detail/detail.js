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
require('islider.js/build/islider.animate.min.js');

const AMapHost = 'http://restapi.amap.com/v3/staticmap';
const AMapKey = '349d8c7961f2995ff1fd1dca32ddf14e';
const AMapZoom = 14;

var errorComponent = require('page/components/error/error.js');

new Vue({
    el: '#house-detail',

    template: TPL_DETAIL,

    components: {
        Err: errorComponent
    },

    data: function(){
        return {
            house: null,
            list: [],
            slideIndex: 0,
            facilities: MAPPING.H_FACILITY,
            isAdmin: 0,
            userId: 0,
            source: 0,
            msg: '',
            iSlider_is: true,
            MAP_is: true,
            MAP_STATIC: '',
            MAP_ADDRESS: ''
        }
    },

    filters:{
        map: function(value, typeMap){
            switch (typeMap) {
                case 'H_BUILD_TIME':
                    if(value == 1900){
                        return MAPPING['H_BUILD_TIME']
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


            // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/circle/house/detail?houseId=519&userId=200291&shareType=20&shareId=423&shareUserId=200291';
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
                        self.house.communityFacilities = self.house.communityFacilities || [];
                        self.initShare();
                        self.initBridge();
                        self.initiSlider();
                        self.initStaticMap();
                        // self.initAMap();
                        return
                    }
                    self.iSlider_is = false;
                    $('.house-location').remove();
                    self.msg = json.msg;
                }
            })
        },

        initStaticMap () {
            var longitude = this.house.location.longitude;
            var latitude = this.house.location.latitude;

            this.MAP_ADDRESS = this.house.location.name;
            this.MAP_STATIC = AMapHost + '?location='+ longitude +','+ latitude +'&zoom='+ AMapZoom +'&scale=2&key='+ AMapKey;
        },

        initShare () {
            share();
        },

        tapPV () {
            this.bridge && this.bridge.callHandler('tapPV', this.slideIndex.toString(), function(){})
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

        tapAMap () {
            this.bridge && this.bridge.callHandler('tapMap')
        },

        initBridge() {
            var self = this;
            setupWebViewJavascriptBridge(function(bridge){
                self.bridge = bridge;
                self.bridge.callHandler('baseInfo', self.house, function(){})

                if(!window.isIOS){
                    self.bridge.init(function(message, responseCallback) {});
                }

                self.bridge.registerHandler('offLine', function(data, responseCallback) {
                    self.house.status = 2;
                })

                self.bridge.registerHandler('publish', function(data, responseCallback) {
                    self.house.status = 1;
                })

            })
        },

        initiSlider() {
            var self = this;

            this.list = this.house.pvList.map(function(item){
                if(item.videoUrl){
                    return {
                        content: '<div class="slider-item" style="background-image: url('+ item.pictureUrl +'?x-oss-process=image/resize,m_fill,h_280,w_375)"><i class="video-icon"></i><img src="'+ item.pictureUrl +'?x-oss-process=image/resize,m_fill,h_280,w_375"></div>'
                    }
                }
                return {
                    content: '<div class="slider-item" style="background-image: url('+ item.pictureUrl +'?x-oss-process=image/resize,m_fill,h_280,w_375)"><img src="'+ item.pictureUrl +'?x-oss-process=image/resize,m_fill,h_280,w_375"></div>'
                }
            })

            var S = new iSlider(this.$refs.iSlider, this.list, {
                isAutoplay: 1,
                isLooping: 1,
                isOverspread: 1,
                animateTime: 800,
                fixPage: false,
                animateType: 'default'
            });

            S.on('slideChanged', function(){
                self.slideIndex = arguments[0];
            });

        },

        initAMap() {
            var self = this;

            var map = new AMap.Map("AMap", {
                resizeEnable: false,
                center: [this.house.location.longitude, this.house.location.latitude],//地图中心点
                zoom: 13, //地图显示的缩放级别
                zoomEnable: false,
                // dragEnable: false
            });

            var marker = new AMap.Marker({
                position: map.getCenter(),  //标记的地图坐标
                map: map
            });

            map.on('click', function(){
                self.bridge && self.bridge.callHandler('tapMap')
            })

            // 限制地图显示范围
            // map.plugin(["AMap.CitySearch"], function() {
            //     var citysearch = new AMap.CitySearch();
            //     citysearch.getLocalCity();
            //     AMap.event.addListener(citysearch, "complete", function(result) {
            //         var citybounds;
            //         if (result && result.city && result.bounds) {
            //             citybounds = result.bounds;
            //             map.setBounds(citybounds);
            //         }
            //     });
            // });

            map.setLimitBounds(map.getBounds());

        }
    },

    beforeMount: function(){

    },

    mounted: function(){
        this.$nextTick(() => {
            this.init();
        })
    }
})
