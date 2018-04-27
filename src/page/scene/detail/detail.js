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

Vue.filter('json_covert',function(jsonstring, key){
    return JSON.parse(jsonstring)[key]
})

new Vue({
    el: '#scene-sign-in',

    template: TPL_SCENE,

    data: function(){
        return {
            sceneInfo: '',
            signinList: []
        }
    },

    methods: {
        init () {
            var self = this;

            // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/v1/circle/scene/detail?sceneId=2&userId=200119'
            // URL_SCENE = 'http://dev.im-dangdang.com/ddweb/v1/circle/scene/detail'

            var data = {};

            data.sceneId = jsmod.util.url.getParam(HREF_ORIGIN, 'sceneId');
            data.userId = jsmod.util.url.getParam(HREF_ORIGIN, 'userId');

            $.ajax({
                url: URL_SCENE,
                dataType: 'jsonp',
                data: data,
                jsonp: 'callback',
                success: function(json){
                    if(json.status == 1){
                        console.log(json);
                        self.sceneInfo = json.data.sceneInfo;
                        self.signinList = json.data.signinList;
                    }
                }
            })
            console.log('init');
        }
    },

    mounted: function(){
        this.$nextTick(() => {
            this.init()
        })
    }

})
