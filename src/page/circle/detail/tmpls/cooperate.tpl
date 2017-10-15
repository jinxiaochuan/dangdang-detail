<div class="common-circle-header">
    <div class="avatar-wrap">
        <a class="tap-avatar" href="javascript:void(0)">
            <img class="avatar" src="{{ data.circleInfo.circleLogo.pictureUrl }}" alt="">
        </a>
    </div>
</div>
<div class="common-info-wrap">
    <div class="info-item">
        <span class="label-name label-name-industry">行业：</span>
        <span class="label-detail">{{ data.articleInfo.coopInfo.tradeName }}</span>
    </div>
    <div class="info-item">
        <span class="label-name label-name-address">地区：</span>
        <span class="label-detail">{{ data.articleInfo.coopInfo.provinceName }}{% if data.articleInfo.coopInfo.cityId != 0 %} {{ data.articleInfo.coopInfo.cityName }}{% endif %}</span>
    </div>
    <!-- {% if data.articleInfo.coopInfo.detailAddress %}
    <div class="info-item">
        <span class="label-name label-name-address-detail">地址：</span>
        <span class="label-detail">{{ data.articleInfo.coopInfo.detailAddress }}</span>
    </div>
    {% endif %} -->
</div>
<div class="common-title-wrap">
    {{ data.articleInfo.articleTitle }}
</div>

{% if data.articleInfo.coopInfo.noticeList.length %}
<div class="common-notice-wrap">
    <div class="notice-list-wrap">
        <p class="notice-title">公告</p>
        <ul class="notice-list">
            {% for item in data.articleInfo.coopInfo.noticeList %}
            <li class="notice-item">
                <p class="notice-time">{{ item.formatCreateTime }}</p>
                <pre class="notice-content">{{ item.notice }}</pre>
            </li>
            {% endfor %}
        </ul>
    </div>
</div>
{% endif %}

<div class="common-detail-wrap">
    <!-- <p class="detail-title">详情</p> -->
    <div class="detail-content">{{ data.articleInfo.detail|safe }}</div>
</div>
<div class="common-deadline-wrap">
    <span class="deadline {% if data.articleInfo.coopInfo.isCanSignUp == '0' %}over{% endif %}">发意向截止时间：{{  data.articleInfo.coopInfo.formatDeadline }}</span>
</div>
<div class="common-address">
    <a class="tap-location" href="javascript:void(0)">{{ (data.articleInfo.location|json_parse).name }}</a>
</div>
<div class="common-publish-wrap">
    <span class="publish-time">{{ data.articleInfo.formatCreateTime }}</span>
    {% if data.articleInfo.coopInfo.isOwner == '1' && data.isAdminIdentity == '1' %}
    {% if data.articleInfo.showAccess == 1 %}
    <a class="show-access" href="javascript:void (0)"><i class="member"></i></a>
    {% elseif data.articleInfo.showAccess == 2 %}
    <a class="show-access" href="javascript:void (0)"><i class="member-join"></i></a>
    {% elseif data.articleInfo.showAccess == 3 %}
    <a class="show-access" href="javascript:void (0)"><i class="member-part"></i></a>
    {% else %}
    {% endif %}
    {% endif %}
</div>
{% if data.articleInfo.coopInfo.isOwner == '1' && data.isAdminIdentity == 1 %}
<div class="common-sign-list-wrap">
    <a class="tap-sign" href="javascript:void(0)">
        <div class="sign-wrap">
            <span class="num">发意向的人{% if data.webShowInfo.enterCount != 0 %}（{{ data.webShowInfo.enterCount }}）{% endif %}</span>
            <span class="arrow"></span>
        </div>
    </a>
</div>
{% endif %}

{% if data.articleInfo.coopInfo.isOwner == '0' || data.articleInfo.coopInfo.isOwner == '1' && data.isAdminIdentity == '0' %}
{% if data.circleInfo.memberType == 1 || data.circleInfo.memberType == 3 %}
<div class="common-sign-wrap">
    {% if data.articleInfo.coopInfo.applyStatus == -1 %}
    <a class="sign-btn {% if data.articleInfo.coopInfo.isCanSignUp == '0' %}disabled{% endif %}" href="javascript:void(0)">发意向</a>
    {% else %}
    <a class="communicate-btn" href="javascript:void (0)">留言</a>
    {% endif %}
</div>
{% endif %}
{% endif %}

{% if data.articleInfo.coopInfo.review %}
<div class="common-review-wrap">
    <p class="review-title">回顾</p>
    <div class="review-content">{{ data.articleInfo.coopInfo.review|safe }}</div>
</div>
{% endif %}

{% if data.articleInfo.coopInfo.isOwner == '1' && data.isAdminIdentity == '1' %}
<div class="common-edit-wrap">
    <a class="edit-btn" href="javascript:void(0)">编辑合作</a>
</div>
{% endif %}
