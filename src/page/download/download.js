require('page/common/common.js');

require('./download.less');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var Download = jsmod.util.klass({
    initialize: function(option){
        this.option = option;
        this.$container = $('.container');
        this.initEvents();
    },
    initEvents: function(){
        this.$container.delegate('.ios-download','click',function(){
            window.location.href = 'https://itunes.apple.com/cn/app/id967227032';
        })
        this.$container.delegate('.android-download','click',function(){
            window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.aladdin.dangdang';
        })
    }
})

new Download();
