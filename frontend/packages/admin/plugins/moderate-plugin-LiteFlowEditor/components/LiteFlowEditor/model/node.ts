import { Cell, Node } from '@antv/x6';
import { ConditionTypeEnum, NodeTypeEnum } from '../constant';

/**
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
 * (3) 通过ELNode节点模型表示为：
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
export default abstract class ELNode {
  // 节点类型：可以是编排类型，也可以是组件类型
  public abstract type: ConditionTypeEnum | NodeTypeEnum;
  // 当前节点的子节点：编排类型有子节点，组件类型没有子节点
  public children?: ELNode[];
  // 当前节点的父节点
  public parent?: ELNode;
  // 判断类节点类型：主要用于SWITCH/IF/FOR/WHILE等编排类型
  public condition?: ELNode;
  // 组件节点的id
  public id?: string;
  // 编排节点的属性：可以设置id/tag等等
  public properties?: Properties;
  // 当前节点的X6 Cell内容
  public cells: Cell[] = [];
  // 当前节点的X6 Node内容
  public nodes: Node[] = [];
  // 代理节点
  public proxy?: ELNode;
  // 当前操作符节点的开始节点
  startNode?: Node;
  // 当前操作符节点的结束节点
  endNode?: Node;

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
        this.children.splice(index, 0, newNode);
        return true;
      }
      if (index) {
        // 2. 如果有目标节点
        const _index = this.children.indexOf(index);
        if (_index !== -1) {
          this.children.splice(_index + 1, 0, newNode);
          return true;
        }
        if (this.condition === index) {
          // 3. 如果是在condition之后追加
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
        this.children.splice(index, 0, newNode);
        return true;
      }
      if (index) {
        // 2. 如果有目标节点
        const _index = this.children.indexOf(index);
        if (_index !== -1) {
          this.children.splice(_index, 0, newNode);
          return true;
        }
        if (this.condition === index) {
          // 3. 如果是在condition之前追加
          return this.prepend(newNode);
        }
      }
      // 4. 否则直接插入
      this.children.splice(0, 0, newNode);
      return true;
    }
    return false;
  }

  /**
   * 删除指定的子节点
   * @param child 子节点
   */
  public removeChild(child: ELNode): boolean {
    if (this.children) {
      const index = this.children.indexOf(child);
      if (index !== -1) {
        this.children.splice(index, 1);
        return true;
      }
    }
    if (this.condition && this.condition === child) {
      return this.remove();
    }
    return false;
  }

  /**
   * 在当前节点的前面、插入新节点
   * @param newNode 新节点
   * @returns
   */
  public prepend(newNode: ELNode): boolean {
    if (this.parent) {
      if (this.parent.prependChild(newNode, this)) {
        return true;
      }
    } else {
      return this.prependChild(newNode);
    }
    return false;
  }

  /**
   * 在当前节点的后面、插入新节点
   * @param newNode 新节点
   * @returns
   */
  public append(newNode: ELNode): boolean {
    if (this.parent) {
      if (this.parent.appendChild(newNode, this)) {
        return true;
      }
    } else {
      return this.appendChild(newNode);
    }
    return false;
  }

  /**
   * 删除当前节点
   */
  public remove(): boolean {
    if (this.parent) {
      return this.parent.removeChild(this);
    }
    return false;
  }

  /**
   * 替换当前节点为新节点
   * @param newNode 新节点
   * @returns
   */
  public replace(newNode: ELNode): boolean {
    if (this.parent) {
      this.parent.replaceChild(this, newNode);
    }
    return false;
  }

  /**
   * 替换老节点为新节点
   * @param oldNode 老节点
   * @param newNode 新节点
   */
  public replaceChild(oldNode: ELNode, newNode: ELNode): boolean {
    newNode.parent = this;
    if (this.children) {
      // 尝试在子节点中查找老节点位置
      const index = this.children.indexOf(oldNode);
      if (index !== -1) {
        this.children.splice(index, 1, newNode);
        return true;
      }
    }
    if (this.condition === oldNode) {
      // 3. 如果是在condition之后追加
      this.condition = newNode;
      return true;
    }
    return false;
  }

  /**
   * 转换为X6的图数据格式
   */
  public abstract toCells(
    cells?: Cell[],
    options?: Record<string, any>,
  ): Cell[];

  /**
   * 获取需要选中的X6 Cell
   */
  public selectNodes(): Cell[] {
    if (this.parent?.condition === this) {
      return this.parent.getNodes();
    }
    return this.getNodes();
  }

  /**
   * 获取当前X6 Node内容
   */
  public getNodes(): Node[] {
    let nodes: Node[] = [...this.nodes];
    if (this.condition) {
      nodes = nodes.concat(this.condition.getNodes());
    }
    if (this.children && this.children.length) {
      this.children.forEach((child) => {
        nodes = nodes.concat(child.getNodes());
      });
    }
    return nodes;
  }

  /**
   * 获取当前X6 Cell内容
   */
  public getCells(): Cell[] {
    let cells: Cell[] = [...this.cells];
    if (this.condition) {
      cells = cells.concat(this.condition.getCells());
    }
    if (this.children && this.children.length) {
      this.children.forEach((child) => {
        cells = cells.concat(child.getCells());
      });
    }
    return cells;
  }

  /**
   * 重置当前存储的X6 Cell内容
   */
  public resetCells(): void;
  public resetCells(cells: Cell[]): void;
  public resetCells(cells: Cell[], nodes: Node[]): void;
  public resetCells(cells?: Cell[], nodes?: Node[]): void {
    this.cells = cells || [];
    this.nodes = nodes || [];
  }

  /**
   * 获取当前节点的开始节点
   */
  public getStartNode(): Node {
    return this.startNode as Node;
  }

  /**
   * 获取当前节点的结束节点
   */
  public getEndNode(): Node {
    return this.endNode as Node;
  };

  /**
   * 添加X6 Node相关内容
   * @param node X6 节点
   */
  public addNode(node: Node): Node {
    this.nodes.push(node);
    return node;
  }

  /**
   * 获取属性
   * @returns 属性
   */
  public getProperties(): Properties {
    const properties = this.properties || {};
    Object.keys(properties)
      .filter((key) => properties[key] === '' || properties[key] === null)
      .forEach((key) => (properties[key] = undefined));
    return properties;
  }

  /**
   * 设置属性
   */
  public setProperties(properties: Properties): void {
    this.properties = properties;
  }

  /**
   * 获取属性的EL表达式
   * @returns 属性的EL表达式
   */
  public propertiesToEL(): string {
    const properties = this.getProperties();
    return Object.keys(properties)
      .filter((key) => properties[key] !== undefined)
      .map((key) => `.${key}(${propertyToString(properties[key])})`)
      .join('');
  }

  /**
   * 转换为EL表达式字符串
   */
  public abstract toEL(prefix?: string): string;

  /**
   * 转换为JSON格式
   */
  public toJSON(): Record<string, any> {
    const { type, condition, children, properties, id } = this;
    return Object.assign(
      { type },
      condition ? { condition: condition.toJSON() } : {},
      children ? { children: children.filter(x => x).map((child) => child.toJSON()) } : {},
      id ? { id } : {},
      properties ? { properties: this.getProperties() } : {},
    );
  };

  /**
   * 当前模型，是否是参数模型的父节点
   * @param model 模型
   * @returns
   */
  public isParentOf(model: ELNode): boolean {
    const thisModel = this.proxy || this;
    let nextModel: ELNode | undefined = model.proxy || model;
    while (nextModel) {
      if (nextModel.parent === thisModel) {
        return true;
      }
      nextModel = nextModel.parent;
    }
    return false;
  }
}

/**
 * EL表达式操作符可以设置的id和tag等等属性。
 */
export interface Properties {
  id?: string;
  tag?: string;
  [key: string]: any;
}

export interface INodeData {
  model: ELNode;
  toolbar?: {
    prepend?: boolean;
    append?: boolean;
    delete?: boolean;
    replace?: boolean;
  };
}

function propertyToString(propertyValue: any): string {
  if (typeof propertyValue === 'string') {
    return `"${propertyValue}"`;
  }
  if (typeof propertyValue === 'object') {
    return propertyValue.name || propertyValue;
  }
  return propertyValue;
}
