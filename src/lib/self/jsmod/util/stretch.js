/**
 * 按照容器大小为中心，截取图
 * @param imgD  [img对象]
 * @param iwidth [要固定的宽度]
 * @param iheight [要固定的高度]
 * @param alignCenter [是否居中]
 * @param isShowAll
 */

var stretchImg=function(imgD, iwidth, iheight, alignCenter, isShowAll){
    var exec=function(){
        var _w=imgD.width,
            _h=imgD.height,
            _scale=_h/_w,
            _finalWidth,
            _finalHeight,
            moveLeft,
            moveTop;

        var maxRatio= Math.max(iwidth/_w,iheight/_h);

        isShowAll && (maxRatio = Math.min(iwidth/_w,iheight/_h));

        _finalWidth = parseInt(maxRatio * _w,10)||iwidth;
        _finalHeight = parseInt(maxRatio * _h,10)||iheight;

        imgD.style.width=_finalWidth+'px';
        imgD.style.height=_finalHeight+'px';

        moveTop = parseInt((iheight - _finalHeight)/2,10);
        moveLeft = parseInt((iwidth - _finalWidth)/2,10);

        if(alignCenter){
            $(imgD).css({
                "margin-top":moveTop,
                "margin-left":moveLeft
            });
        }
        imgD.style.display = "";
    }

    if(imgD.complete){
        exec();
    }else{
        imgD.onload=function(){
            exec();
        }
    }
};

module.exports = {
    stretchImg:stretchImg
}


