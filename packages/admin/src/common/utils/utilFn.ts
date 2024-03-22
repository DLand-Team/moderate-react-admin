/**
 * 返回值是true或false
 * 先标注一下，这么处理数据对象，可能是提高代码的健壮性
 */
/**
 * Object.keys
 * 参数：要返回其枚举自身属性的对象
 * 返回值：一个表示给定对象的所有可枚举属性的字符串数组
 * let person = {name:"张三",age:25,address:"深圳",getName:function(){}}
 * Object.keys(person) // ["name", "age", "address","getName"]
 * */
export const objectExistValue = (obj) => Object.keys(obj).length > 0;

/**
 * 获取跳转接口里带的参数
 * 例子：search: `?title=brand信息&brs8dId=${brs8dId}`,
 * unescape() 函数可对通过 escape() 编码的字符串进行解码。
 */
export const getUrlParam = (url, name) => {
	//   ;
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	let search = url.split("?")[1];
	if (search) {
		var r = search.substr(0).match(reg);
		if (r !== null) return unescape(r[2]);
		return null;
	} else {
		return null;
	}
};

export function hasErrors(fieldsError) {
	return Object.keys(fieldsError).some((field) => fieldsError[field]);
}

export function guid() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
		/[xy]/g,
		function (c) {
			var r = (Math.random() * 16) | 0,
				v = c == "x" ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		},
	);
}
