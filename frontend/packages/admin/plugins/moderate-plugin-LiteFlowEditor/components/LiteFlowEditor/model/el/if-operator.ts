import { Cell, Node, Edge } from '@antv/x6';
import ELNode, { Properties } from '../node';
import { ELEndNode, ELVirtualNode } from '../utils';
import {
  ConditionTypeEnum,
  LITEFLOW_EDGE,
  NODE_TYPE_INTERMEDIATE_END,
  NodeTypeEnum,
} from '../../constant';
import NodeOperator from './node-operator';

/**
 * 条件编排操作符：IF。
 *
 * 例如一个条件编排(IF)示例：
 * (1) EL表达式语法：IF(x, a)
 * (2) JSON表示形式：
 * {
    type: ConditionTypeEnum.IF,
    condition: { type: NodeTypeEnum.IF, id: 'x' },
    children: [
      { type: NodeTypeEnum.COMMON, id: 'a' }
    ],
  }
  * (3) 通过ELNode节点模型进行表示的组合关系为：
                                          ┌─────────────────┐
                                      ┌──▶│  NodeOperator   │
  ┌─────────┐    ┌─────────────────┐  │   └─────────────────┘
  │  Chain  │───▶│    IfOperator   │──┤   ┌─────────────────┐
  └─────────┘    └─────────────────┘  └──▶│  NodeOperator   │
                                          └─────────────────┘
 */
export default class IfOperator extends ELNode {
  type = ConditionTypeEnum.IF;
  parent?: ELNode;
  condition: ELNode = new NodeOperator(this, NodeTypeEnum.IF, 'x');
  children: ELNode[] = [];
  properties?: Properties;
  //@ts-ignore
  startNode?: Node;
  //@ts-ignore
  endNode?: Node;

  constructor(
    parent?: ELNode,
    condition?: ELNode,
    children?: ELNode[],
    properties?: Properties,
  ) {
    super();
    this.parent = parent;
    if (condition) {
      this.condition = condition;
    }
    if (children) {
      this.children = children;
    }
    this.properties = properties;
  }

  /**
   * 创建新的节点
   * @param parent 新节点的父节点
   * @param type 新节点的子节点类型
   */
  public static create(parent?: ELNode, type?: NodeTypeEnum): ELNode {
    const newNode = new IfOperator(parent);
    newNode.appendChild(NodeOperator.create(newNode, type));
    return newNode;
  }

  /**
   * 转换为X6的图数据格式
   */
  public toCells(
    cells: Cell[] = [],
    options: Record<string, any> = {},
  ): Cell[] {
    this.resetCells(cells);
    const { condition, children = [] } = this;
    condition.toCells([], {
      shape: NodeTypeEnum.IF,
    });
    let start = condition.getStartNode();
    start.setData(
      {
        model: condition,
        toolbar: {
          prepend: true,
          append: false,
          delete: true,
          replace: true,
        },
      },
      { overwrite: true },
    );
    this.startNode = start;
    start = condition.getEndNode();

    const end = Node.create({
      shape: NODE_TYPE_INTERMEDIATE_END,
      attrs: {
        label: { text: '' },
      },
    });
    end.setData(
      {
        model: new ELEndNode(this),
        toolbar: {
          prepend: false,
          append: true,
          delete: true,
          replace: true,
        },
      },
      { overwrite: true },
    );
    cells.push(this.addNode(end));
    this.endNode = end;

    const [first, last] = children;
    [first, last].forEach((item, index) => {
      const next = item || NodeOperator.create(this, NodeTypeEnum.VIRTUAL, ' ');
      next.toCells([], options);
      const nextStartNode = next.getStartNode();
      cells.push(
        Edge.create({
          shape: LITEFLOW_EDGE,
          source: start.id,
          target: nextStartNode.id,
          label: index ? 'false' : 'true',
        }),
      );
      const nextEndNode = next.getEndNode();
      cells.push(
        Edge.create({
          shape: LITEFLOW_EDGE,
          source: nextEndNode.id,
          target: end.id,
          label: ' ',
        }),
      );

      if (!item) {
        nextStartNode.setData(
          {
            model: new ELVirtualNode(this, index, next),
            toolbar: {
              prepend: false,
              append: false,
              delete: false,
              replace: true,
            },
          },
          { overwrite: true },
        );
        cells.push(this.addNode(nextStartNode));
      }
    });
    return this.getCells();
  }

  /**
   * 在后面添加子节点
   * @param newNode 子节点
   * @param index 指定位置：可以是索引，也可以是兄弟节点
   */
  public appendChild(newNode: ELNode): boolean;
  public appendChild(newNode: ELNode, index: number): boolean;
  public appendChild(newNode: ELNode, sibling: ELNode): boolean;
  public appendChild(newNode: ELNode, index?: number | ELNode): boolean {
    newNode.parent = this;
    if (this.children) {
      // 尝试在父节点中添加新节点
      if (typeof index === 'number') {
        // 1. 如果有索引
        // this.children.splice(index, this.children[index] ? 1: 0, newNode);
        this.children[index <= 1 ? index : 1] = newNode;
        return true;
      }
      if (index) {
        // 2. 如果有目标节点
        const _index = this.children.indexOf(index);
        if (_index !== -1) {
          // this.children.splice(_index + 1, this.children[_index] ? 1: 0, newNode);
          this.children[_index <= 1 ? _index : 1] = newNode;
          return true;
        }
        // 3. 如果是在condition之后追加
        if (this.condition === index) {
          return this.appendChild(newNode, 0);
        }
      }
      // 4. 否则直接插入
      this.children.push(newNode);
      return true;
    }
    return false;
  }

  /**
   * 在后面添加子节点
   * @param newNode 子节点
   * @param index 指定位置：可以是索引，也可以是兄弟节点
   */
  public prependChild(newNode: ELNode): boolean;
  public prependChild(newNode: ELNode, index: number): boolean;
  public prependChild(newNode: ELNode, sibling: ELNode): boolean;
  public prependChild(newNode: ELNode, index?: number | ELNode): boolean {
    newNode.parent = this;
    if (this.children) {
      // 尝试在父节点中添加新节点
      if (typeof index === 'number') {
        // 1. 如果有索引
        // this.children.splice(index, this.children[index] ? 1: 0, newNode);
        this.children[index] = newNode;
        return true;
      }
      if (index) {
        // 2. 如果有目标节点
        const _index = this.children.indexOf(index);
        if (_index !== -1) {
          // this.children.splice(_index, this.children[_index] ? 1: 0, newNode);
          this.children[_index] = newNode;
          return true;
        }
        if (this.condition === index) {
          // 3. 如果是在condition之前追加
          return this.prepend(newNode);
        }
      }
      // 4. 否则直接插入
      this.children.splice(0, this.children[0] ? 1 : 0, newNode);
      return true;
    }
    return false;
  }

  /**
   * 转换为EL表达式字符串
   */
  public toEL(prefix: string = ''): string {
    if (prefix) {
      return `${prefix}IF(\n${[
        this.condition.toEL(`${prefix}  `),
        ...this.children.filter((x) => x).map((x) => x.toEL(`${prefix}  `)),
      ].join(', \n')}\n${prefix})${this.propertiesToEL()}`;
    }
    return `IF(${[
      this.condition.toEL(),
      ...this.children.filter((x) => x).map((x) => x.toEL()),
    ].join(', ')})${this.propertiesToEL()}`;
  }
}
