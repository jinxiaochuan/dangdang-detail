<div class="circle-index-header my-gallery">
    <div class="avatar-wrap">
        <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
            <a class="tap-avatar" href="{{ data.baseInfo.circleLogo.pictureUrl }}" itemprop="contentUrl" data-size="{{ data.baseInfo.circleLogo.width }}x{{ data.baseInfo.circleLogo.height }}">
                <img class="avatar" src="{{ data.baseInfo.circleLogo.pictureUrl }}?x-oss-process=image/resize,m_fill,w_200,limit_0" alt="">
            </a>
        </figure>
    </div>
    <span class="dangdang-code">铛铛号: {{ data.baseInfo.accountNum }}</span>
</div>
<div class="circle-intro">
    {{ data.baseInfo.summary|safe }}
    {% if data.baseInfo.summaryImages %}
    {% for item in data.baseInfo.summaryImages %}
    <img src="{{ item.pictureUrl }}" alt=""/>
    {% endfor %}
    {% endif %}
</div>
<div class="circle-handle circle-handle-account">
    <span class="name">账号主体</span>
    <span class="detail">{% if data.baseInfo.circleType == 1 %}个人{% elseif data.baseInfo.circleType == 2 %}企业{% elseif data.baseInfo.circleType == 3 %}组织{% else %}{% endif %}<i class="arrow"></i></span>
</div>
<div class="circle-handle circle-handle-location">
    <span class="name">所在位置</span>
    <span class="detail detail-location"><span class="location">{{ (data.baseInfo.location|json_parse).name }}</span><i class="arrow"></i></span>
</div>
<div class="circle-handle circle-handle-look">
    <span class="name">查看公开内容</span>
    <span class="detail"><i class="arrow"></i></span>
</div>
<div class="circle-handle-wrap">
    <a class="circle-home" href="jacascritp:void(0)">{% if data.baseInfo.memberType == 4 %}加入公众圈{% else %}进入公众圈{% endif %}</a>
</div>
