<div class="square-header clearfix">
    <img class="avatar" src="{{ data.info.userImageUrl }}" alt=""/>
    <div class="square-detail-wrap">
        <p class="name">{{ data.info.userName }}</p>
        <p class="content content-outline">{{ data.info.content }}</p>
        {% if data.info.content.split('').length > 120 %}
        <a class="slide-down-btn" href="javascript:void (0)">全文</a>
        {% endif %}
        <div class="album-container">
            {% if data.info.pictureList.length == 1 %}
            <div class="single-container">
                <img class="single-image" src="{{ data.info.pictureList[0].pictureUrl }}" alt=""/>
            </div>
            {% elseif data.info.pictureList.length > 1 %}
                {% if data.info.pictureList.length == 4 %}
            <div class="more-container four-more-container clearfix">
                {% for item in data.info.pictureList %}
                <img class="more-image" src="{{ item.pictureUrl }}" alt=""/>
                {% endfor %}
            </div>
                {% else %}
            <div class="more-container clearfix">
                {% for item in data.info.pictureList %}
                <img class="more-image" src="{{ item.pictureUrl }}" alt=""/>
                {% endfor %}
            </div>
                {% endif %}
            {% else %}
            {% endif %}
        </div>
        {% if data.info.shareInfo %}
        <div class="share-link-container">
            <a class="clearfix" href="javascript:void (0)">
                <img class="share-link-avatar" src="{{ data.info.shareInfo.shareImage }}" alt=""/>
                <p class="share-link-content">{{ data.info.shareInfo.shareTitle }}</p>
            </a>
        </div>
        {% endif %}

        {% if data.info.location %}
        <p class="square-address">{{ data.info.location }}</p>
        {% endif %}
        <p class="square-time">{{ data.info.createTime }} <i class="spread-icon"></i></p>
    </div>
</div>