<div class="invite-avatar">
    <img src="{{ data.headImage.pictureUrl }}" alt="">
</div>
<div class="invite-name">
    <span class="name">{{ data.showName }}</span>
    <div class="word">
        {% if data.userAccount %}
        <span>我在铛铛社交，搜索铛铛号：{{ data.userAccount }}，添加我成为朋友</span>
        {% else %}
        <span>我在铛铛社交，搜索手机号：{{ data.userPhone }}，添加我成为朋友</span>
        {% endif %}
        <i class="pop-arrow"></i>
    </div>
</div>
{% if data.friendCode && data.userBonus %}
<div class="invite-friend app-btn">
    <span class="friend-code">下载注册铛铛，使用我的朋友码{{ data.friendCode }},</span>
    <span class="friend-money">双方均可获得{{ data.userBonus }}元现金红包</span>
</div>
{% endif %}
