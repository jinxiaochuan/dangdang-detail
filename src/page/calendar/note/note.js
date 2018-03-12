var Vue = require('vue');

require('page/common/common.js');

require('./note.less');

var TPL_NOTE = require('./tmpls/note.tpl');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var trans = require('lib/self/trans.js');

var share = require('lib/self/share.js');

var TimeCovert = require('page/components/timeCovert/timeCovert.js');

var setupWebViewJavascriptBridge = require('lib/self/setupWebViewJavascriptBridge.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

var PATH_NAME = '/ddweb/v1/cal/note/info';

var URL_NOTE = PATH_ORIGIN + PATH_NAME;

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
    el: '#calendar-note',

    template: TPL_NOTE,

    data: function () {
        return {
            noteInfo: null,
            noteContent: '',
            isSameYear: false,
            errorMsg: ''
        }
    },

    methods: {
        init () {
            var self = this;

            // HREF_ORIGIN = 'http://app.im-dangdang.com/ddweb/note?noteId=554&userId=1000079&shareType=16&shareId=554&shareUserId=1000079&source=1';
            // URL_NOTE = 'http://app.im-dangdang.com/ddweb/v1/cal/note/info'

            var data = {};

            data.userId = jsmod.util.url.getParam(HREF_ORIGIN,'userId');
            data.noteId = jsmod.util.url.getParam(HREF_ORIGIN,'noteId');

            $.ajax({
                url: URL_NOTE,
                dataType: 'jsonp',
                data: data,
                jsonp: 'callback',
                success: function(json){
                    if(json.status == 1){
                        self.noteInfo = json.data.noteInfo;
                        self.noteContent = trans(json.data.noteInfo.content);
                        self.isSameYear = TimeCovert(json.data.noteInfo.createTime).isSameYear;
                        self.initShare();
                        return;
                    }
                    self.errorMsg = json.msg;
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
