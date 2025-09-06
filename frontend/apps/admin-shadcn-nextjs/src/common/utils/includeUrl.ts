export function isRouteCovered(fullPath: string, targetPath: string): boolean {
	if (!fullPath || !targetPath) {
		return false;
	}
    debugger
	// 去除首尾多余的斜杠，并按斜杠切分
	const fullSegments = fullPath.replace(/^\/+|\/+$/g, "").split("/");
	const targetSegments = targetPath.replace(/^\/+|\/+$/g, "").split("/");

	if (targetSegments.length > fullSegments.length) return false;

	// 判断 targetSegments 是否为 fullSegments 的头部子数组
	for (let i = 0; i < targetSegments.length; i++) {
		if (fullSegments[i] !== targetSegments[i]) return false;
	}
	return true;
}
