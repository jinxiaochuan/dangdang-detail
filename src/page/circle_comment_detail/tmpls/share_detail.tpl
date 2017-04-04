{% if data.totalNum != 0 %}
<div class="share-detail">
    <p class="share-num">{{ data.totalNum }}</p>
    <div class="share-icon-container clearfix">
        {% for item in data.shareList %}
        <img class="more-image" src="{{ item.userImageUrl }}" alt=""/>
        {% endfor %}
    </div>
</div>
{% endif %}