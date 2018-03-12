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
        <span v-if="noteInfo.formatStartTime && noteInfo.formatEndTime" class="time"><i class="time-icon"></i><span>{{ noteInfo.formatStartTime }} - {{ noteInfo.formatEndTime }}</span></span>
        <span v-if="noteInfo.formatRemindTime" class="remind-time"><i class="remind-time-icon"></i><span>{{ noteInfo.formatRemindTime }}</span></span>
        <span v-if="noteInfo.formatUpdateTime" class="update-time">{{ noteInfo.formatUpdateTime }}</span>
    </div>

</div>
