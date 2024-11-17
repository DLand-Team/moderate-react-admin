/**
 * 获取跳转接口里带的参数
 * 例子：search: `?title=brand信息&brs8dId=${brs8dId}`,
 * unescape() 函数可对通过 escape() 编码的字符串进行解码。
 */
export const getUrlParam = (url: string, name: string) => {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    const search = url.split("?")[1];
    if (search) {
        const r = search.substr(0).match(reg);
        if (r !== null) return unescape(r[2]);
        return null;
    } else {
        return null;
    }
};