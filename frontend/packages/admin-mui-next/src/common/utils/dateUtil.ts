export function transformTime(timeStr: String) {
  let year = `${timeStr.slice(5).length == 4 ? '' : '20'}${timeStr.slice(5)}`;
  let mon = timeStr.slice(2, 5);
  let day = timeStr.slice(0, 2);
  return `${year} ${getMonthNum(mon)} ${day}`;
}

export const getMonthStr = (mon: number) => {
  return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][mon];
};

export function getMonthNum(month: string) {
  return (
    {
      JAN: 1,
      FEB: 2,
      MAR: 3,
      APR: 4,
      MAY: 5,
      JUN: 6,
      JUL: 7,
      AUG: 8,
      SEP: 9,
      OCT: 10,
      NOV: 11,
      DEC: 12,
    }[month] || 1
  );
}
