<div class="common-header">
    <div class="avatar-wrap">
        <a class="tap-avatar" href="javascript:void(0)">
            <img class="avatar" src="{{ data.in24hInfo.userInfo.userImage }}" alt="">
        </a>
    </div>
    <span class="name"><a class="tap-name" href="javascript:void(0)">{{ data.in24hInfo.userInfo.showName }}</a></span>
</div>
<div class="common-info-wrap">
    <div class="info-item">
        <span class="label-name label-name-time">活动时间：</span>
        <span class="label-detail">{{ data.in24hInfo.formatStartTime }}</span>
    </div>
    <div class="info-item">
        <span class="label-name label-name-address">活动地点：</span>
        <span class="label-detail label-detail-in24h"><a class="in24-address" href="javascript:void (0)">{{ (data.in24hInfo.webInfo.activityLocation|json_parse).name }}</a> <span class="distance">{{ data.in24hInfo.formatDistance }}</span></span>
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
    <p class="detail-title">详情</p>
    <pre class="detail-content">{{ data.in24hInfo.detailContent }}</pre>
    {% if data.in24hInfo.detailImages %}
    {% for item in data.in24hInfo.detailImages %}
    <img src="{{ item.pictureUrl }}" alt=""/>
    {% endfor %}
    {% endif %}
</div>
<div class="common-address">
    <a class="tap-location" href="javascript:void(0)">{{ (data.in24hInfo.location|json_parse).name }}</a>
</div>
<div class="common-publish-wrap">
    <span class="publish-time">{{ data.in24hInfo.formatCreateTime }}</span>
    {% if data.in24hInfo.showAccess == 1 %}
    <a class="show-access" href="javascript:void (0)"><i class="only-friend"></i></a>
    {% elseif data.in24hInfo.showAccess == 2 || data.in24hInfo.showAccess == 3 %}
    <a class="show-access" href="javascript:void (0)"><i class="part"></i></a>
    {% else %}
    {% endif %}
</div>
<div class="common-deadline-wrap">
    <span class="deadline {% if data.in24hInfo.isCanSignUp == '0' %}over{% endif %}">报名截止时间：{{ data.in24hInfo.formatDeadline }}</span>
    <span class="limit">{% if data.in24hInfo.activityNum == '0' %}不限{%else%}限{{ data.in24hInfo.activityNum }}人{% endif %}</span>
</div>

{% if data.in24hInfo.isOwner == '1' %}
<div class="common-sign-list-wrap">
    <a class="tap-sign" href="javascritp:void(0)">
        <div class="sign-wrap">
            <span class="num">已报名的人（{{ data.in24hInfo.signPeopleCount }}）</span>
            <span class="arrow"></span>
        </div>
    </a>
</div>
{% endif %}

{% if data.in24hInfo.isOwner == '0' %}
<div class="common-sign-wrap">
    {% if data.in24hInfo.applyStatus == -1 %}
    <a class="sign-btn {% if data.in24hInfo.isCanSignUp == '0' %}disabled{% endif %}" href="javascript:void(0)">报名</a>
    {% else %}
    <a class="communicate-btn" href="javascript:void (0)">沟通</a>
    {% endif %}
</div>
{% endif %}

{% if data.in24hInfo.review || data.in24hInfo.reviewImages %}
<div class="common-review-wrap">
    <p class="review-title">回顾</p>
    <pre class="review-content">{{ data.in24hInfo.review }}</pre>
    {% if data.in24hInfo.reviewImages %}
    {% for item in data.in24hInfo.reviewImages %}
    <img src="{{ item.pictureUrl }}" alt=""/>
    {% endfor %}
    {% endif %}
</div>
{% endif %}

{% if data.in24hInfo.isOwner == '1' %}
<div class="common-edit-wrap">
    <a class="edit-btn" href="javascript:void(0)">编辑IN24h</a>
</div>
{% endif %}
