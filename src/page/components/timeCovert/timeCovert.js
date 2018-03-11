var moment = require('moment');

var WEEK = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
function TimeCovert (timeStamp) {
    var timeStamp = timeStamp * 1000;
    if(!moment(timeStamp).isValid()) return

    var year = moment(timeStamp).format('YYYY');
    var day = moment(timeStamp).format('D');
    var mouth = moment(timeStamp).format('M');

    var hour = moment(timeStamp).format('HH');
    var minute = moment(timeStamp).format('mm');
    var second = moment(timeStamp).format('ss');

    var week = moment(timeStamp).format('e');

    var nowYear = moment().format('YYYY');
    return {
        isSameYear: year === nowYear,
        year: year,
        day: day,
        mouth: mouth,
        hour: hour,
        minute: minute,
        second: second,
        week: WEEK[week - 1]
    }
}

module.exports = TimeCovert;
