"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTime = exports.formatDatetime = exports.formatMonth = exports.formatDate = exports.dateFormat = void 0;
function dateFormat(fmt, date) {
    var d = date;
    if (typeof d === 'string' || typeof d === 'number') {
        d = new Date(d);
    }
    var o = {
        'M+': d.getMonth() + 1,
        'd+': d.getDate(),
        'h+': d.getHours(),
        'm+': d.getMinutes(),
        's+': d.getSeconds(),
        'q+': Math.floor((d.getMonth() + 3) / 3),
        S: d.getMilliseconds(), // 毫秒
    };
    var ret = fmt;
    if (/(y+)/.test(ret)) {
        ret = ret.replace(RegExp.$1, ("".concat(d.getFullYear())).substr(4 - RegExp.$1.length));
    }
    Object.keys(o).forEach(function (k) {
        if (new RegExp("(".concat(k, ")")).test(ret)) {
            ret = ret.replace(RegExp.$1, (RegExp.$1.length === 1) ? ("".concat(o[k])) : (("00".concat(o[k])).substr(("".concat(o[k])).length)));
        }
    });
    return ret;
}
exports.dateFormat = dateFormat;
function formatDate(date) {
    return dateFormat('yyyy-MM-dd', date);
}
exports.formatDate = formatDate;
function formatMonth(date) {
    return dateFormat('yyyy-MM', date);
}
exports.formatMonth = formatMonth;
function formatDatetime(date) {
    return dateFormat('yyyy-MM-dd hh:mm:ss', date);
}
exports.formatDatetime = formatDatetime;
function formatTime(date) {
    return dateFormat('hh:mm:ss', date);
}
exports.formatTime = formatTime;
//# sourceMappingURL=date.js.map