<!-- <div class="common-circle-header my-gallery">
    <div class="avatar-wrap">
        <a class="tap-avatar" href="javascript:void(0)">
            <img class="avatar" src="{{ data.circleInfo.circleLogo.pictureUrl }}" alt="">
        </a>
    </div>
</div> -->
<div class="common-circle-head">
    <div class="avatar-wrap">
        <a class="tap-avatar app-btn" href="javascript:void(0)">
            <img class="avatar" src="{{ data.circleInfo.circleLogo.pictureUrl }}" alt="">
        </a>
    </div>
    <span class="name"><a class="tap-name tap-avatar app-btn" href="javascript:void(0)">{{ data.circleInfo.circleName }}</a></span>
</div>

{% if data.source == 1 && data.circleInfo.closeMemberListOuter == 0 && data.circleInfo.memberInfo %}
<div class="common-mini-avatar-wrap">
    <div class="mini-avatar-left">
        <ul class="mini-avatar-list clearfix">
            {% for item in  data.circleInfo.memberInfo.userList %}
            <li class="mini-avatar-item">
                <img src="{{ item.headImage.picture }}" alt="">
            </li>
            {% endfor %}
        </ul>
        <span class="mini-avatar-num">{{ data.circleInfo.memberInfo.memberCount | Numberal }}人</span>
    </div>
    <a class="mini-avatar-join app-btn" href="javascript:void(0)">加入</a>
</div>
{% endif %}

<div class="common-info-wrap">
    <div class="info-item">
        <span class="label-name label-name-time">时间：</span>
        <span class="label-detail">{{ data.articleInfo.activityInfo.formatStartTime }} - {{ data.articleInfo.activityInfo.formatEndTime }}</span>
    </div>
    <div class="info-item">
        <span class="label-name label-name-address">地区：</span>
        <span class="label-detail">{{ data.articleInfo.activityInfo.provinceName }} {% if data.articleInfo.activityInfo.cityId != 0 %}{{ data.articleInfo.activityInfo.cityName }}{% endif %}</span>
    </div>
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
    <div class="detail-content">{{ data.articleInfo.detail|safe }}</div>
</div>
<div class="common-deadline-wrap">
    <span class="deadline {% if data.articleInfo.activityInfo.isCanSignUp == '0' %}over{% endif %}">报名截止时间：{{ data.articleInfo.activityInfo.formatDeadLine }}</span>
    <span class="limit">{% if data.articleInfo.activityInfo.activityNum == '0' %}不限人数{% else %}限{{ data.articleInfo.activityInfo.activityNum }}人{% endif %}</span>
</div>
{% if data.articleInfo.activityInfo.needCharge == 1 %}
<div class="circle-activity-charge-wrap">
    <div class="charge-wrap">
        <p class="charge-name">{{ data.articleInfo.activityInfo.chargeName }}</p>
        <p class="charge-amount"><span class="amount-symbol">¥</span><span class="amount">{{ data.articleInfo.activityInfo.chargeAmount|amount_convert }}</span></p>
        <p class="charge-desc">{{ data.articleInfo.activityInfo.chargeDesc }}</p>
    </div>
</div>
{% endif %}
<div class="common-address">
    <a class="tap-location app-btn" href="javascript:void(0)">{{ (data.articleInfo.location|json_parse).name }}</a>
</div>
<div class="common-publish-wrap">
    <span class="publish-time">{{ data.articleInfo.formatCreateTime }}</span>
    {% if data.isAdminIdentity == '1' %}
    {% if data.articleInfo.showAccess == 1 %}
    <a class="show-access" href="javascript:void(0)"><i class="member-part"></i></a>
    {% elseif data.articleInfo.showAccess == 2 %}
    <a class="show-access" href="javascript:void(0)"><i class="member-join"></i></a>
    {% elseif data.articleInfo.showAccess == 3 %}
    <a class="show-access" href="javascript:void(0)"><i class="member-part"></i></a>
    {% else %}
    <a class="show-access" href="javascript:void(0)"><i class="member"></i></a>
    {% endif %}
    {% endif %}
</div>
{% if data.isAdminIdentity ==  '1' %}
<div class="common-sign-list-wrap">
    <a class="tap-sign app-btn" href="javascript:void(0)">
        <div class="sign-wrap">
            <span class="num">已报名的人{% if data.webShowInfo.enterCount != 0 %}（{{ data.webShowInfo.enterCount }}）{% endif %}</span>
            <span class="arrow"></span>
        </div>
    </a>
</div>
{% else %}
<div class="common-sign-wrap">
    {% if data.articleInfo.activityInfo.applyStatus == -1 %}
    <a class="sign-btn app-btn {% if data.articleInfo.activityInfo.isCanSignUp == '0' %}disabled{% endif %}" href="javascript:void(0)"><i class="sign-icon"></i><span>报名</span></a>
    {% else %}
    <a class="communicate-btn app-btn" href="javascript:void(0)"><i class="leavemsg-icon"></i><span>留言</span></a>
    {% endif %}
</div>
{% endif %}
{% if data.articleInfo.activityInfo.review %}
<div class="common-review-wrap">
    <p class="review-title">回顾</p>
    <div class="review-content">{{ data.articleInfo.activityInfo.review|safe }}</div>
</div>
{% endif %}
{% if data.isAdminIdentity == '1' %}
<div class="common-edit-wrap">
    <a class="edit-btn app-btn" href="javascript:void(0)"><i class="edit-icon"></i><span>编辑活动</span></a>
</div>
{% endif %}
