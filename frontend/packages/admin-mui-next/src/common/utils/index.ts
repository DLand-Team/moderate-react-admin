//--->>>核心功能<<<---//

export { default as storageHelper } from "./storageHelper";
export * from "./dataURLToBlob";
//--->>>通用<<<---//

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
export { uuidv4 } from "./uuidv4";
export { isEqual } from "./isEqual"; // 深比较
export { cloneDeep } from "./cloneDeep"; // 深拷贝
export { pickBy } from "./pickBy"; // 常用给对象去空属性
export { merge } from "./merge"; // 融合对象类型
export { throttle } from "./throttle";
export { debounce } from "./debounce";

//--->>>工具集<<<---//

export * from "./timeUtil"; // 时间工具集
export * from "./themeUtil"; // 主题工具集
export * from "./tableUtil"; // table工具集
export * from "./numberUtil";
