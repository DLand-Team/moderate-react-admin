import { ConditionTypeEnum, NodeTypeEnum } from '../constant';
export default {
  // 串行编排(THEN)
  THEN: {
    type: ConditionTypeEnum.THEN,
    children: [
      { type: NodeTypeEnum.COMMON, id: 'a', properties: { tag: 'dog' } },
      { type: NodeTypeEnum.COMMON, id: 'b' },
      { type: NodeTypeEnum.COMMON, id: 'c' },
      { type: NodeTypeEnum.COMMON, id: 'd' },
    ],
    properties: { id: 'cat' },
  },
  // 并行编排(WHEN)
  WHEN: {
    type: ConditionTypeEnum.THEN,
    children: [
      { type: NodeTypeEnum.COMMON, id: 'a' },
      {
        type: ConditionTypeEnum.WHEN,
        children: [
          { type: NodeTypeEnum.COMMON, id: 'b' },
          { type: NodeTypeEnum.COMMON, id: 'c' },
          { type: NodeTypeEnum.COMMON, id: 'd' },
        ],
      },
      { type: NodeTypeEnum.COMMON, id: 'e' },
    ],
  },
  // 选择编排(SWITCH)
  SWITCH: {
    type: ConditionTypeEnum.SWITCH,
    condition: { type: NodeTypeEnum.SWITCH, id: 'x' },
    children: [
      { type: NodeTypeEnum.COMMON, id: 'a' },
      { type: NodeTypeEnum.COMMON, id: 'b' },
      { type: NodeTypeEnum.COMMON, id: 'c' },
      { type: NodeTypeEnum.COMMON, id: 'd' },
    ],
  },
  // 条件编排(IF)
  IF: {
    type: ConditionTypeEnum.IF,
    condition: { type: NodeTypeEnum.IF, id: 'x' },
    children: [{ type: NodeTypeEnum.COMMON, id: 'a' }],
  },
  // FOR循环
  FOR: {
    type: ConditionTypeEnum.FOR,
    condition: { type: NodeTypeEnum.FOR, id: 'x' },
    children: [
      {
        type: ConditionTypeEnum.THEN,
        children: [
          { type: NodeTypeEnum.COMMON, id: 'a' },
          { type: NodeTypeEnum.COMMON, id: 'b' },
        ],
      },
    ],
  },
  // WHILE循环
  WHILE: {
    type: ConditionTypeEnum.WHILE,
    condition: { type: NodeTypeEnum.WHILE, id: 'x' },
    children: [
      {
        type: ConditionTypeEnum.THEN,
        children: [
          { type: NodeTypeEnum.COMMON, id: 'a' },
          { type: NodeTypeEnum.COMMON, id: 'b' },
        ],
      },
    ],
  },
  // ITERATOR循环
  ITERATOR: {
    type: ConditionTypeEnum.ITERATOR,
    condition: { type: NodeTypeEnum.ITERATOR, id: 'x' },
    children: [
      {
        type: ConditionTypeEnum.THEN,
        children: [
          { type: NodeTypeEnum.COMMON, id: 'a' },
          { type: NodeTypeEnum.COMMON, id: 'b' },
        ],
      },
    ],
  },
  // CATCH 捕获异常
  CATCH: {
    type: ConditionTypeEnum.CATCH,
    condition: {
      type: ConditionTypeEnum.WHEN,
      children: [
        { type: NodeTypeEnum.COMMON, id: 'a' },
        { type: NodeTypeEnum.COMMON, id: 'b' },
        { type: NodeTypeEnum.COMMON, id: 'c' },
      ],
    },
    children: [
      {
        type: ConditionTypeEnum.IF,
        condition: { type: NodeTypeEnum.IF, id: 'x' },
        children: [
          { type: NodeTypeEnum.COMMON, id: 'y' },
        ],
      },
    ]
  },
  // AND_OR_NOT 与或非
  AND: {
    type: ConditionTypeEnum.IF,
    condition: {
      type: ConditionTypeEnum.AND,
      children: [
        {
          type: ConditionTypeEnum.OR,
          children: [
            { type: NodeTypeEnum.COMMON, id: 'a' },
            { type: NodeTypeEnum.COMMON, id: 'b' },
          ]
        },
        {
          type: ConditionTypeEnum.NOT,
          children: [
            { type: NodeTypeEnum.COMMON, id: 'c' },
          ]
        }
      ]
    },
    children: [
      { type: NodeTypeEnum.COMMON, id: 'x' },
      { type: NodeTypeEnum.COMMON, id: 'y' },
    ],
  },
} as Record<string, any>;
