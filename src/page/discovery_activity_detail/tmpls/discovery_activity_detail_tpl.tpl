<div class="discovery-activity-header">
    <a class="activity-avatar" href="javascript:void (0)"><img class="avatar" src="{{ data.activityInfo.userInfo.userImage }}" alt=""/></a>
    <div class="discovery-activity-detail-wrap">
        <p class="name"><a class="activity-name" href="javascript:void (0)">{{ data.activityInfo.userInfo.showName }}</a></p>
        <p class="content"><span class="time">{{ data.activityInfo.formatStartTime }} - {{ data.activityInfo.formatEndTime }}</span><span class="address">{{ data.activityInfo.provinceName }} {{ data.activityInfo.cityName }}</span></p>
    </div>
</div>
<p class="discovery-activity-title">{{ data.activityInfo.notice }}</p>
<div class="notice-container">
    {% if data.noticeList.length %}
    <div class="notice-list-wrap">
        <p class="notice-title">公告：</p>
        <ul class="notice-list">
            {% for item in data.noticeList %}
            <li class="notice-item">
                <p class="notice-time">{{ item.formatCreateTime }}</p>
                <p class="notice-content">{{ item.notice }}</p>
            </li>
            {% endfor %}
        </ul>
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

    <p class="address"><a class="activity-address" href="javascript:void (0)"></a>{{ data.activityInfo.location }}</p>
    <p class="time">{{ data.activityInfo.formatCreateTime }}
      {% if data.showAccess == 1 %}
      <a class="activity-show-access" href="javascript:void (0)"><i class="member"></i></a>
      {% elseif data.showAccess == 2 %}
      <a class="activity-show-access" href="javascript:void (0)"><i class="member-join"></i></a>
      {%elseif data.showAccess == 3 %}
      <a class="activity-show-access" href="javascript:void (0)"><i class="member-part"></i></a>
      {% else %}
      {% endif %}
       {% if data.isOver == '1' %}
       <span class="timeout">已结束</span>
       {% endif %}
     </p>
</div>

<div class="discovery-activity-end clearfix">
    <span class="deadline">报名截止：{{ data.activityInfo.formatDeadline }}</span>
    <span class="limit">限{{ data.activityInfo.activityNum }}人</span>
</div>

{% if data.activityInfo.review %}
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
{% if data.activityInfo.isOwner == '1' %}
<div class="discovery-activity-handle">
    <a class="activity-inten" href="javascript:void (0)"><div class="discovery-activity-intention">已报名的人({{ data.activityInfo.signPeopleCount }}) <i class="icon-arrow"></i></div></a>
    <a class="discovery-activity-edit" href="javascript:void (0)">编辑</a>
</div>
{% else %}
{% if data.activityInfo.isOver == '0' %}
<div class="discovery-activity-handle fix">
    <a class="discovery-activity-send" href="javascript:void (0)"><p>报名</p></a>
</div>
{% endif %}
{% endif %}