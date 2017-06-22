<div class="discovery-activity-header">
    <a class="activity-avatar" href="javascript:void (0)"><img class="avatar" src="{{ data.activityInfo.userInfo.userImage }}" alt=""/></a>
    <div class="discovery-activity-detail-wrap">
        <p class="name"><a class="activity-name" href="javascript:void (0)">{{ data.activityInfo.userInfo.showName }}</a></p>
        <p class="content"><span class="time">{{ data.activityInfo.formatStartTime }} - {{ data.activityInfo.formatEndTime }}</span><span class="address">{{ data.activityInfo.provinceName }}{% if data.activityInfo.cityId != 0 %} {{ data.activityInfo.cityName }}{% endif %} {{ data.activityInfo.detailAddress }}</span></p>
    </div>
    <span class="address-tem">{{ data.activityInfo.provinceName }}{% if data.activityInfo.cityId != 0 %} {{ data.activityInfo.cityName }}{% endif %} {{ data.activityInfo.detailAddress }}</span>
</div>
<p class="discovery-activity-title">{{ data.activityInfo.title }}</p>
<div class="notice-container">
    {% if data.noticeList.length %}
    <div class="notice-list-wrap">
        <p class="notice-title">公告：</p>

        {% if data.noticeList.length == 1 %}
        <ul class="notice-list">
            {% for item in data.noticeList %}
            <li class="notice-item">
                <p class="notice-time">{{ item.formatCreateTime }}</p>
                <p class="notice-content">{{ item.notice }}</p>
            </li>
            {% endfor %}
        </ul>
        {% else %}
        <ul class="notice-list">
            {% for item in data.noticeList %}
            <li class="notice-item notice-item-multi">
                <p class="notice-time">{{ item.formatCreateTime }}</p>
                <p class="notice-content">{{ item.notice }}</p>
            </li>
            {% endfor %}
        </ul>
        {% endif %}

    </div>
    {% else %}
    <!-- <div class="notice-normal">公告：<span class="notice-word">正常</span></div> -->
    {% endif %}

</div>
<div class="discovery-activity-content">
    <p>{{ data.activityInfo.detailContent }}</p>
    {% if data.activityInfo.detailImages %}
    {% for item in data.activityInfo.detailImages %}
    <img src="{{ item.pictureUrl }}" alt=""/>
    {% endfor %}
    {% endif %}

    <p class="address"><a class="activity-address" href="javascript:void (0)">{{ (data.activityInfo.location|json_parse).name }}</a></p>
    <p class="time">{{ data.activityInfo.formatCreateTime }}
      {% if data.activityInfo.showAccess == 1 %}
      <a class="activity-show-access" href="javascript:void (0)"><i class="only-friend"></i></a>
      {% elseif data.activityInfo.showAccess == 2 || data.activityInfo.showAccess == 3 %}
      <a class="activity-show-access" href="javascript:void (0)"><i class="part"></i></a>
      {% else %}
      {% endif %}
       {% if data.activityInfo.isOver == '1' %}
       <span class="timeout">已结束</span>
       {% endif %}
     </p>
</div>

<div class="discovery-activity-end clearfix">
    <span class="deadline">报名截止：{{ data.activityInfo.formatDeadline }}</span>
    <span class="limit">{% if data.activityInfo.activityNum == '0' %}不限{% else %}限{{ data.activityInfo.activityNum }}人{% endif %}</span>
</div>


{% if data.activityInfo.isOwner == '1' %}
<div class="discovery-activity-handle">
    <div class="discovery-activity-intention"><a class="activity-inten" href="javascript:void (0)">已报名的人（{{ data.activityInfo.signPeopleCount }}）<i class="icon-arrow"></i></a></div>
    <a class="discovery-activity-edit" href="javascript:void (0)">编辑</a>
</div>
{% else %}
<div class="discovery-activity-handle">
  {% if !data.activityInfo.applyStatus || data.activityInfo.applyStatus == '2' || data.activityInfo.applyStatus == '3' %}
  <a class="discovery-activity-send {% if data.activityInfo.isCanSignUp == '0' %}disabled{% endif %}" href="javascript:void (0)">报名</a>
  {% else %}
  <a class="discovery-activity-communicate" href="javascript:void (0)">沟通</a>
  {% endif %}
</div>
{% endif %}

{% if data.activityInfo.review || data.activityInfo.reviewImages %}
<div class="discovery-activity-review">
    <p class="review-title">回顾</p>
    <div class="review-content">
        <p>{{ data.activityInfo.review }}</p>
        {% if data.activityInfo.reviewImages %}
        {% for item in data.activityInfo.reviewImages %}
        <img src="{{ item.pictureUrl }}" alt=""/>
        {% endfor %}
        {% endif %}
    </div>
</div>
{% endif %}
