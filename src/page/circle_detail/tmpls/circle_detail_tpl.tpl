<div class="circle-header">
    {% if data.baseInfo.circleLogo.pictureUrl %}
    <img class="circle-avatar" src="{{ data.baseInfo.circleLogo.pictureUrl }}" alt=""/>
    {% endif %}

</div>
<div class="circle-detail-container">
    <p class="circle-info">{% if data.baseInfo.isOfficial %}<i class="official-icon"></i>{% endif %}{% if data.baseInfo.isAuthority %}<i class="author-icon"></i>{% endif %}{% if data.baseInfo.accountNum %}铛铛号: {{ data.baseInfo.accountNum }}{% endif %}</p>
    <div class="circle-content-wrap">
        {% if data.baseInfo.summary %}
        <p class="circle-content">{{ data.baseInfo.summary }}</p>
        {% endif %}

        {% if data.baseInfo.summaryImages %}
        {% for item in data.baseInfo.summaryImages %}
        <img src="{{ item.pictureUrl }}" alt=""/>
        {% endfor %}
        {% endif %}
    </div>
</div>