<div class="circle-index-wrap">
    <div class="index-header">
        <div class="avatar tap-avatar app-btn">
            <img src="{{ data.baseInfo.circleLogo.pictureUrl }}" alt="">
        </div>
        <h2 class="name app-btn">{{ data.baseInfo.circleName }}</h2>
        {% if data.baseInfo.accountNum %}
        <span class="code">铛铛号：{{ data.baseInfo.accountNum }}</span>
        {% endif %}
    </div>
    <div class="index-intro">
        {{ data.baseInfo.summary|safe }}
    </div>
    <div class="index-handle">
        {% if data.baseInfo.tags.length %}
        <div class="handle-item-outer handle-item-label">
            <div class="handle-item app-btn">
                <span class="item-label">标签</span>
                <span class="item-name">
                    {{ data.baseInfo.tags.join(',') }}
                </span>
            </div>
        </div>
        {% endif %}
        <div class="handle-item-outer handle-item-account">
            <div class="handle-item app-btn">
                <span class="item-label">帐号主体</span>
                <span class="item-name {% if data.baseInfo.isV == 1 %}vip{% endif %}">
                    {% if data.baseInfo.isV == 1 %}
                    <i class="vip"></i>
                    {% endif %}
                    {% if data.baseInfo.circleType == 1 %}个人{% elseif data.baseInfo.circleType == 2 %}{% if data.baseInfo.isV == 1 %}{{ data.baseInfo.officialName }}{% else %}企业{% endif %}{% elseif data.baseInfo.circleType == 3 %}{% if data.baseInfo.isV == 1 %}{{ data.baseInfo.officialName }}{% else %}组织{% endif %}{% else %}{% endif %}
                </span>
            </div>
        </div>
        {% if data.baseInfo.location != '{}' && data.baseInfo.longitude != '0.0' && data.baseInfo.latitude != '0.0' %}
        <div class="handle-item-outer handle-item-location">
            <div class="handle-item app-btn">
                <span class="item-label">所在位置</span>
                <span class="item-name">
                    {{ (data.baseInfo.location|json_parse).name }}
                </span>
            </div>
        </div>
        {% endif %}
        <div class="handle-item-outer handle-item-public">
            <div class="handle-item app-btn">
                <span class="item-label">查看公开内容</span>
                <span class="item-name"></span>
            </div>
        </div>
    </div>
    {% if data.source %}
    <div class="index-enter">
        <a class="index-home app-btn" href="javascript:void(0)"><span>加入公众圈</span></a>
    </div>
    {% else %}
    <div class="index-enter">
        <a class="index-home {% if data.baseInfo.memberType != 4 %}enter-home{% endif %}" href="javascript:void(0)"><span>{% if data.baseInfo.memberType == 4 %}加入公众圈{% else %}进入公众圈{% endif %}</span></a>
    </div>
    {% endif %}
</div>
