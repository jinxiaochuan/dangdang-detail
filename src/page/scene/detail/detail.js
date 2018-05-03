var Vue = require('vue');

require('page/common/common.js');

require('./detail.less');

var TPL_SCENE = require('./tmpls/detail.tpl');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var share = require('lib/self/share.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/circle/scene/detail';

var URL_SCENE = PATH_ORIGIN + PATH_NAME;

var errorComponent = require('page/components/error/error.js');

Vue.filter('json_covert',function(jsonstring, key){
    return JSON.parse(jsonstring)[key]
})

Vue.filter('location_covert',function(jsonstring){
    var location = JSON.parse(jsonstring);
    return location.locationAddress ? location.locationAddress : location.locationName
})

Vue.filter('default',function(val, def){
    return val ? val : def
})

new Vue({
    el: '#scene-sign-in',

    template: TPL_SCENE,

    components: {
        Err: errorComponent
    },

    data: function(){
        return {
            sceneInfo: '',
            signinList: [],
            source: 0,
            msg: ''
        }
    },

    methods: {
        init () {
            var self = this;

            // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/v1/circle/scene/detail?sceneId=25&userId=200291&source=1'
            // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/v1/circle/scene/detail?sceneId=120&userId=200302&source=1'
            // URL_SCENE = 'http://dev.im-dangdang.com/ddweb/v1/circle/scene/detail'

            var data = {};

            data.sceneId = jsmod.util.url.getParam(HREF_ORIGIN, 'sceneId');
            data.userId = jsmod.util.url.getParam(HREF_ORIGIN, 'userId');
            this.source = jsmod.util.url.getParam(HREF_ORIGIN,'source');

            $.ajax({
                url: URL_SCENE,
                dataType: 'jsonp',
                data: data,
                jsonp: 'callback',
                success: function(json){
                    if(json.status == 1){
                        self.sceneInfo = json.data.sceneInfo;
                        self.signinList = json.data.signinList;
                        return;
                    }

                    self.msg = json.msg
                }
            })
        }
    },

    mounted: function(){
        this.$nextTick(() => {
            this.init()
        })
    }

})
