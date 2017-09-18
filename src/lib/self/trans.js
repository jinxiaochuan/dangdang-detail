function trans(html){
    var dpr = window.document.documentElement.getAttribute('data-dpr'), html_tran;

    var MAP_SIZE = [11,14,17,20,23,26,29];
    var reg_xx_small = /font-size:\s*xx-small;/ig;
    var reg_x_small = /font-size:\s*x-small;/ig;
    var reg_small = /font-size:\s*small;/ig;
    var reg_medium = /font-size:\s*medium;/ig;
    var reg_large = /font-size:\s*large;/ig;
    var reg_x_large = /font-size:\s*x-large;/ig;
    var reg_xx_large = /font-size:\s*xx-large;/ig;
    var reg_xxx_large = /font-size:\s*-webkit-xxx-large;/ig;

    var reg_px = /font-size:\s*(\d+)px/ig;

    var reg_font = /(\<font.*)(size=")(\d+)(")(.*\>.*\<\/font\>)/ig;

    var reg_enter = /\n\n/g;

    var reg_format = /(\<img\s*src=")([a-zA-z]+:\/\/[^\s]*)\/format,webp("\>)/ig;

    if(dpr != 1){
        html_tran = html.replace(reg_px,function(){
            return 'font-size: ' + arguments[1]*dpr + 'px';
        });

        html_tran = html_tran.replace(reg_font,function(){
            return arguments[1] + "style='font-size: " + MAP_SIZE[arguments[3]-1]*dpr + "px'" + arguments[5]
        });
    }

    html_tran = html_tran || html;


    html_tran = html_tran.replace(reg_enter,function(){
        return '<br/>'
    })

    html_tran = html_tran.replace(reg_format,function(){
        return arguments[1] + arguments[2] + arguments[3]
    })

    html_tran = html_tran.replace(reg_xx_small,function(){
        return 'font-size: ' + 8*dpr + 'px';
    });

    html_tran = html_tran.replace(reg_x_small,function(){
        return 'font-size: ' + 11*dpr + 'px';
    });

    html_tran = html_tran.replace(reg_small,function(){
        return 'font-size: ' + 14*dpr + 'px';
    });

    html_tran = html_tran.replace(reg_xx_large,function(){
        return 'font-size: ' + 26*dpr + 'px';
    });

    html_tran = html_tran.replace(reg_x_large,function(){
        return 'font-size: ' + 23*dpr + 'px';
    });

    html_tran = html_tran.replace(reg_large,function(){
        return 'font-size: ' + 20*dpr + 'px';
    });

    html_tran = html_tran.replace(reg_medium,function(){
        return 'font-size: ' + 17*dpr + 'px';
    });

    return html_tran;

}

module.exports = trans;
