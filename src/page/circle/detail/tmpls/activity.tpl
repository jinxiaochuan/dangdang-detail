<div class="common-circle-header my-gallery">
    <div class="avatar-wrap">
        <!-- <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
            <a class="tap-avatar" href="{{ data.circleInfo.circleLogo.pictureUrl }}" itemprop="contentUrl" data-size="964x1024">
                <img class="avatar" src="{{ data.circleInfo.circleLogo.pictureUrl }}?x-oss-process=image/resize,m_fill,w_100,h_100,limit_0" alt="">
            </a>
        </figure> -->
        <a class="tap-avatar" href="javascript:void(0)">
            <img class="avatar" src="{{ data.circleInfo.circleLogo.pictureUrl }}?x-oss-process=image/resize,m_fill,w_100,h_100,limit_0" alt="">
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
    {% if data.articleInfo.activityInfo.detailAddress %}
    <div class="info-item">
        <span class="label-name label-name-address-detail">地址：</span>
        <span class="label-detail">{{ data.articleInfo.activityInfo.detailAddress }}</span>
    </div>
    {% endif %}
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
    <p class="detail-title">详情</p>
    <div class="detail-content">{{ data.articleInfo.detail|safe }}</div>
    {% if data.articleInfo.detailImages.length %}
    {% for item in data.articleInfo.detailImages %}
    <img src="{{ item.pictureUrl }}" alt="">
    {% endfor %}
    {% endif %}
</div>
<div class="common-address">
    <a class="tap-location" href="javascript:void(0)">{{ (data.articleInfo.location|json_parse).name }}</a>
</div>
<div class="common-publish-wrap">
    <span class="publish-time">{{ data.articleInfo.formatCreateTime }}</span>
    {% if data.articleInfo.activityInfo.isOwner == '1' && data.isAdminIdentity == 1 %}
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
<div class="common-deadline-wrap">
    <span class="deadline {% if data.articleInfo.activityInfo.isCanSignUp == '0' %}over{% endif %}">报名截止时间：{{ data.articleInfo.activityInfo.formatDeadLine }}</span>
    <span class="limit">{% if data.articleInfo.activityInfo.activityNum == '0' %}不限人数{% else %}限{{ data.articleInfo.activityInfo.activityNum }}人{% endif %}</span>
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
{% endif %}
{% if data.articleInfo.activityInfo.isOwner == '0' || data.articleInfo.activityInfo.isOwner == '1' && data.isAdminIdentity == '0' %}
{% if data.circleInfo.memberType == 1 || data.circleInfo.memberType == 3 %}
<div class="common-sign-wrap">
    {% if data.articleInfo.activityInfo.applyStatus == -1 %}
    <a class="sign-btn {% if data.articleInfo.activityInfo.isCanSignUp == '0' %}disabled{% endif %}" href="javascript:void(0)">报名</a>
    {% else %}
    <a class="communicate-btn" href="javascript:void (0)">沟通</a>
    {% endif %}
</div>
{% endif %}
{% endif %}

{% if data.articleInfo.activityInfo.review || data.articleInfo.activityInfo.reviewImages %}
<div class="common-review-wrap">
    <p class="review-title">回顾</p>
    <pre class="review-content">{{ data.articleInfo.activityInfo.review }}</pre>
    {% if data.articleInfo.activityInfo.reviewImages %}
    {% for item in data.articleInfo.activityInfo.reviewImages %}
    <img src="{{ item.pictureUrl }}" alt=""/>
    {% endfor %}
    {% endif %}
</div>
{% endif %}

{% if data.articleInfo.activityInfo.isOwner == '1' && data.isAdminIdentity == '1' %}
<div class="common-edit-wrap">
    <a class="edit-btn" href="javascript:void(0)">编辑活动</a>
</div>
{% endif %}
