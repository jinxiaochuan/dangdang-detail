var TPL_VIDEO = require('./video.tpl');

require('./video.less');

var Vue = require('vue');

module.exports = Vue.extend({
    name: 'videoComponent',

    template: TPL_VIDEO,

    data: function () {
        return {

        }
    },

    methods: {

    },

    mounted: function(){
        this.$nextTick(() =>{
            
        })
    }
})
