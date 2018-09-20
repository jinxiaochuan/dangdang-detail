<div>
    <!-- 未删除 （管理员 或 发布人 或 成员）-->
    <div v-if="work && work.isDelete == 0">
        <div v-if="!((isAdmin == 0 && work.user.userId != userId && work.isFreeze == 1) || (isAdmin == 0 && work.user.userId != userId && work.isFreeze == 0 && work.status == 2))" class="work-detail-wrap">
            <div class="hr">
                <div class="avatar" :class="{'app-btn' : source == 1}" @click="tapUser">
                    <img :src="work.user.userImage" alt="">
                </div>
                <span class="hr-name" :class="{'app-btn' : source == 1}" @click="tapUser">{{ work.user.showName }}</span>
                <span class="hr-position" @click="tapPosition">{{ work.userWorkExperience && work.userWorkExperience.jobPosition || work.userJob }}</span>
            </div>
            <div class="position">
                <div class="position-name">
                    <span class="name">{{ work.jobTitle }}</span>
                    <span class="salary">{{ work.salary }}</span>
                </div>

                <div class="position-criteria">
                    <div class="position-item industry">
                        {{ work.tradeName }} - {{ work.jobCategoryName }}
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

                    <!-- 张玉佳撰写部分 --------------------------------------------------->
                    <div class="desc" v-if="typeof(work.companyDesc)!= 'undefined'">
                        <pre v-html="handleDesc(work.companyDesc, 'company')"></pre>
                        <!-- <pre v-html="handleDesc('的快递反馈到福建安防科技阿拉解放军阿拉法减肥的开发贷款福农卡发了附加按类似飞机加十分理解啊沙发发沙发沙发发啊沙发沙发沙发沙发沙发沙发沙发发发发的快递反馈到福建安防科技阿拉解放军阿拉法减肥的开发贷款福农卡发了附加按类似飞机加十分理解啊沙发发沙发沙发发啊沙发沙发沙发沙发沙发沙发沙发发发发顺丰案例fdfdf耷拉了沙发沙发方法是犯法沙发沙发沙发发发发发按时发发发沙发沙发沙发沙发沙发是飞洒发沙发沙发沙发发沙的快递反馈到福建安防科技阿拉解放军阿拉法减肥的开发贷款福农卡发了附加按类似飞机加十分理解啊沙发发沙发沙发发啊沙发沙发沙发沙发沙发沙发沙发发发发顺丰案例fdfdf耷拉了沙发沙发方法是犯法沙发沙发沙发发发发发按时发发发沙发沙发沙发沙发沙发是飞洒发沙发沙发沙发发沙的快递反馈到福建安防科技阿拉解放军阿拉法减肥的开发贷款福农卡发了附加按类似飞机加十分理解啊沙发发沙发沙发发啊沙发沙发沙发沙发沙发沙发沙发发发发顺丰案例fdfdf耷拉了沙发沙发方法是犯法沙发沙发沙发发发发发按时发发发沙发沙发沙发沙发沙发是飞洒发沙发沙发沙发发沙顺丰案例fdfdf耷拉了沙发沙发方法是犯法沙发沙发沙发发发发发按时发发发沙发沙发沙发沙发沙发是飞洒发沙发沙发沙发发沙发沙发沙发沙发沙发沙发沙发沙发沙发', 'company' )"></pre> -->
                        <span v-if="isViewAllForCompanyDesc && viewAllStatusForCompanyDesc" @click="togView('company')" class="view-all">查看全部</span>
                        <span v-if="isViewAllForCompanyDesc && !viewAllStatusForCompanyDesc" @click="togView('company')" class="view-all">收起</span>
                    </div>

                    <!-- ----------------------------------------------------------------->

                    <div v-if="work.pvList && work.pvList.length" class="company-album">
                        <div class="album-list" :style="{width: 204/75*work.pvList.length + 18/75 + 'rem'}">
                            <div v-for="(item, index) in work.pvList" :style="{backgroundImage: 'url('+ item.pictureUrl +')'}" @click="tapPV(index)" class="album-item" >
                                <i v-if="item.videoUrl" class="video-icon"></i>
                                <i v-if="item.videoUrl" class="video-duration">{{ item.duration | formatTime }}</i>
                                <img :src="item.pictureUrl" alt="">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 张玉佳撰写部分 ---------------------------------------------------------------------------->
            <div class="related-publc-circle app-btn" v-if="work.bindingCircleId != 0" @click="tapCircle">
                <span class="title">相关公众圈</span>
                <a href="javascript:void(0)" class="narrow-right">
                    <img :src="work.bindingCircleImage" alt="">
                    <!-- <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1235322943,3911552157&fm=27&gp=0.jpg"> -->
                </a>
            </div>
            <!--------------------------------------------------------------------------------------------->

            <div class="position-address">
                <span class="title">工作地址</span>
                <div class="company-location">
                    <span @click="tapAMap" class="company-address app-btn">{{ work.location.name }}</span>
                </div>
            </div>

            <div class="position-desc">
                <span class="title">职位描述</span>
                <div class="desc">
                    <pre v-html="handleDesc(work.jobDesc, 'position')"></pre>
                    <span v-if="isViewAllForPositionDesc && viewAllStatusForPositionDesc" @click="togView('position')" class="view-all">查看全部</span>
                    <span v-if="isViewAllForPositionDesc && !viewAllStatusForPositionDesc" @click="togView('position')" class="view-all">收起</span>
                </div>
            </div>

            <div v-if="work.email" class="position-concat">
                <span class="title">简历投递邮箱</span>
                <div class="concat-email">
                    <span v-longTouch="handleLongTouch" class="email">{{ work.email }}</span>
                    <span>(长按复制)</span>
                </div>
            </div>
            <div class="position-handle">
                <div class="publish-offline">
                    <span class="time">
                        {{ work.formatPublishTime }}
                    </span>
                    <span v-if="isAdmin == 1 || work.user.userId == userId" class="handle-publish-offline">
                        <span v-if="work.isFreeze == 0 && work.status == 2" class="offline-status">已下线</span>
                        <span v-if="work.isFreeze == 1" class="prohibite-status">已封禁</span>
                        <!-- 只有发布人 -->
                        <span v-if="isAdmin == 0 && work.user.userId == userId && source == 0">
                            <a v-if="work.status == 1 && work.isFreeze == 0" @click="tapOffLine" class="offline" href="javascript:void(0)">下线</a>
                            <a v-else class="publish" @click="tapPublish" href="javascript:void(0)">重新发布</a>
                        </span>
                    </span>
                </div>
                <!-- 只有发布人 -->
                <div v-if="isAdmin == 0 && work.user.userId == userId && source == 0" class="edit-delete">
                    <a @click="tapEdit" class="edit" href="javascript:void(0)">编辑</a>
                    <a @click="tapDel" class="delete" href="javascript:void(0)">删除</a>
                </div>
            </div>
        </div>
    </div>
    <!-- 已删除 -->
    <div v-if="work && work.isDelete == 1" class="work-prompt-wrap">
        <span>该职位已删除</span>
    </div>
    <!-- 已封禁 -->
    <div v-if="work && work.isDelete == 0 && isAdmin == 0 && work.user.userId != userId && work.isFreeze == 1" class="work-prompt-wrap">
        <span>该职位已封禁</span>
    </div>
    <!-- 已下线（非发布人，非管理员） -->
    <div v-if="work && work.isDelete == 0 && isAdmin == 0 && work.user.userId != userId && work.isFreeze == 0 && work.status == 2" class="work-prompt-wrap">
        <span>该职位已下线</span>
    </div>
    <!-- 服务器错误信息 -->
    <div v-if="msg" class="work-error-wrap">
        <err :msg="msg"></err>
    </div>
</div>
