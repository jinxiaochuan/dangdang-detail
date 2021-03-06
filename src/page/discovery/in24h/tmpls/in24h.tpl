<div class="common-header">
    <div class="avatar-wrap">
        <a class="tap-avatar app-btn" href="javascript:void(0)">
            <img class="avatar" src="{{ data.in24hInfo.userInfo.userImage }}?x-oss-process=image/resize,m_fill,w_100,h_100,limit_0" alt="">
        </a>
    </div>
    <span class="name"><a class="tap-name app-btn" href="javascript:void(0)">{{ data.in24hInfo.userInfo.showName }}</a></span>
</div>
<div class="common-info-wrap">
    <div class="info-item">
        <span class="label-name label-name-time">时间：</span>
        <span class="label-detail">{{ data.in24hInfo.formatStartTime }}</span>
    </div>
    <div class="info-item">
        <span class="label-name label-name-location">地点：</span>
        <span class="label-detail label-detail-in24h"><a class="in24-address app-btn" href="javascript:void(0)">{{ (data.in24hInfo.webInfo.activityLocation|json_parse).name }}</a> <span class="distance">{{ data.in24hInfo.formatDistance }}</span></span>
    </div>
</div>
<div class="common-title-wrap">
    {{ data.in24hInfo.title }}
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
    <div class="detail-content">{{ data.in24hInfo.detailContent|safe }}</div>
</div>
<div class="common-deadline-wrap">
    <span class="deadline {% if data.in24hInfo.isCanSignUp == '0' %}over{% endif %}">报名截止时间：{{ data.in24hInfo.formatDeadline }}</span>
    <span class="limit">{% if data.in24hInfo.activityNum == '0' %}不限人数{%else%}限{{ data.in24hInfo.activityNum }}人{% endif %}</span>
</div>
<div class="common-address">
    <a class="tap-location app-btn" href="javascript:void(0)">{{ (data.in24hInfo.location|json_parse).name }}</a>
</div>
<div class="common-publish-wrap">
    <span class="publish-time">{{ data.in24hInfo.formatCreateTime }}</span>
    {% if data.in24hInfo.isOwner == '1' %}
    {% if data.in24hInfo.showAccess == 1 %}
    <a class="show-access app-btn" href="javascript:void(0)"><i class="only-friend"></i></a>
    {% elseif data.in24hInfo.showAccess == 2 || data.in24hInfo.showAccess == 3 %}
    <a class="show-access app-btn" href="javascript:void(0)"><i class="part"></i></a>
    {% else %}
    <a class="show-access app-btn" href="javascript:void(0)"><i class="member"></i></a>
    {% endif %}
    {% endif %}
</div>
{% if data.in24hInfo.isOwner == '1' %}
<div class="common-sign-list-wrap">
    <a class="tap-sign app-btn" href="javascript:void(0)">
        <div class="sign-wrap">
            <span class="num">已报名的人{% if data.in24hInfo.signPeopleCount != 0 %}（{{ data.in24hInfo.signPeopleCount }}）{% endif %}</span>
            <span class="arrow"></span>
        </div>
    </a>
</div>
{% endif %}

{% if data.in24hInfo.isOwner == '0' %}
<div class="common-sign-wrap">
    {% if data.in24hInfo.applyStatus == -1 %}
    <a class="sign-btn app-btn {% if data.in24hInfo.isCanSignUp == '0' %}disabled{% endif %}" href="javascript:void(0)"><i class="sign-icon"></i><span>报名</span></a>
    {% else %}
    <a class="communicate-btn app-btn" href="javascript:void(0)"><i class="leavemsg-icon"></i><span>留言</span></a>
    {% endif %}
</div>
{% endif %}

{% if data.in24hInfo.review || data.in24hInfo.reviewImages %}
<div class="common-review-wrap">
    <p class="review-title">回顾</p>
    <div class="review-content">{{ data.in24hInfo.review|safe }}</div>
</div>
{% endif %}

{% if data.in24hInfo.isOwner == '1' %}
<div class="common-edit-wrap">
    <a class="edit-btn app-btn" href="javascript:void(0)"><i class="edit-icon"></i><span>编辑IN24h</span></a>
</div>
{% endif %}
