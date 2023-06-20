import dayjs from "dayjs";
export function getymdhms(time) {
    return dayjs(time).format("YYYY-MM-DD HH:mm:ss")
}
export function getymd(time) {
    return dayjs(time).format("YY.MM.DD")
}
export function getmonth(time) {
    return dayjs(time).format("YY.MM")
}
export function getymdhmsnew(time) {
    let newtime = [];
    time.forEach((v) => {
        let t = new Date(v)
        let Y = t.getFullYear()
        let M = t.getMonth() + 1
        let D = t.getDate()
        let h = t.getHours()
        let m = t.getMinutes()
        let s = t.getSeconds()
        newtime.push([Y, M, D].map((v) => v < 10 ? '0' + v : v).join('/') + ' ' + [h, m, s].map((v) => v < 10 ? '0' + v : v).join(':'))
    });
    return newtime
}