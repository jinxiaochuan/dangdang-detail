<div class="common-header">
    <div class="avatar-wrap">
        <a class="tap-avatar app-btn" href="javascript:void(0)">
            <img class="avatar" src="{{ data.activityInfo.userInfo.userImage }}?x-oss-process=image/resize,m_fill,w_100,h_100,limit_0" alt="">
        </a>
    </div>
    <span class="name"><a class="tap-name app-btn" href="javascript:void(0)">{{ data.activityInfo.userInfo.showName }}</a></span>
</div>
<div class="common-info-wrap">
    <div class="info-item">
        <span class="label-name label-name-time">时间：</span>
        <span class="label-detail">{{ data.activityInfo.formatStartTime }} - {{ data.activityInfo.formatEndTime }}</span>
    </div>
    <div class="info-item">
        <span class="label-name label-name-address">地区：</span>
        <span class="label-detail">{{ data.activityInfo.provinceName }} {% if data.activityInfo.cityId != 0 %}{{ data.activityInfo.cityName }}{% endif %}</span>
    </div>
</div>
<div class="common-title-wrap">
    {{ data.activityInfo.title }}
</div>
{% if data.noticeList.length %}
<div class="common-notice-wrap">
    <div class="notice-list-wrap">
        <p class="notice-title">公告</p>
        <ul class="notice-list">
            {% for item in data.noticeList %}
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
    <div class="detail-content">{{ data.activityInfo.detailContent|safe }}</div>
</div>
<div class="common-deadline-wrap">
    <span class="deadline {% if data.activityInfo.isCanSignUp == '0' %}over{% endif %}">报名截止时间：{{ data.activityInfo.formatDeadline }}</span>
    <span class="limit">{% if data.activityInfo.activityNum == '0' %}不限人数{% else %}限{{ data.activityInfo.activityNum }}人{% endif %}</span>
</div>
<div class="common-address">
    <a class="tap-location app-btn" href="javascript:void(0)">{{ (data.activityInfo.location|json_parse).name }}</a>
</div>
<div class="common-publish-wrap">
    <span class="publish-time">{{ data.activityInfo.formatCreateTime }}</span>
    {% if data.activityInfo.isOwner == '1' %}
    {% if data.activityInfo.showAccess == 1 %}
    <a class="show-access app-btn" href="javascript:void(0)"><i class="only-friend"></i></a>
    {% elseif data.activityInfo.showAccess == 2 || data.activityInfo.showAccess == 3 %}
    <a class="show-access app-btn" href="javascript:void(0)"><i class="part"></i></a>
    {% else %}
    <a class="show-access app-btn" href="javascript:void(0)"><i class="member"></i></a>
    {% endif %}
    {% endif %}
</div>
{% if data.activityInfo.isOwner == '1' %}
<div class="common-sign-list-wrap">
    <a class="tap-sign app-btn" href="javascript:void(0)">
        <div class="sign-wrap">
            <span class="num">已报名的人{% if data.activityInfo.signPeopleCount != 0 %}（{{ data.activityInfo.signPeopleCount }}）{% endif %}</span>
            <span class="arrow"></span>
        </div>
    </a>
</div>
{% endif %}

{% if data.activityInfo.isOwner == '0' %}
<div class="common-sign-wrap">
    {% if data.activityInfo.applyStatus == -1 %}
    <a class="sign-btn app-btn {% if data.activityInfo.isCanSignUp == '0' %}disabled{% endif %}" href="javascript:void(0)"><i class="sign-icon"></i><span>报名</span></a>
    {% else %}
    <a class="communicate-btn app-btn" href="javascript:void(0)"><i class="leavemsg-icon"></i><span>留言</span></a>
    {% endif %}
</div>
{% endif %}

{% if data.activityInfo.review || data.activityInfo.reviewImages %}
<div class="common-review-wrap">
    <p class="review-title">回顾</p>
    <div class="review-content">{{ data.activityInfo.review|safe }}</div>
</div>
{% endif %}

{% if data.activityInfo.isOwner == '1' %}
<div class="common-edit-wrap">
    <a class="edit-btn app-btn" href="javascript:void(0)"><i class="edit-icon"></i><span>编辑活动</span></a>
</div>
{% endif %}
