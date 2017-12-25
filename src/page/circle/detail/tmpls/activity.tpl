<div class="common-circle-header my-gallery">
    <div class="avatar-wrap">
        <a class="tap-avatar" href="javascript:void(0)">
            <img class="avatar" src="{{ data.circleInfo.circleLogo.pictureUrl }}" alt="">
        </a>
    </div>
</div>
<div class="common-info-wrap">
    <div class="info-item">
        <span class="label-name label-name-time">时间：</span>
        <span class="label-detail">{{ data.articleInfo.activityInfo.formatStartTime }} - {{ data.articleInfo.activityInfo.formatEndTime }}</span>
    </div>
    <div class="info-item">
        <span class="label-name label-name-address">地区：</span>
        <span class="label-detail">{{ data.articleInfo.activityInfo.provinceName }} {% if data.articleInfo.activityInfo.cityId != 0 %}{{ data.articleInfo.activityInfo.cityName }}{% endif %}</span>
    </div>
    <!-- {% if data.articleInfo.activityInfo.detailAddress %}
    <div class="info-item">
        <span class="label-name label-name-address-detail">地址：</span>
        <span class="label-detail">{{ data.articleInfo.activityInfo.detailAddress }}</span>
    </div>
    {% endif %} -->
</div>
<div class="common-title-wrap">
    {{ data.articleInfo.articleTitle }}
</div>
{% if data.articleInfo.activityInfo.noticeList.length %}
<div class="common-notice-wrap">
    <div class="notice-list-wrap">
        <p class="notice-title">公告</p>
        <ul class="notice-list">
            {% for item in data.articleInfo.activityInfo.noticeList %}
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
<!-- {% if data.supportHb && data.articleInfo.hbInfo %}
<div class="circle-red-envelope {% if data.articleInfo.hbInfo.hbStatus == 3 %}rev{% elseif data.articleInfo.hbInfo.hbStatus == 4 %}expire{% else %}{% endif %}">
    {% if data.articleInfo.hbInfo.hbStatus == 2 %}
    <div class="red-envelope">
        <div class="red-envelope-word">{{ data.articleInfo.hbInfo.hbMessage }}</div>
        <div class="red-envelope-status">领取红包</div>
    </div>
    {% elseif data.articleInfo.hbInfo.hbStatus == 3 %}
    <div class="red-envelope-rev">
        <div class="red-envelope-status">红包已被领完</div>
    </div>
    {% elseif data.articleInfo.hbInfo.hbStatus == 4 %}
    <div class="red-envelope-expire">
        <div class="red-envelope-word">{{ data.articleInfo.hbInfo.hbMessage }}</div>
        <div class="red-envelope-status">红包已过期</div>
    </div>
    {% else %}
    {% endif %}
</div>
{% endif %} -->
<div class="common-deadline-wrap">
    <span class="deadline {% if data.articleInfo.activityInfo.isCanSignUp == '0' %}over{% endif %}">报名截止时间：{{ data.articleInfo.activityInfo.formatDeadLine }}</span>
    <span class="limit">{% if data.articleInfo.activityInfo.activityNum == '0' %}不限人数{% else %}限{{ data.articleInfo.activityInfo.activityNum }}人{% endif %}</span>
</div>
<div class="common-address">
    <a class="tap-location" href="javascript:void(0)">{{ (data.articleInfo.location|json_parse).name }}</a>
</div>
<div class="common-publish-wrap">
    <span class="publish-time">{{ data.articleInfo.formatCreateTime }}</span>
    {% if data.articleInfo.activityInfo.isOwner == '1' && data.isAdminIdentity == 1 %}
    {% if data.articleInfo.showAccess == 1 %}
    <a class="show-access" href="javascript:void (0)"><i class="member-part"></i></a>
    {% elseif data.articleInfo.showAccess == 2 %}
    <a class="show-access" href="javascript:void (0)"><i class="member-join"></i></a>
    {% elseif data.articleInfo.showAccess == 3 %}
    <a class="show-access" href="javascript:void (0)"><i class="member-part"></i></a>
    {% else %}
    <a class="show-access" href="javascript:void (0)"><i class="member"></i></a>
    {% endif %}
    {% endif %}
</div>
{% if data.articleInfo.activityInfo.isOwner == '1' && data.isAdminIdentity ==  '1' %}
<div class="common-sign-list-wrap">
    <a class="tap-sign" href="javascript:void(0)">
        <div class="sign-wrap">
            <span class="num">已报名的人{% if data.webShowInfo.enterCount != 0 %}（{{ data.webShowInfo.enterCount }}）{% endif %}</span>
            <span class="arrow"></span>
        </div>
    </a>
</div>
{% else %}
<div class="common-sign-wrap">
    {% if data.articleInfo.activityInfo.applyStatus == -1 %}
    <a class="sign-btn {% if data.articleInfo.activityInfo.isCanSignUp == '0' %}disabled{% endif %}" href="javascript:void(0)">报名</a>
    {% else %}
    <a class="communicate-btn" href="javascript:void (0)">留言</a>
    {% endif %}
</div>
{% endif %}
<!-- {% if data.articleInfo.activityInfo.isOwner == '0' || data.articleInfo.activityInfo.isOwner == '1' && data.isAdminIdentity == '0' %}
{% if data.circleInfo.memberType == 1 || data.circleInfo.memberType == 3 %}
<div class="common-sign-wrap">
    {% if data.articleInfo.activityInfo.applyStatus == -1 %}
    <a class="sign-btn {% if data.articleInfo.activityInfo.isCanSignUp == '0' %}disabled{% endif %}" href="javascript:void(0)">报名</a>
    {% else %}
    <a class="communicate-btn" href="javascript:void (0)">留言</a>
    {% endif %}
</div>
{% endif %}
{% endif %} -->

{% if data.articleInfo.activityInfo.review %}
<div class="common-review-wrap">
    <p class="review-title">回顾</p>
    <div class="review-content">{{ data.articleInfo.activityInfo.review|safe }}</div>
</div>
{% endif %}
{% if data.articleInfo.activityInfo.isOwner == '1' && data.isAdminIdentity == '1' %}
<div class="common-edit-wrap">
    <a class="edit-btn" href="javascript:void(0)">编辑活动</a>
</div>
{% endif %}
