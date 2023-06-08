function yearMonthDay() {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const day = today.getDate()
    return `${year}${suppleZero(month)}${suppleZero(day)}`;
}

function suppleZero(val){
    return val >= 10 ? val + '' : `0${val}`;
}

module.exports = { 
    yearMonthDay,
}