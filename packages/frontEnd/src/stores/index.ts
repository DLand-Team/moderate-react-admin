export { default as globalStore } from "./global";
import { createStore, createUseInject } from "natur";
import { thunkMiddleware } from "natur-immer";
import {
  fillObjectRestDataMiddleware,
  filterUndefinedMiddleware,
  promiseMiddleware,
  shallowEqualMiddleware,
} from "natur/dist/middlewares";
import permissions from "./permissions";
import userInfo from "./userInfo";

export const store = createStore(
  { permissions, userInfo }, // 同步加载模块
  {}, // 懒加载模块
  {
    middlewares: [
      thunkMiddleware,
      promiseMiddleware,
      fillObjectRestDataMiddleware,
      shallowEqualMiddleware,
      filterUndefinedMiddleware,
    ],
  } //中间价
);
export const useInject = createUseInject(() => store);
export const useFlatInject = createUseInject(() => store, { flat: true });
