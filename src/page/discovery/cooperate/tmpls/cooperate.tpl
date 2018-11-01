<div class="common-header">
    <div class="avatar-wrap">
        <a class="tap-avatar app-btn" href="javascript:void(0)">
            <img class="avatar" src="{{ data.userImage }}?x-oss-process=image/resize,m_fill,w_100,h_100,limit_0" alt="">
        </a>
    </div>
    <span class="name"><a class="tap-name app-btn" href="javascript:void(0)">{{ data.userShowName }}</a></span>
</div>
<div class="common-info-wrap">
    <div class="info-item">
        <span class="label-name label-name-industry">行业：</span>
        <span class="label-detail">{{ data.tradeName }}</span>
    </div>
    <div class="info-item">
        <span class="label-name label-name-address">地区：</span>
        <span class="label-detail">{{ data.provinceName }}{% if data.cityId != 0 %} {{ data.cityName }}{% endif %}</span>
    </div>
</div>
<div class="common-title-wrap">
    {{ data.title }}
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
    <div class="detail-content">{{ data.detailContent|safe }}</div>
</div>
<div class="common-deadline-wrap">
    <span class="deadline {% if data.isCanSignUp == '0' %}over{% endif %}">发意向截止时间：{{ data.formatDeadline }}</span>
</div>
<div class="common-address">
    <a class="tap-location app-btn" href="javascript:void(0)">{{ (data.location|json_parse).name }}</a>
</div>
<div class="common-publish-wrap">
    <span class="publish-time">{{ data.formatCreateTime }}</span>
    {% if data.isOwner == '1' %}
    {% if data.showAccess == 1 %}
    <a class="show-access app-btn" href="javascript:void(0)"><i class="only-friend"></i></a>
    {% elseif data.showAccess == 2 || data.showAccess == 3 %}
    <a class="show-access app-btn" href="javascript:void(0)"><i class="part"></i></a>
    {% else %}
    <a class="show-access app-btn" href="javascript:void(0)"><i class="member"></i></a>
    {% endif %}
    {% endif %}
</div>
{% if data.isOwner == '1' %}
<div class="common-sign-list-wrap">
    <a class="tap-sign app-btn" href="javascript:void(0)">
        <div class="sign-wrap">
            <span class="num">有意向的人{% if data.coopMemberCount != 0 %}（{{ data.coopMemberCount }}）{% endif %}</span>
            <span class="arrow"></span>
        </div>
    </a>
</div>
{% endif %}

{% if data.isOwner == '0' %}
<div class="common-sign-wrap">
    {% if data.applyStatus == -1 %}
    <a class="sign-btn app-btn {% if data.isCanSignUp == '0' %}disabled{% endif %}" href="javascript:void(0)"><i class="sign-icon"></i><span>发意向</span></a>
    {% else %}
    <a class="communicate-btn app-btn" href="javascript:void(0)"><i class="leavemsg-icon"></i><span>留言</span></a>
    {% endif %}
</div>
{% endif %}

{% if data.review || data.reviewImageList %}
<div class="common-review-wrap">
    <p class="review-title">回顾</p>
    <div class="review-content">{{ data.review|safe }}</div>
</div>
{% endif %}

{% if data.isOwner == '1' %}
<div class="common-edit-wrap">
    <a class="edit-btn app-btn" href="javascript:void(0)"><i class="edit-icon"></i><span>编辑合作</span></a>
</div>
{% endif %}
