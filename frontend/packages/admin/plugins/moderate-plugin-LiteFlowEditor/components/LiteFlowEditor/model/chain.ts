import { Cell, Node, Edge } from '@antv/x6';
import ELNode from './node';
import {
  ConditionTypeEnum,
  LITEFLOW_EDGE,
  NODE_TYPE_END,
  NODE_TYPE_START,
} from '../constant';
import { ThenOperator } from './el';

/**
 * EL表达式的根节点——EL表达式的所有延伸内容，都是在根节点上开始的。
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
export default class Chain extends ELNode {
  type = ConditionTypeEnum.CHAIN;
  children: ELNode[] = [];
  startNode?: Node;
  endNode?: Node;

  constructor(children?: ELNode[]) {
    super();
    if (children) {
      this.children = children;
    }
  }

  /**
   * 转换为X6的图数据格式
   */
  public toCells(): Cell[] {
    this.resetCells();
    const cells: Cell[] = this.cells;
    // 1. 首先：添加一个开始节点
    const start: Node = Node.create({
      shape: NODE_TYPE_START,
      attrs: {
        label: { text: '开始' },
      },
    });
    start.setData(
      {
        model: this,
        toolbar: {
          prepend: false,
          append: true,
          delete: false,
          replace: false,
        },
      },
      { overwrite: true },
    );
    cells.push(start);
    this.startNode = start;

    // 2. 其次：解析已有的节点
    let last: Node = start;
    this.children.forEach((x) => {
      x.toCells([], {});
      cells.push(
        Edge.create({
          shape: LITEFLOW_EDGE,
          source: last.id,
          target: x.getStartNode().id,
        }),
      );
      last = x.getEndNode();
    });

    // 3. 最后：添加一个结束节点
    const end: Node = Node.create({
      shape: NODE_TYPE_END,
      attrs: {
        label: { text: '结束' },
      },
    });
    end.setData(
      {
        model: this,
        toolbar: {
          prepend: true,
          append: false,
          delete: false,
          replace: false,
        },
      },
      { overwrite: true },
    );
    cells.push(end);
    this.endNode = end;

    cells.push(
      Edge.create({
        shape: LITEFLOW_EDGE,
        source: last.id,
        target: end.id,
      }),
    );

    return this.getCells();
  }

  /**
   * 转换为EL表达式字符串
   */
  public toEL(prefix: string = ''): string {
    return `${this.dataPropertyToEL(prefix)}${this.children
      .map((x) => x.toEL(prefix))
      .join(', ')};`;
  }

  public dataPropertyToEL(prefix: string = ''): string {
    const dataProperties: any[] = [];
    let next: ELNode[] = [this];
    while (next.length) {
      let current: ELNode[] = [];
      next.forEach((item) => {
        const properties = item.getProperties();
        if (properties.data) {
          dataProperties.push(properties.data);
        }

        if (item.condition) {
          current.push(item.condition);
        }
        if (item.children && item.children.length) {
          current = current.concat(item.children);
        }
      });
      next = current;
    }
    return dataProperties
      .map(
        (dataProperty) =>
          `${prefix}${dataProperty.name || ''}=${dataProperty.value || ''};\n`,
      )
      .join('');
  }

  /**
   * 转换为JSON格式
   */
  public toJSON(): Record<string, any> {
    if (this.children.length) {
      if (this.children.length === 1) {
        return this.children[0].toJSON();
      } else {
        return this.children.map((child) => child.toJSON());
      }
    }
    return {};
  }

  /**
   * 在开始节点的后面、插入新节点
   * @param newNode 新节点
   * @returns
   */
  public append(newNode: ELNode): boolean {
    if (this.children.length === 1) {
      if (this.children[0].type === ConditionTypeEnum.THEN) {
        return this.children[0].prependChild(newNode, 0);
      }
    }
    return this.appendChild(newNode, 0);
  }

  /**
   * 在后面添加子节点
   * @param newNode 子节点
   * @param index 指定位置：可以是索引，也可以是兄弟节点
   */
  public appendChild(newNode: ELNode, index?: number | ELNode): boolean {
    const result = super.appendChild(newNode, index as any);
    this.addWrapperIfPossible();
    return result;
  }

  /**
   * 在结束节点的前面、插入新节点
   * @param child 新节点
   * @returns
   */
  public prepend(newNode: ELNode): boolean {
    if (this.children.length === 1) {
      if (this.children[0].type === ConditionTypeEnum.THEN) {
        return this.children[0].appendChild(newNode);
      }
    }
    return this.appendChild(newNode);
  }

  /**
   * 在后面添加子节点
   * @param newNode 子节点
   * @param index 指定位置：可以是索引，也可以是兄弟节点
   */
  public prependChild(newNode: ELNode, index?: number | ELNode): boolean {
    const result = super.prependChild(newNode, index as any);
    this.addWrapperIfPossible();
    return result;
  }

  /**
   * 对于根节点，添加超过一个的新节点，则自动包一个THEN
   */
  addWrapperIfPossible() {
    if (this.children.length > 1) {
      const wrapper = new ThenOperator(this, []);
      this.children.forEach((child) => {
        wrapper.appendChild(child);
      });
      this.children = [wrapper];
    }
  }

  /**
   * 根节点不允许删除
   */
  public remove(): boolean {
    return false;
  }
}
