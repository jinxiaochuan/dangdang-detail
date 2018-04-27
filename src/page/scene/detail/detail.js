var Vue = require('vue');

require('page/common/common.js');

require('./detail.less');

var TPL_SCENE = require('./tmpls/detail.tpl');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var share = require('lib/self/share.js');

new Vue({
    el: '#scene-sign-in',

    template: TPL_SCENE,

    data: function(){
        return {

        }
    },

    methods: {
        init () {
            console.log('init');
        }
    },

    mounted: function(){
        this.$nextTick(() => {
            this.init()
        })
    }

})
