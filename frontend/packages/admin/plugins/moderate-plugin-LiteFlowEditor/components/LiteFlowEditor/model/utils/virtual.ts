import { Cell, Node } from '@antv/x6';
import ELNode, { Properties } from '../node';
import { NodeTypeEnum } from '../../constant';

/**
 * 操作符中占位节点的模型（作为占位节点的代理），
 * 操作符包括IF等等
 */
export default class ELVirtualNode extends ELNode {
  public type = NodeTypeEnum.VIRTUAL;
  public index: number = 0;
  public parent: ELNode;
  public proxy: ELNode;

  constructor(parent: ELNode, index: number, proxy: ELNode) {
    super();
    this.parent = parent;
    this.index = index;
    this.proxy = proxy;
  }

  /**
   * 在结束节点的前面、插入新节点
   * @param newNode 新节点
   * @returns
   */
  public prepend(newNode: ELNode): boolean {
    return this.replace(newNode);
  }

  /**
   * 在结束节点的后面、插入新节点
   * @param newNode 新节点
   * @returns
   */
  public append(newNode: ELNode): boolean {
    return this.replace(newNode);
  }

  /**
   * 删除结束节点
   */
  public remove(): boolean {
    return false;
  }

  /**
   * 替换当前节点为新节点
   * @param newNode 新节点
   * @returns
   */
  public replace(newNode: ELNode): boolean {
    return this.parent.appendChild(newNode, this.index);
  }

  /**
   * 转换为X6的图数据格式
   */
  public toCells(): Cell[] {
    return this.proxy.toCells();
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
