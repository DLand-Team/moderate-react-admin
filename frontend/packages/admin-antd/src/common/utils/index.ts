//--->>>核心功能<<<---//
export * from "./getField"; // 表单工厂，用于创建便捷表单
export * from "./fieldsPresetCreater"; // 预设表单数据
export { default as storageHelper } from "./storageHelper";

//--->>>通用<<<---//
export { sanitizePath } from "./sanitizePath";
export { bubbleSort } from "./bubbleSort";
export { delay } from "./delay";
export { enumToObject } from "./enumToObject";
export { getTextWidth } from "./getTextWidth";
export { getUrlParam } from "./getUrlParam";
export { includeOne } from "./includeOne";
export { objectExistValue } from "./objectExistValue";
export { removeDuplicatesInArray } from "./removeDuplicatesInArray";
export { upFirstcharacter } from "./upFirstcharacter";

//--->>>直接lodash实现<<<---//
export { UUID } from "./uuid";
export { isEqual } from "./isEqual"; // 深比较
export { cloneDeep } from "./cloneDeep"; // 深拷贝
export { pickBy } from "./pickBy"; // 常用给对象去空属性
export { merge } from "./merge"; // 融合对象类型
export { throttle } from "./throttle";
export { debounce } from "./debounce";
