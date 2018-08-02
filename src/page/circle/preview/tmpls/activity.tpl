<div class="common-circle-header my-gallery">
    <div class="avatar-wrap">
        <a class="tap-avatar" href="javascript:void(0)">
            <img class="avatar" src="{{ data.circleInfo.circleLogo.pictureUrl }}" alt="">
            <span class="name tap-avatar">{{ data.circleInfo.circleName }}</span>
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
<div class="common-detail-wrap">
    <!-- <p class="detail-title">详情</p> -->
    <div class="detail-content">{{ data.articleInfo.detail|safe }}</div>
</div>
<div class="common-publish-wrap">
    <span class="publish-time">{{ data.articleInfo.formatCreateTime }}</span>
</div>
<div class="common-deadline-wrap">
    <span class="deadline {% if data.articleInfo.activityInfo.isCanSignUp == '0' %}over{% endif %}">报名截止时间：{{ data.articleInfo.activityInfo.formatDeadLine }}</span>
    <span class="limit">{% if data.articleInfo.activityInfo.activityNum == '0' %}不限人数{% else %}限{{ data.articleInfo.activityInfo.activityNum }}人{% endif %}</span>
</div>

<div class="preview-fix">
    <span>此为临时链接，仅用于文章预览，将在短期内失效</span>
    <i class="close-icon">×</i>
</div>
