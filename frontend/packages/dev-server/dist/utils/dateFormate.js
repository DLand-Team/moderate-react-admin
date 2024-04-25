"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yearMonthDay = void 0;
function yearMonthDay() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year}${suppleZero(month)}${suppleZero(day)}`;
}
exports.yearMonthDay = yearMonthDay;
function suppleZero(val) {
    return val >= 10 ? val + '' : `0${val}`;
}
//# sourceMappingURL=dateFormate.js.map