<div>
    <div v-if="!msg" class="fans-wrap">
        <div class="fans-header">
            <div class="fans-time">
                剩余<span>{{ remainingTime }}</span>天
            </div>
        </div>
        <div class="fans-support-list">
            <div class="support-title"></div>
            <div class="support-list">
                <div v-for="(item, index) in circleList" class="support-item clearfix">
                    <div class="support-left">
                        <div class="avatar">
                            <img :src="item.logoImage" alt="">
                            <i class="rank" :class="{'small': index > 8}">{{ index + 1 }}</i>
                        </div>
                        <div class="supporter">
                            <p class="name">{{ item.circleName }}</p>
                            <p class="reward">
                                <span v-if="item.award1 && !item.award2">已点亮 铛铛开屏</span>
                                <span v-if="item.award1 && item.award2">已点亮 铛铛开屏 | 三里屯户外大屏</span>
                            </p>
                        </div>
                    </div>
                    <div class="active-member">
                        <p class="active">{{ item.num }}</p>
                        <p class="member">有效成员</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="fans-mode">
            <div class="time">
                <span>{{ startTime }} - {{ endTime }}</span>
            </div>
            <div class="rule">

            </div>
            <div class="mode">

            </div>
        </div>
        <div class="fans-footer">
            本次活动解释权归铛铛信息科技（北京）有限公司所有
        </div>
    </div>
    <div v-if="msg" class="house-error-wrap">
        <err :msg="msg"></err>
    </div>
</div>
