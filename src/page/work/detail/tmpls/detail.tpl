<div>
    <div v-if="work" class="work-detail-wrap">
        <div class="hr">
            <div class="avatar">
                <img :src="work.user.userImage" alt="">
            </div>
            <span class="hr-name">{{ work.user.showName }}</span>
            <span class="hr-position">({{ work.userJob }})</span>
        </div>
        <div class="position">
            <div class="position-name">
                <span class="name">{{ work.jobTitle }}</span>
                <span class="salary">{{ work.salary }}</span>
            </div>
            <div class="position-criteria">
                <div class="position-item industry">
                    {{ work.jobCategoryName }}
                </div>
                <div class="position-item experience">
                    经验{{ work.workYear }}
                </div>
                <div class="position-item education">
                    {{ work.educationBgDesc }}
                </div>
                <div class="position-item nature">
                    {{ work.jobNatureDesc }} | 招聘人数: {{ work.recruitNum }}人
                </div>
            </div>
            <div class="position-welfare">
                <div class="welfare-list clearfix">
                    <span v-for="item in work.welfare" class="welfare-item">{{ item }}</span>
                </div>
            </div>
            <div class="position-company">
                <span class="company-name">{{ work.company }}</span>
                <div class="company-album">
                    <div class="album-list">
                        <div v-for="item in work.pvList" :style="{backgroundImage: 'url('+ item.pictureUrl +')'}" class="album-item" >
                            <i v-if="item.videoUrl" class="video-icon"></i>
                            <img :src="item.pictureUrl" alt="">
                        </div>
                    </div>
                </div>
                <span class="company-address">{{ work.location.address }}</span>
            </div>
        </div>
        <div class="position-desc">
            <span class="title">职位描述</span>
            <div class="desc">
                <span v-html="handleDesc(work.jobDesc)"></span>
                <span v-if="isViewAll && viewAllStatus" @click="togView" class="view-all">查看全部</span>
                <span v-if="isViewAll && !viewAllStatus" @click="togView" class="view-all">收起</span>
            </div>
        </div>
        <div class="position-concat">
            <span class="title">联系人邮箱</span>
            <div class="concat-email">
                <span v-longTouch="handleLongTouch" class="email">{{ work.email }}</span>
                <span>(长按复制)</span>
            </div>
        </div>
        <div v-if="isAdmin == 0 && work.user.userId == userId && source == 0"  class="position-handle">
            <div class="publish-offline">
                <span class="time">

                </span>
                <span class="handle-publish-offline">
                    <span v-if="work.isFreeze == 0 && work.status == 2" class="offline-status">已下线</span>
                    <span v-if="work.isFreeze == 1" class="prohibite-status">已封禁</span>
                    <a v-if="work.status == 1 && work.isFreeze == 0" @click="tapOffLine" class="offline" href="javascript:void(0)">下线</a>
                    <a v-else class="publish" @click="tapPublish" href="javascript:void(0)">重新发布</a>
                </span>
            </div>
            <div class="edit-delete">
                <a @click="tapEdit" class="edit" href="javascript:void(0)">编辑</a>
                <a @click="tapDel" class="delete" href="javascript:void(0)">删除</a>
            </div>
        </div>
    </div>
</div>
