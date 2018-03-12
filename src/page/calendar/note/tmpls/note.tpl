<div v-if="noteInfo" class="calendar-note-wrap">

    <div class="calendar-note-top">
        <div class="note-time">
            <span class="day">{{ noteInfo.createTime | time_convert | key_covert('day') }}</span>
            <span class="mouth">{{ noteInfo.createTime | time_convert | key_covert('mouth') }}月</span>
            <span v-if="!isSameYear" class="year">{{ noteInfo.createTime | time_convert | key_covert('year') }}年</span>
            <span class="week">{{ noteInfo.createTime | time_convert | key_covert('week') }}</span>
            <span class="time">{{ noteInfo.createTime | time_convert | key_covert('hour') }}:{{ noteInfo.createTime | time_convert | key_covert('minute') }}</span>
        </div>
        <div class="note-weather">

        </div>
    </div>

    <div class="calendar-note-middle">
        <div v-html="noteContent" class="note-content">

        </div>
    </div>

    <div class="calendar-note-bottom">
        <p v-if="noteInfo.formatStartTime && noteInfo.formatEndTime" class="time"><span>{{ noteInfo.formatStartTime }} - {{ noteInfo.formatEndTime }}</span></p>
        <p v-if="noteInfo.formatRemindTime" class="remind-time"><span>{{ noteInfo.formatRemindTime }}</span></p>
        <p v-if="noteInfo.formatUpdateTime" class="update-time">{{ noteInfo.formatUpdateTime }}</p>
    </div>



</div>

<div v-else class="calendar-note-error-wrap">
    <span v-text="errorMsg"></span>
</div>
