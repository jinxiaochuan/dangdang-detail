<div class="vote-wrap">
    <div class="vote-search">
        <i class="search-icon"></i>
        <form class="form-search" onsubmit="return false">
            <input @input="search" type="search" name="keyword" placeholder="搜索" v-model="keyword" autocomplete="off">
        </form>
    </div>
    <div v-if="options.length" class="vote-main">
        <div class="vote-title">
            <span class="title">{{ title }}</span>
            <span v-if="selectType == 1">(单选)</span>
            <span v-if="selectType == 2">(多选)</span>
        </div>
        <div class="vote-options">
            <div @click="active(index)" ref="voteItem" v-for="(item, index) in options" :data-id="item.id" class="vote-options-item">
                <!-- 纯文本 -->
                <div v-if="!item.video && !item.pictures.length" class="options-item options-item-text">
                    <div class="options-detail">
                        <span v-if="!item.userNum && !item.ratio && selectType == 1" class="sel-wrap single-sel"><i class="no-sel"></i><i class="sel"></i></span>
                        <span v-if="!item.userNum && !item.ratio && selectType == 2" class="sel-wrap multi-sel"><i class="no-sel"></i><i class="sel"></i></span>
                        <span class="desc"><span v-html="hightlight(item.itemName)"></span><span v-if="isAdmin != 1 && isHasVoted(item.id)">(已选)</span></span>
                    </div>
                    <div v-if="isAdmin == 1 && item.userNum && item.ratio" class="vote-statistics">
                        <div class="process">
                            <div class="process-thumb" :style="{'width': item.ratio*100 + '%'}">

                            </div>
                        </div>
                        <div class="statistics">
                            <span class="num">{{ item.userNum }}票</span>
                            <span class="percent">{{ item.ratio*100 }}%</span>
                        </div>
                    </div>
                </div>
                <!-- 图片 -->
                <div v-if="item.pictures.length" class="options-item options-item-images">
                    <div class="options-detail">
                        <span v-if="!item.userNum && !item.ratio && selectType == 1" class="sel-wrap single-sel"><i class="no-sel"></i><i class="sel"></i></span>
                        <span v-if="!item.userNum && !item.ratio && selectType == 2" class="sel-wrap multi-sel"><i class="no-sel"></i><i class="sel"></i></span>
                        <div class="images-cover">
                            <span class="images-num">共{{ item.pictures.length }}张</span>
                            <img :src="item.pictures[0].pictureUrl" alt="">
                        </div>
                        <span class="desc"><span v-html="hightlight(item.itemName)"></span><span v-if="isAdmin != 1 && isHasVoted(item.id)">(已选)</span></span>
                    </div>
                    <div v-if="isAdmin == 1 && item.userNum && item.ratio" class="vote-statistics">
                        <div class="process">
                            <div class="process-thumb" :style="{'width': item.ratio*100 + '%'}">

                            </div>
                        </div>
                        <div class="statistics">
                            <span class="num">{{ item.userNum }}票</span>
                            <span class="percent">{{ item.ratio*100 }}%</span>
                        </div>
                    </div>
                </div>
                <!-- 视频 -->
                <div v-if="item.video" class="options-item options-item-video">
                    <div class="options-detail">
                        <span v-if="!item.userNum && !item.ratio && selectType == 1" class="sel-wrap single-sel"><i class="no-sel"></i><i class="sel"></i></span>
                        <span v-if="!item.userNum && !item.ratio && selectType == 2" class="sel-wrap multi-sel"><i class="no-sel"></i><i class="sel"></i></span>
                        <div class="video-cover">
                            <i class="video-icon"></i>
                            <img :src="item.video.pictureUrl" alt="">
                        </div>
                        <span class="desc"><span v-html="hightlight(item.itemName)"></span><span v-if="isAdmin != 1 && isHasVoted(item.id)">(已选)</span></span>
                    </div>
                    <div v-if="isAdmin == 1 && item.userNum && item.ratio" class="vote-statistics">
                        <div class="process">
                            <div class="process-thumb" :style="{'width': item.ratio*100 + '%'}">

                            </div>
                        </div>
                        <div class="statistics">
                            <span class="num">{{ item.userNum }}票</span>
                            <span class="percent">{{ item.ratio*100 }}%</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <div v-if="!options.length && bottom == 1" class="vote-main-empty">
        <span>无结果</span>
    </div>
    <div v-if="isAdmin != 1 && isFinished && isVoted" @click="vote" class="vote-handle-wrap" :class="{'disabled': isFinished == 1 || isVoted == 1}">
        <span v-if="isFinished == 0 && isVoted == 0">投票</span>
        <span v-if="isFinished == 1">投票已截止</span>
        <span v-if="isFinished == 0 && isVoted == 1">你已投票</span>
    </div>
    <scroll v-on:onBottom="onBottom"></scroll>
</div>
