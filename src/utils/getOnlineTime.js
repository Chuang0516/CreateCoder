export default (period) => {
    var yearLevelValue = 365 * 24 * 60 * 60 * 1000;
    var monthLevelValue = 30 * 24 * 60 * 60 * 1000;
    var dayLevelValue = 24 * 60 * 60 * 1000;
    var hourLevelValue = 60 * 60 * 1000;
    var minuteLevelValue = 60 * 1000;
    var secondLevelValue = 1000;

    function getDifference(period) {
        const year = parseInt(getYear(period));
        const month = parseInt(getMonth(period - year * yearLevelValue));
        const day = parseInt(getDay(period - year * yearLevelValue - month * monthLevelValue));
        const hour = parseInt(getHour(period - year * yearLevelValue - month * monthLevelValue - day * dayLevelValue));
        const minute = parseInt(getMinute(period - year * yearLevelValue - month * monthLevelValue - day * dayLevelValue - hour * hourLevelValue));
        // const second = parseInt(getSecond(period - year * yearLevelValue - month * monthLevelValue - day * dayLevelValue - hour * hourLevelValue - minute * minuteLevelValue));

        let timeArr = `${year}:${month}:${day}:${hour}:${minute}`.split(':')

        let result = ''

        timeArr.forEach((item, index) => {
            if (item != 0) {
                let flag = ''
                switch (index) {
                    case 0: flag = '年'; break;
                    case 1: flag = '月'; break;
                    case 2: flag = '天'; break;
                    case 3: flag = '时'; break;
                    case 4: flag = '分'; break;
                    // case 5: flag = '秒'; break;
                }
                result = result + item + flag
            }
        })

        console.log(result)

        function getYear(period) {
            return Math.floor(parseInt(period) / yearLevelValue);
        }
        function getMonth(period) {
            return Math.floor(parseInt(period) / monthLevelValue);
        }
        function getDay(period) {
            return Math.floor(parseInt(period) / dayLevelValue);
        }
        function getHour(period) {
            return Math.floor(parseInt(period) / hourLevelValue);
        }
        function getMinute(period) {
            return Math.floor(parseInt(period) / minuteLevelValue);
        }
        function getSecond(period) {
            return Math.floor(parseInt(period) / secondLevelValue);
        }
        return result;
    }
    return getDifference(period);
}