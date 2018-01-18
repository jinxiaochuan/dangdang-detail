var Vue = require('vue');

require('page/common/common.js');

require('./preheat.less');

var TPL_PREHEAT = require('./tmpls/preheat.tpl');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var trans = require('lib/self/trans.js');

var share = require('lib/self/share.js');

var VideoComponent = require('page/components/video/video.js');

var setupWebViewJavascriptBridge = require('lib/self/setupWebViewJavascriptBridge.js');

var HREF_ORIGIN = window.location.href;

var PATH_ORIGIN = window.location.origin;

new Vue({
    el: '#lotto-preheat',
    template: TPL_PREHEAT,
    components:{
        VideoComponent
    }

})
