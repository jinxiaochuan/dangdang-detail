var Vue = require('vue');

var moment = require('moment');

require('page/common/common.js');

require('./diary.less');

var TPL_DIARY = require('./tmpls/diary.tpl');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var trans = require('lib/self/trans.js');

var share = require('lib/self/share.js');

var TimeCovert = require('page/components/timeCovert/timeCovert.js');

var setupWebViewJavascriptBridge = require('lib/self/setupWebViewJavascriptBridge.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/cal/diary/info';

var URL_DIARY = PATH_ORIGIN + PATH_NAME;

Vue.filter('time_convert',function(val){
    return TimeCovert(val)
})

Vue.filter('key_covert',function(obj, key){
    return obj[key]
})

Vue.filter('json_covert',function(jsonstring, key){
    return JSON.parse(jsonstring)[key]
})

new Vue({
    el: '#calendar-diary',

    template: TPL_DIARY,

    data: function () {
        return {
            diary: null,
            diaryContent: '',
            isSameYear: false
        }
    },

    methods: {
        init () {
            var self = this;

            // HREF_ORIGIN = 'http://dev.im-dangdang.com/ddweb/v1/cal/diary/info?userId=200119&diaryId=134'
            // URL_DIARY = 'http://dev.im-dangdang.com/ddweb/v1/cal/diary/info'

            var data = {};

            data.userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId');
            data.diaryId = jsmod.util.url.getParam(HREF_ORIGIN,'diaryId');

            $.ajax({
                url: URL_DIARY,
                dataType: 'jsonp',
                data: data,
                jsonp: 'callback',
                success: function(json){
                    if(json.status == 1){
                        self.diary = json.data.diary;
                        self.diaryContent = trans(json.data.diary.content);
                        self.isSameYear = TimeCovert(json.data.diary.diaryTime).isSameYear;
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
