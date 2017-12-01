<div class="warm-new-wrap">
	<div class="warm-content">
        <p class="warm-word">感谢你注册铛铛，登录铛铛世界…</p>
        <p class="warm-word">铛铛社交研发工作历时四年，熬走三拨队伍，创造了国内移动互联网史上产品研发最长时间记录</p>
        <p class="warm-word">四年研发，核心成员度过了无数个无眠的夜晚，反复革命昨天的想法；这一路煎熬，也收获了许多对人性个体和现实世界的探索与思考</p>
        <p class="warm-word">铛铛社交，遇见世界；一起携手，共建美好铛铛世界！</p>
		{% if source != 1 %}
		<div class="warm-bottom">
			<a class="share_button" href="javascript:void(0)">分享至朋友圈</a>
            <a class="done_button" href="javascript:void(0)">完成</a>
		</div>
		{% else %}
        <div class="warm_info">
			<div class="photo-wrap">
				<img src="{{data.userImage}}" alt="" class="photo">
			</div>
			<div class="info-wrap">
				<span class="name">{{data.showName}}</span>
				<p class="data">我是第<span class="num">{{data.userTotalNum}}</span>位分享铛铛的人，加入我们，一起携手，共建美好铛铛世界！</p>
			</div>
			<p class="relay"><a href="{{link}}">接力分享</a></p>
        </div>
        {%endif%}
	</div>
</div>
