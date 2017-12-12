//wangeditor

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var AudioHandler = jsmod.util.klass({
    initialize: function (option) {
        this.option = option;
        this.isHasAudio = false;
        this.canplay = false;
        this.play = false;
        this.initEvents();
    },

    initEvents: function() {
        var self = this, option = this.option;

        var selector = option && option.ele || '.wangeditor-iframe-audio-wrap';

        $('body').delegate(selector, 'click', function(){
            var _this = this;

            if(!self.isHasAudio) {
                var source = $(this).data('source');
                var audioHtml = '<audio style="height:0;width:0;display:none;" autoplay src="'+ source +'">您的浏览器不支持 audio 标签</audio>'
                $('body').append(audioHtml)
                self.isHasAudio = true;

                $('body audio').on('canplaythrough', function(){
                    self.canplay = true;
                })
                $('body audio').on('play', function(){
                    $(_this).addClass('playing');
                    self.play = true;
                    option.playcallback && option.playcallback()
                })
                $('body audio').on('pause', function(){
                    $(_this).removeClass('playing');
                    self.play = false;
                    option.pausecallback && option.pausecallback()
                })
                $('body audio').on('ended', function(){
                    $(_this).removeClass('playing');
                    self.play = false;
                    option.endedcallback && option.endedcallback()
                })
            }

            if(!self.canplay) return

            if(self.play){
                $('body audio')[0].pause();
            }else {
                $('body audio')[0].play();
            }

        })



    }
})

module.exports = AudioHandler
