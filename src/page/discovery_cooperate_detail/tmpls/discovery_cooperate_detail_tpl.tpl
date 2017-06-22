<div class="cooperation-header">
    <a class="cooperation-avatar" href="javascript:void (0)"><img class="avatar" src="{{ data.userImage }}" alt=""/></a>
    <div class="cooperation-detail-wrap">
        <p class="name"><a class="cooperation-name" href="javascript:void (0)">{{ data.userShowName }}</a></p>
        <p class="content"><span class="time">{{ data.tradeName }}</span><span class="address">{{ data.provinceName }}{% if data.cityId != 0 %} {{ data.cityName }}{% endif %} {{ data.detailAddress }}</span></p>
    </div>
    <span class="address-tem">{{ data.provinceName }}{% if data.cityId != 0 %} {{ data.cityName }}{% endif %} {{ data.detailAddress }}</span>
</div>
<p class="cooperation-title">{{ data.title }}</p>
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
<div class="cooperation-content">
    <p>{{ data.detailContent }}</p>
    {% if data.detailImageList %}
    {% for item in data.detailImageList %}
    <img src="{{ item.pictureUrl }}" alt=""/>
    {% endfor %}
    {% endif %}

    <p class="address"><a class="cooperation-address" href="javascript:void (0)">{{ (data.location|json_parse).name }}</a></p>
    <p class="time">{{ data.formatCreateTime }}
        {% if data.showAccess == 1 %}
        <a class="cooperation-show-access" href="javascript:void (0)"><i class="only-friend"></i></a>
        {% elseif data.showAccess == 2 || data.showAccess == 3 %}
        <a class="cooperation-show-access" href="javascript:void (0)"><i class="part"></i></a>
        {% else %}
        {% endif %}

      {% if data.isFinished == '1' %}
      <span class="timeout">已结束</span>
      {% endif %}</p>
</div>
<div class="cooperation-end clearfix">
    <span class="deadline">发意向截止：{{ data.formatDeadline }}</span>
</div>

{% if data.isOwner == '1' %}
<div class="cooperation-handle">
    <div class="cooperation-intention"><a class="cooperation-inten" href="javascript:void (0)">有意向的人（{{ data.coopMemberCount }}）<i class="icon-arrow"></i></a></div>
    <a class="cooperation-edit" href="javascript:void (0)">编辑</a>
</div>
{% else %}
<div class="cooperation-handle">
    {% if !data.applyStatus %}
    <a class="cooperation-send {% if data.isCanSignUp == '0' %}disabled{% endif %}" href="javascript:void (0)">发意向</a>
    {% else %}
    <a class="cooperation-communicate" href="javascript:void (0)">沟通</a>
    {% endif %}
</div>
{% endif %}

{% if data.review || data.reviewImageList %}
<div class="cooperation-review">
    <p class="review-title">回顾</p>
    <div class="review-content">
        <p>{{ data.review }}</p>
        {% if data.reviewImageList %}
        {% for item in data.reviewImageList %}
        <img src="{{ item.pictureUrl }}" alt=""/>
        {% endfor %}
        {% endif %}
    </div>
</div>
{% endif %}
