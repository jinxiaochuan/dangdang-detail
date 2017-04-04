<img src="{{ data.album.coverUrl }}" alt=""/>
<div class="content-container">
    <div class="content content-outline">{{ data.album.albumDesc }}</div>
    {% if data.album.albumDesc.split('').length >120 %}
    <a class="slide-down-btn" href="javascript:void (0)">全文</a>
    {% endif %}
</div>
{% for item in data.album.pictureList %}
<img src="{{ item.pictureUrl }}" alt=""/>
{% endfor %}
