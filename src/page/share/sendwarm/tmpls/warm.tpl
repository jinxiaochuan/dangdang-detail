<div class="warm-wrap">
	<div class="warm-top">
		<div class="dd-logo"></div>
	</div>
	<div class="warm-content">
		<p class="prag_01">
			{% if source != 1 %}
			铛铛送温暖啦
			{% endif %}
		</p>
		<p class="prag_02">寒冷的冬日，送上一份温暖<br>铛铛用户可以在写字楼、住宅、商业等场所的合作点</p>
		<p class="prag_03">领取1份 早餐/热饮/水果/优惠</p>
		<div class="small-img">
			<div class="hot_dog"></div>
			<div class="coffee"></div>
			<div class="fruits"></div>
			<div class="money"></div>
		</div>
		<p class="prag_04">铛铛致力于开放社交平台建设，遵循 “开放、隐私、平等、个体 ”矛盾统一的基础理念，搭建多彩的社交世界</p><br>
		<p class="prag_04">在铛铛，遇见老朋友，结识新朋友；朋友多了，路好走，人生也会更温暖…</p>
		<p class="prag_04">让我们一起建设更美好，更温暖的网上世界</p><br>
		{% if source != 1 %}
		<div class="warm-bottom">
			<a class="share_button">分享温暖至朋友圈</a>
			<div class="warm_count">你是第<span class="num">{{data.userTotalNum}}</span>位分享温暖的人</div>
		</div>
		{% else %}
        <div class="warm_info">
			<div class="photo-wrap">
				<img src="{{data.userImage}}" alt="" class="photo">
			</div>
        	<span class="name">{{data.showName}}</span>
        	<p class="data">我是第<span class="num">{{data.userTotalNum}}</span>位分享温暖的人，加入我们，一起接力，共同送出100万份温暖。</p>
			{% if !data.shopName %}
			<div class="address">
				<p class="word-wrap"><i class="fubao"></i><span class="word">领取温暖点：{{data.shopName}}</span></p>
			</div>
			{% endif %}
			{% if !relay %}
			<p class="relay"><a href="{{link}}">接力送温暖</a></p>
			{% endif %}
        </div>
        {%endif%}
	</div>
</div>
