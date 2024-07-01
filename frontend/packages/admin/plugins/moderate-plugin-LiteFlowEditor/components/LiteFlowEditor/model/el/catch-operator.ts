import { Cell, Node, Edge } from '@antv/x6';
import ELNode, { Properties } from '../node';
import { ELStartNode, ELEndNode } from '../utils';
import {
  ConditionTypeEnum,
  LITEFLOW_EDGE,
  NODE_TYPE_INTERMEDIATE_END,
  NodeTypeEnum,
} from '../../constant';
import NodeOperator from './node-operator';
import IntermediateErrorBoundaryIcon from '../../assets/intermediate-event-catch-error.svg'

/**
 * 捕获异常操作符：CATCH。
 *
 * 例如一个捕获异常(CATCH)示例：
 * (1) EL表达式语法：CATCH(THEN(a, b)).DO(c)
 * (2) JSON表示形式：
 * {
    type: ConditionTypeEnum.CATCH,
    condition: {
      type: NodeTypeEnum.THEN,
      children: [
        { type: NodeTypeEnum.COMMON, id: 'a' },
        { type: NodeTypeEnum.COMMON, id: 'b' }
      ]
    },
    children: [
      { type: NodeTypeEnum.COMMON, id: 'c' }
    ],
  }
  * (3) 通过ELNode节点模型进行表示的组合关系为：
                                          ┌─────────────────┐      ┌─────────────────┐
                                      ┌──▶│  ThenOperator   │──┌──▶│  NodeOperator   │
  ┌─────────┐    ┌─────────────────┐  │   └─────────────────┘  │   └─────────────────┘
  │  Chain  │───▶│  CatchOperator  │──┤   ┌─────────────────┐  │   ┌─────────────────┐
  └─────────┘    └─────────────────┘  └──▶│  NodeOperator   │  └──▶│  NodeOperator   │
                                          └─────────────────┘      └─────────────────┘


 */
export default class CatchOperator extends ELNode {
  type = ConditionTypeEnum.CATCH;
  parent?: ELNode;
  condition: ELNode = new NodeOperator(this, NodeTypeEnum.COMMON, 'x');
  children: ELNode[] = [];
  properties?: Properties;
  //@ts-ignore
  startNode?: Node;
  //@ts-ignore
  endNode?: Node;

  constructor(parent?: ELNode, condition?: ELNode, children?: ELNode[], properties?: Properties) {
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
    const newNode = new CatchOperator(parent);
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
    const { condition, children } = this;
    const start = Node.create({
      shape: ConditionTypeEnum.CATCH,
      attrs: {
        label: { text: '' },
      },
      portMarkup: [
        {
          tagName: 'image',
          selector: 'circle',
          attrs: {
            x: -6,
            y: -6,
            width: 12,
            height: 12,
            'xlink:href': IntermediateErrorBoundaryIcon,
          },
        }
      ],
      ports: {
        groups: {
          bottom: {
            position: { name: 'bottom' },
            zIndex: 1,
          },
        },
        items: [
          { group: 'bottom', id: 'bottom' }
        ]
      },
    });
    start.setData({ model: new ELStartNode(this) }, { overwrite: true });
    cells.push(this.addNode(start));
    this.startNode = start;

    const end = Node.create({
      shape: NODE_TYPE_INTERMEDIATE_END,
      attrs: {
        label: { text: '' },
      },
    });
    end.setData({ model: new ELEndNode(this) }, { overwrite: true });
    cells.push(this.addNode(end));
    this.endNode = end;

    if (children.length) {
      [condition, ...children].forEach((child: ELNode, index: number) => {
        child.toCells([], options);
        const nextStartNode = child.getStartNode();
        cells.push(
          Edge.create({
            shape: LITEFLOW_EDGE,
            source: start.id,
            target: nextStartNode.id,
            ...(index === 1 ? {
              label: '异常',
              defaultLabel: {
                position: {
                  distance: 0.3,
                  // options: {
                  //   keepGradient: true,
                  //   ensureLegibility: true,
                  // },
                },
              }
             } : {}),
          }),
        );
        const nextEndNode = child.getEndNode();
        cells.push(
          Edge.create({
            shape: LITEFLOW_EDGE,
            source: nextEndNode.id,
            target: end.id,
          }),
        );
      });
    } else {
      cells.push(
        Edge.create({
          shape: LITEFLOW_EDGE,
          source: start.id,
          target: end.id,
        }),
      );
    }

    return this.getCells();
  }

  /**
   * 转换为EL表达式字符串
   */
  public toEL(prefix: string = ''): string {
    const catchNode = this.condition;
    const [doNode] = this.children;
    if (prefix) {
      return `${prefix}CATCH(\n${catchNode.toEL(`${prefix}  `)}\n${prefix})${doNode ? `.DO(\n${doNode.toEL(`${prefix}  `)}\n${prefix})` : ''}${this.propertiesToEL()}`;
    }
    return `CATCH(${catchNode.toEL()})${doNode ? `.DO(${doNode.toEL()})` : ''}${this.propertiesToEL()}`;
  }
}
