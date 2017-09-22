<div class="media-intro-header my-gallery">
    <div class="avatar-wrap">
        <!-- <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
            <a class="tap-avatar" href="{{ data.mediaInfo.mediaLogo.pictureUrl }}" itemprop="contentUrl" data-size="{{ data.mediaInfo.mediaLogo.width }}x{{ data.mediaInfo.mediaLogo.height }}">
                <img class="avatar" src="{{ data.mediaInfo.mediaLogo.pictureUrl }}?x-oss-process=image/resize,m_fill,w_200,limit_0" alt="">
            </a>
        </figure> -->
        <a class="tap-avatar" href="javascript:void(0)">
            <img class="avatar" src="{{ data.mediaInfo.mediaLogo.pictureUrl }}?x-oss-process=image/resize,m_fill,w_100,h_100,limit_0" alt="">
        </a>
    </div>
</div>
<div class="media-intro">
    {{ data.mediaInfo.mediaDetail|safe }}
</div>
<div class="media-handle-wrap">
    <a class="media-home" href="javascript:void(0)">进入媒体</a>
</div>
