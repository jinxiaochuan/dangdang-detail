<div class="king-red-envelope-wrap">
    <div class="envelope-top">

    </div>
    <div v-if="record" class="envelope-detail">
        <div @click="tapUser" class="avatar">
            <img :src="record.userImage" alt="">
        </div>
        <span class="name">{{ record.userName }}</span>
        <span class="cash-wrap">
            <span class="cash-amount"><span class="amount-num">{{ record.amount|amount_convert }}</span>元</span>
        </span>
    </div>
    <div v-if="record" class="envelope-star" v-bind:style="{backgroundImage: 'url('+ recordBg +')'}">
        <div class="envelope-code">
            <span class="word">使用我的朋友，均可获得3张红包卡</span>
            <span class="code">{{ record.code }}</span>
        </div>
    </div>
</div>
