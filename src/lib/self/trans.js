var jsmod = require('lib/self/jsmod/jsmod_extend.js');

function trans(html){
    var source = jsmod.util.url.getParam(window.location.href, 'source');

    var dpr = window.document.documentElement.getAttribute('data-dpr'), html_tran;

    var MAP_SIZE = [12,14,16,20,24,26,28];
    var reg_xx_small = /font-size:\s*xx-small;/ig;
    var reg_x_small = /font-size:\s*x-small;/ig;
    var reg_small = /font-size:\s*small;/ig;
    var reg_medium = /font-size:\s*medium;/ig;
    var reg_large = /font-size:\s*large;/ig;
    var reg_x_large = /font-size:\s*x-large;/ig;
    var reg_xx_large = /font-size:\s*xx-large;/ig;
    var reg_xxx_large = /font-size:\s*-webkit-xxx-large;/ig;

    var reg_px = /font-size:\s*(\d+)px/ig;

    var reg_lineheight = /line-height:\s*(\d+)px/ig;

    var reg_font = /(\<font (color=".*?" )?size=")(\d+)("( color=".*?")?( style="(background-color:.*?)?")?\>.*?\<\/font\>)/ig;

    var reg_enter = /\n\n/g;

    var reg_format = /(\<img\s*src=")([a-zA-z]+:\/\/[^\s]*)\/format,webp("\s*(alt="")?.*?\>)/ig;

    var reg_embed_mp4 = /\<embed\s*src="([a-zA-z]+:\/\/[^\s]*\.(avi|flv|mkv|mp4|mpg|wmv))".*?\>/ig;

    var reg_embed_mp3 = /\<embed\s*src="([a-zA-z]+:\/\/[^\s]*\.(amr|mp3|wav|wma))".*?\>/ig;

    if(dpr != 1){

        html_tran = html.replace(reg_px,function(){
            return 'font-size: ' + arguments[1]*dpr + 'px';
        });

        html_tran = html_tran.replace(reg_lineheight,function(){
            return 'line-height: ' + arguments[1]*dpr + 'px';
        });

        html_tran = html_tran.replace(reg_font,function(){
            if(arguments[2]){
                return '<font '+ arguments[2] +'style="font-size:'+ dpr*MAP_SIZE[arguments[3]-1] +'px' + arguments[4]
            }
            if(arguments[6] && arguments[7]){
                return '<font style="font-size:'+ dpr*MAP_SIZE[arguments[3]-1] +'px;' + arguments[7] + arguments[4]
            }
            return '<font style="font-size:'+ dpr*MAP_SIZE[arguments[3]-1] +'px' + arguments[4]
        });

    }

    html_tran = html_tran || html;

    // html_tran = html_tran.replace(reg_enter,function(){
    //     return '<br/>'
    // })

    html_tran = html_tran.replace(reg_embed_mp4,function(){
        return '<video controls src="'+ arguments[1] +'">您的浏览器不支持 video 标签</video>'
    })

    html_tran = html_tran.replace(reg_embed_mp3,function(){
        return '<audio controls src="'+ arguments[1] +'">您的浏览器不支持 audio 标签</audio>'
    })


    if(source == 1){
        html_tran = html_tran.replace(reg_format,function(){
            return arguments[1] + arguments[2] + arguments[3]
        })
    }

    html_tran = html_tran.replace(reg_xx_small,function(){
        return 'font-size: ' + 8*dpr + 'px;'
    });

    html_tran = html_tran.replace(reg_x_small,function(){
        return 'font-size: ' + 11*dpr + 'px;'
    });

    html_tran = html_tran.replace(reg_small,function(){
        return 'font-size: ' + 14*dpr + 'px;'
    });

    html_tran = html_tran.replace(reg_xx_large,function(){
        return 'font-size: ' + 26*dpr + 'px;'
    });

    html_tran = html_tran.replace(reg_x_large,function(){
        return 'font-size: ' + 23*dpr + 'px;'
    });

    html_tran = html_tran.replace(reg_large,function(){
        return 'font-size: ' + 20*dpr + 'px;'
    });

    html_tran = html_tran.replace(reg_medium,function(){
        return 'font-size: ' + 17*dpr + 'px;'
    });

    //wangeditor

    var regDDAudio = /\<ddaudio class="wangeditor-iframe-audio" src="(.*?)"\>\<\/ddaudio\>/gi;
    var regDDVideo = /\<ddvideo class="wangeditor-iframe-video" src="(.*?)"\>\<\/ddvideo\>/gi;

    html_tran = html_tran.replace(regDDAudio, function(){
        var name = jsmod.util.url.getParam(arguments[1],'name');
        var url = jsmod.util.url.getParam(arguments[1],'url');
        return arguments[0] + '<div class="wangeditor-iframe-audio-wrap" data-source="'+ decodeURIComponent(url) +'"><div class="wangeditor-iframe-audio-inner"><span class="wangeditor-iframe-name">'+ decodeURIComponent(name) +'</span></div></div>'
    })

    html_tran = html_tran.replace(regDDVideo, function(){
        var name = jsmod.util.url.getParam(arguments[1],'name');
        var url = jsmod.util.url.getParam(arguments[1],'url');
        return '<video preload="metadata" poster controls src="'+ decodeURIComponent(url) +'" type="video/mp4">您的浏览器不支持 video 标签</video>'
    })

    return html_tran;

}

module.exports = trans;
