<div v-if="diary" class="calendar-diary-wrap">

    <div class="calendar-diary-top">
        <div class="diary-time">
            <span class="day">{{ diary.diaryTime | time_convert | key_covert('day') }}</span>
            <span class="mouth">{{ diary.diaryTime | time_convert | key_covert('mouth') }}月</span>
            <span v-if="!isSameYear" class="year">{{ diary.diaryTime | time_convert | key_covert('year') }}年</span>
            <span class="week">{{ diary.diaryTime | time_convert | key_covert('week') }}</span>
            <span class="time">{{ diary.diaryTime | time_convert | key_covert('hour') }}:{{ diary.diaryTime | time_convert | key_covert('minute') }}</span>
        </div>
        <div class="diary-weather">
            <i class="weather-icon" v-bind:class="'weather-' + diary.weather.nowCondCode"></i>
            <span class="weather">{{ diary.weather.nowCond }}</span>
        </div>
    </div>

    <div class="calendar-diary-middle">
        <div v-html="diaryContent" class="diary-content">

        </div>
    </div>

    <div class="calendar-diary-bottom">
        <span v-if="diary.location" class="location">{{ diary.location | json_covert('name') }}</span>
        <span v-if="diary.formatUpdateTime" class="update-time" v-text="diary.formatUpdateTime"></span>
    </div>

</div>
