import Chain from './chain';
import {
  ThenOperator,
  WhenOperator,
  SwitchOperator,
  IfOperator,
  ForOperator,
  WhileOperator,
  CatchOperator,
  AndOperator,
  OrOperator,
  NotOperator,
  NodeOperator,
} from './el';
import { NodeTypeEnum, ConditionTypeEnum } from '../constant';
import ELNode from './node';

interface ParseParameters {
  data: Record<string, any>;
  parent: ELNode;
}

/**
 * 将EL表达式的JSON表示，构造成ELNode模型表示。
 * EL表达式的模型表示：数据结构本质上是一个树形结构。
 * 例如一个串行编排(THEN)：
 * (1) EL表达式形式：THEN(a, b, c, d)
 * (2) JSON表示形式：
 * {
    type: ConditionTypeEnum.THEN,
    children: [
      { type: NodeTypeEnum.COMMON, id: 'a' },
      { type: NodeTypeEnum.COMMON, id: 'b' },
      { type: NodeTypeEnum.COMMON, id: 'c' },
      { type: NodeTypeEnum.COMMON, id: 'd' },
    ],
  }
 * (3) 通过ELNode节点模型进行表示的组合关系为：
                                          ┌─────────────────┐
                                      ┌──▶│  NodeOperator   │
                                      │   └─────────────────┘
                                      │   ┌─────────────────┐
                                      ├──▶│  NodeOperator   │
  ┌─────────┐    ┌─────────────────┐  │   └─────────────────┘
  │  Chain  │───▶│  ThenOperator   │──┤   ┌─────────────────┐
  └─────────┘    └─────────────────┘  ├──▶│  NodeOperator   │
                                      │   └─────────────────┘
                                      │   ┌─────────────────┐
                                      └──▶│  NodeOperator   │
                                          └─────────────────┘
 */
export default class ELBuilder {
  public static build(data: Record<string, any> | Record<string, any>[]) {
    return builder(data);
  }
  public static createELNode(
    type: ConditionTypeEnum | NodeTypeEnum,
    parent?: ELNode,
    id?: string,
  ): ELNode {
    switch (type) {
      // 1. 编排类型
      case ConditionTypeEnum.THEN:
        return ThenOperator.create(parent);
      case ConditionTypeEnum.WHEN:
        return WhenOperator.create(parent);
      case ConditionTypeEnum.SWITCH:
        return SwitchOperator.create(parent);
      case ConditionTypeEnum.IF:
        return IfOperator.create(parent);
      case ConditionTypeEnum.FOR:
        return ForOperator.create(parent);
      case ConditionTypeEnum.WHILE:
        return WhileOperator.create(parent);
      case ConditionTypeEnum.CATCH:
        return CatchOperator.create(parent);
      case ConditionTypeEnum.AND:
        return AndOperator.create(parent);
      case ConditionTypeEnum.OR:
        return OrOperator.create(parent);
      case ConditionTypeEnum.NOT:
        return NotOperator.create(parent);
      // 2. 节点类型
      case NodeTypeEnum.COMMON:
      default:
        // return NodeOperator.create(parent, type as NodeTypeEnum);
        return NodeOperator.create(parent, type as NodeTypeEnum, id);
    }
  }
}

export function builder(data: Record<string, any> | Record<string, any>[]): ELNode {
  const chain: Chain = new Chain();
  if (Array.isArray(data)) {
    data.forEach((item) => {
      const next: ELNode | undefined = parse({ parent: chain, data: item });
      if (next) {
        chain.appendChild(next);
      }
    });
  } else {
    const next: ELNode | undefined = parse({ parent: chain, data });
    if (next) {
      chain.appendChild(next);
    }
  }

  return chain;
}

export function parse({ parent, data }: ParseParameters): ELNode | undefined {
  if (!(data?.type)) {
    return undefined;
  }

  switch (data.type) {
    // 1、编排类：顺序、分支、循环
    case ConditionTypeEnum.THEN:
      return parseOperator({ parent: new ThenOperator(parent), data });
    case ConditionTypeEnum.WHEN:
      return parseOperator({ parent: new WhenOperator(parent), data });
    case ConditionTypeEnum.SWITCH:
      return parseOperator({ parent: new SwitchOperator(parent), data });
    case ConditionTypeEnum.IF:
      return parseOperator({ parent: new IfOperator(parent), data });
    case ConditionTypeEnum.FOR:
      return parseOperator({ parent: new ForOperator(parent), data });
    case ConditionTypeEnum.WHILE:
      return parseOperator({ parent: new WhileOperator(parent), data });
    case ConditionTypeEnum.CATCH:
        return parseOperator({ parent: new CatchOperator(parent), data });
    case ConditionTypeEnum.AND:
      return parseOperator({ parent: new AndOperator(parent), data });
    case ConditionTypeEnum.OR:
      return parseOperator({ parent: new OrOperator(parent), data });
    case ConditionTypeEnum.NOT:
      return parseOperator({ parent: new NotOperator(parent), data });

    // 2、组件类：顺序、分支、循环
    case NodeTypeEnum.COMMON:
    default:
      return new NodeOperator(parent, data.type, data.id, data.properties);
  }
}

function parseOperator({ parent, data }: ParseParameters): ELNode {
  const { condition, children = [], properties } = data;
  if (condition) {
    const conditionNode = parse({ parent, data: condition });
    if (conditionNode) {
      parent.condition = conditionNode;
    }
  }
  if (children && children.length) {
    children.forEach((child: Record<string, any>) => {
      const childNode = parse({ parent, data: child });
      if (childNode) {
        parent.appendChild(childNode);
      }
    });
  }
  if (properties) {
    parent.setProperties(properties);
  }
  return parent;
}
