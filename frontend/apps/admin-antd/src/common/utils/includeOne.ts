/**
 * 判断一个集合和而另外一个集合是否存在交集
 */
export function includeOne(targetArr: any[], fliterArr: any[]) {
    const found = fliterArr.some((item) => {
        return targetArr.includes(item);
    });
    return found;
}
