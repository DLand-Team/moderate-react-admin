import { Cell, Node } from '@antv/x6';
import ELNode, { Properties } from '../node';
import { NodeTypeEnum } from '../../constant';

/**
 * 操作符中结束节点的模型（作为操作符模型的代理），
 * 操作符包括WHEN、SWITCH、IF、FOR、WHILE等等
 */
export default class ELEndNode extends ELNode {
  public type = NodeTypeEnum.VIRTUAL;
  public proxy: ELNode;
  public parent?: ELNode;

  constructor(proxy: ELNode) {
    super();
    this.proxy = proxy;
    this.parent = proxy.parent;
  }

  /**
   * 在结束节点的前面、插入新节点
   * @param newNode 新节点
   * @returns
   */
  public prepend(newNode: ELNode): boolean {
    return this.proxy.appendChild(newNode);
  }

  /**
   * 在结束节点的后面、插入新节点
   * @param newNode 新节点
   * @returns
   */
  public append(newNode: ELNode): boolean {
    return this.proxy.append(newNode);
  }

  /**
   * 删除结束节点
   */
  public remove(): boolean {
    return this.proxy.remove();
  }

  /**
   * 替换当前节点为新节点
   * @param newNode 新节点
   * @returns
   */
  public replace(newNode: ELNode): boolean {
    return this.proxy.replace(newNode);
  }

  /**
   * 转换为X6的图数据格式
   */
  public toCells(): Cell[] {
    throw new Error('Method not implemented.');
  }

  /**
   * 获取当前X6 Cell内容
   */
  public getCells(): Cell[] {
    return this.proxy.getCells();
  }

  /**
   * 获取当前X6 节点内容
   */
  public getNodes(): Node[] {
    return this.proxy.getNodes();
  }

  /**
   * 获取当前节点的开始节点
   */
  public getStartNode(): Node {
    return this.proxy.getStartNode();
  }

  /**
   * 获取当前节点的结束节点
   */
  public getEndNode(): Node {
    return this.proxy.getEndNode();
  }

  /**
   * 获取属性
   * @returns 属性
   */
  public getProperties(): Properties {
    return this.proxy.getProperties();
  }

  /**
   * 设置属性
   */
  public setProperties(properties: Properties): void {
    this.proxy.setProperties(properties);
  }

  /**
   * 获取属性的EL表达式
   * @returns 属性的EL表达式
   */
  public propertiesToEL(): string {
    return this.proxy.propertiesToEL();
  }

  /**
   * 转换为EL表达式字符串
   */
  public toEL(prefix?: string): string {
    return this.proxy.toEL(prefix);
  }

  /**
   * 转换为JSON格式
   */
  public toJSON(): Record<string, any> {
    return this.proxy.toJSON();
  }
}
