{% if data.totalNum != 0 %}
<div class="praise-detail">
    <p class="praise-num">{{ data.totalNum }}</p>
    <div class="praise-icon-container clearfix">
        {% for item in data.zanList %}
        <img class="more-image" src="{{ item.userImageUrl }}" alt=""/>
        {% endfor %}
    </div>
</div>
{% endif %}