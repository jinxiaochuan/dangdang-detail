{% if data.totalNum != 0 %}
<div class="reply-detail">
    <p class="reply-num">{{ data.totalNum }}</p>
    <div class="reply-list-wrap">
        <ul class="reply-list">
            {% for item in data.replyList %}
            <li class="reply-item">
                <img class="reply-avatar" src="{{ item.fromUserImage }}" alt=""/>
                <div class="reply-info">
                    <p class="info-nick">{{ item.fromShowName }} <span class="info-time">{{ item.createTime }}</span></p>
                    <p class="info-content">{% if item.toShowName %}回复 <span class="info-nick">{{ item.toShowName }}</span> ：{% endif %}{{ item.replyContent }}</p>
                </div>
            </li>
            {% endfor %}
        </ul>
    </div>
</div>
{% endif %}