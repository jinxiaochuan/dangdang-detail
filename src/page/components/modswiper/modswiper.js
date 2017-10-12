require('./modswiper.less');

var jsmod = require('lib/self/jsmod/jsmod_extend.js');

var TPL_SWIPERS_ITEM = require('./tmpls/swiper.tpl');

var ModSwiper = jsmod.util.klass({
    initialize: function(option){
        // this.option = option;
        this.$swiperContainer = (option && option.container) || $('.swiper-container');
        this.$contentContainer = (option && option.contentContainer) || 'content';
        this.swiper = null;
    },

    render: function(){
        var self = this;
        // 查找content里面的img
        var data = [];
        $('.'+ this.$contentContainer).find('img').each(function(index, item){
            data.push($(item).attr('src'));
        });

        var html = swig.render(TPL_SWIPERS_ITEM,{
            locals:{
                data:data
            }
        });

        self.$swiperContainer.html(html);

         // 给图片添加事件
         self.attachEvent();
    },

    initSwiper: function(index){

        var windowHeight = $(window).height();

        this.$swiperContainer.css('height',windowHeight);
        $('body').css({
            'overflow':'hidden',
            'height':windowHeight
        });

        this.swiper && this.swiper.destroy();

        this.swiper = new swiper('.swiper-container', {
            initialSlide: index,
            pagination : '.swiper-pagination',
        });


    },

    attachEvent: function(){
        var self = this;

        $('body').delegate('.swiper-slide','click',function(){
            self.$swiperContainer.hide();
            $('body').css({
                'overflow-x':'hidden',
                'overflow-y':'scroll',
                'height':'auto'
            });
        });

        $('.' + self.$contentContainer).delegate('img', 'click', function(e){
            e.stopPropagation();
            //    获取当前滚动高度
            // var scrollTop = $(window).scrollTop();
            // self.$swiperContainer.css('top',scrollTop+'px');
            self.$swiperContainer.show();


            $('.swiper-slide').each(function(index, item){
                if(Math.abs(parseInt($(item).find('img').position().top)) >= parseInt($(window).height())){
                    $(item).find('img').addClass('long');
                }
            });


                // 获取当前下标
            var index = $(this).index('img') - 1;
            console.log(index);

            self.initSwiper(index);
        });
    }
})

module.exports = ModSwiper;
