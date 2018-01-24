<div class="lotto-red-envelope-wrap">
    <div class="envelope-top">

    </div>
    <div class="envelope-detail">
        <div class="avatar">
            <img :src="record && record.userImage" alt="">
        </div>
        <span class="name">{{ record && record.userName }}</span>
        <span class="num">已领取了{{ record && record.showNo }}号红包</span>
        <span v-if="record && record.hbType == 0" class="cash-wrap">
            <span class="cash-amount"><span class="amount-num">{{ record && record.amount|amount_convert }}</span>元</span>
            <span class="cash-prize">{{ record && record.prizeName }}</span>
        </span>
        <span v-if="record && record.hbType == 1" class="material-wrap">
            <span class="material-name">{{ record && record.materialName }}</span>
            <span v-if="record && record.materialImage" class="material-img"><img :src="record && record.materialImage" alt=""></span>
            <span class="material-prize">{{ record && record.prizeName }}</span>
        </span>
        <a :href="record && record.openUrl + '&source=1'" class="sponsor"><span>{{ record && record.title }}</span> <i class="triangle"></i></a>
    </div>
    <div v-if="record && record.drawImage" class="envelope-star">
        <div class="avatar-wrap">
            <div class="star avatar">
                <img :src="record && record.drawImage" alt="">
            </div>
            <div class="user avatar">
                <img :src="record && record.userImage" alt="">
            </div>
        </div>
        <div class="envelope-word">
            {{ record && record.drawSlogan }}
        </div>
        <div class="envelope-code">
            <span class="word">我的邀请码</span>
            <span class="code">{{ record && record.code }}</span>
        </div>
    </div>
    <div v-else class="envelope-card">
        <span class="code">{{ record && record.code }}</span>
        <span class="word">我的邀请码</span>
    </div>
</div>
