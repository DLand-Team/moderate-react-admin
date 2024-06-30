/** 常量 */
export const NODE_WIDTH = 30; // 节点宽度
export const NODE_HEIGHT = 30; // 节点高度
export const MIN_ZOOM = 0.1;
export const MAX_ZOOM = 3.0;
export const ZOOM_STEP = 0.1;

// 布局相关常量
export const RANK_SEP = 20;
export const NODE_SEP = 20;

export const NODE_TYPE_START = 'LITEFLOW_START';
export const NODE_TYPE_END = 'LITEFLOW_END';
export const NODE_TYPE_INTERMEDIATE_END = 'LITEFLOW_INTERMEDIATE_END';

export const LITEFLOW_EDGE = 'LITEFLOW_EDGE';
export const LITEFLOW_ANCHOR = 'LITEFLOW_ANCHOR';
export const LITEFLOW_ROUTER = 'LITEFLOW_ROUTER';

export const LINE_COLOR = '#c1c1c1';

/** 逻辑组件类型 */
export enum NodeTypeEnum {
  COMMON = 'NodeComponent', // common, 普通

  BOOLEAN = 'NodeBooleanComponent', // boolean, 布尔

  SWITCH = 'NodeSwitchComponent', // switch, 选择

  IF = 'NodeIfComponent', // if, 条件

  FOR = 'NodeForComponent', // for, 循环次数

  WHILE = 'NodeWhileComponent', // while, 循环条件

  BREAK = 'NodeBreakComponent', // break, 循环跳出

  ITERATOR = 'NodeIteratorComponent', // iterator, 循环迭代

  SCRIPT = 'ScriptCommonComponent', // script, 脚本

  SWITCH_SCRIPT = 'ScriptSwitchComponent', // switch_script, 选择脚本

  IF_SCRIPT = 'ScriptIfComponent', // if_script, 条件脚本

  FOR_SCRIPT = 'ScriptForComponent', // for_script, 循环次数脚本

  WHILE_SCRIPT = 'ScriptWhileComponent', // while_script, 循环条件脚本

  BREAK_SCRIPT = 'ScriptBreakComponent', // break_script, 循环跳出脚本

  FALLBACK = 'fallback', // 降级

  VIRTUAL = 'NodeVirtualComponent', // virtual, 虚节点
}

/** 逻辑编排类型 */
export enum ConditionTypeEnum {
  CHAIN = 'CHAIN', // chain，编排的根节点

  THEN = 'THEN', // then，串行编排

  WHEN = 'WHEN', // when，并行编排

  SWITCH = 'SWITCH', // switch，选择编排

  IF = 'IF', // if，条件编排

  PRE = 'PRE', // pre

  FINALLY = 'FINALLY', // finally

  FOR = 'FOR', // for，循环编排

  WHILE = 'WHILE', // while，循环编排

  ITERATOR = 'ITERATOR', // iterator

  BREAK = 'BREAK', // break

  CATCH = 'CATCH', // catch

  AND = 'AND', // and，与

  OR = 'OR', // or，或

  NOT = 'NOT', // not，非

  ABSTRACT = 'ABSTRACT', // abstract
}
