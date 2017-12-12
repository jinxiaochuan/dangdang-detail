<div class="circle-index-header my-gallery">
    <div class="avatar-wrap">
        <a class="tap-avatar" href="javascript:void(0)">
            <img class="avatar" src="{{ data.baseInfo.circleLogo.pictureUrl }}" alt="">
        </a>
    </div>
    {% if data.baseInfo.accountNum %}
    <span class="dangdang-code">铛铛号: {{ data.baseInfo.accountNum }}</span>
    {% endif %}
</div>
<div class="circle-intro">
    {{ data.baseInfo.summary|safe }}
</div>
<div class="circle-handle circle-handle-account">
    <span class="name">帐号主体</span>
    <span class="detail">{% if data.baseInfo.circleType == 1 %}个人{% elseif data.baseInfo.circleType == 2 %}企业{% elseif data.baseInfo.circleType == 3 %}组织{% else %}{% endif %}<i class="arrow"></i></span>
</div>
{% if data.baseInfo.location != '{}' && data.baseInfo.longitude != '0.0' && data.baseInfo.latitude != '0.0' %}
<div class="circle-handle circle-handle-location">
    <span class="name">所在位置</span>
    <span class="detail detail-location"><span class="location">{{ (data.baseInfo.location|json_parse).name }}</span><i class="arrow"></i></span>
</div>
{% endif %}
<div class="circle-handle circle-handle-look">
    <span class="name">查看公开内容</span>
    <span class="detail"><i class="arrow"></i></span>
</div>
{% if data.baseInfo.memberType == 4 && data.baseInfo.isJoin == 1 %}
{% if data.baseInfo.publicSchool == 1 || data.baseInfo.publicWork == 1 %}
<div class="prompt-word">
    {% if data.baseInfo.publicSchool == 1 && data.baseInfo.publicWork == 1 %}
    <i class="point"></i><span>该公众圈需公开工作经历和学习经历</span>
    {% elseif data.baseInfo.publicSchool == 1 && data.baseInfo.publicWork == 0 %}
    <i class="point"></i><span>该公众圈需公开学习经历</span>
    {% elseif data.baseInfo.publicSchool == 0 && data.baseInfo.publicWork == 1 %}
    <i class="point"></i><span>该公众圈需公开工作经历</span>
    {% else %}
    {% endif %}
</div>
{% endif %}
{% endif %}

{% if data.source %}
<div class="circle-handle-wrap">
    <a class="circle-home app-btn" href="javascript:void(0)">加入公众圈</a>
</div>
{% else %}
{% if data.baseInfo.memberType != 4 || data.baseInfo.isJoin == 1 %}
<div class="circle-handle-wrap">
    <a class="circle-home" href="javascript:void(0)">{% if data.baseInfo.memberType == 4 %}加入公众圈{% else %}进入公众圈{% endif %}</a>
</div>
{% endif %}
{% endif %}
