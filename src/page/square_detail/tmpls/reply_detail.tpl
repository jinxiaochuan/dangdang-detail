{% if data.totalNum != 0 %}
<div class="reply-detail">
    <p class="reply-num">{{ data.totalNum }}</p>
    <div class="reply-list-wrap">
        <ul class="reply-list">
            {% for item in data.commentList %}
            <li class="reply-item">
                <img class="reply-avatar" src="{{ item.fromUserImageUrl }}" alt=""/>
                <div class="reply-info">
                    <p class="info-nick">{{ item.fromUserName }} <span class="info-time">{{ item.createTime }}</span></p>
                    <p class="info-content">{% if item.toUserName %}回复 <span class="info-nick">{{ item.toUserName }}</span> ：{% endif %}{{ item.commentContent }}</p>
                </div>
            </li>
            {% endfor %}
        </ul>
    </div>
</div>
{% endif %}