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
    {% if data.articleInfo.coopInfo.detailAddress %}
    <div class="info-item">
        <span class="label-name label-name-address-detail">地址：</span>
        <span class="label-detail">{{ data.articleInfo.coopInfo.detailAddress }}</span>
    </div>
    {% endif %}
</div>
<div class="common-title-wrap">
    {{ data.articleInfo.articleTitle }}
</div>

<div class="common-detail-wrap">
    <p class="detail-title">详情</p>
    <div class="detail-content">{{ data.articleInfo.detail|safe }}</div>
</div>

<div class="common-publish-wrap">
    <span class="publish-time">{{ data.articleInfo.formatCreateTime }}</span>
</div>

<div class="common-deadline-wrap">
    <span class="deadline {% if data.articleInfo.coopInfo.isCanSignUp == '0' %}over{% endif %}">发意向截止时间：{{  data.articleInfo.coopInfo.formatDeadline }}</span>
</div>

<div class="preview-fix clearfix">
    <span>此为临时链接，仅用于文章预览，将在短期内失效</span>
    <i class="close-icon">×</i>
</div>
