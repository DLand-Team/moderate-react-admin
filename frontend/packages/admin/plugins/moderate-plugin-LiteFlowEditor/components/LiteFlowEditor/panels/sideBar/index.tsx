import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Collapse } from 'antd';
import { Addon, Edge, Graph, Node } from '@antv/x6';
import classNames from 'classnames';
import {
  NODE_GROUP,
  SEQUENCE_GROUP,
  BRANCH_GROUP,
  CONTROL_GROUP,
  OTHER_GROUP,
  IGroupItem,
} from '../../cells';
import { findViewsFromPoint } from '../../common/events';
import ELBuilder from '../../model/builder';
import { INodeData } from '../../model/node';
import styles from './index.module.scss';
import { history } from '../../hooks/useHistory';

const { Panel } = Collapse;

interface ISideBarProps {
  flowGraph: Graph;
}

const SideBar: React.FC<ISideBarProps> = (props) => {
  const { flowGraph } = props;

  const lastEdgeRef = useRef<Edge | null>(null);
  useEffect(() => {
    const handleSetLastEdge = (args: any) => {
      lastEdgeRef.current = args.edge;
    };
    const handleResetLastEdge = () => {
      lastEdgeRef.current = null;
    };
    flowGraph.on('edge:mouseover', handleSetLastEdge);
    flowGraph.on('edge:mouseleave', handleResetLastEdge);
    return () => {
      flowGraph.off('edge:mouseover', handleSetLastEdge);
      flowGraph.off('edge:mouseleave', handleResetLastEdge);
    };
  }, [flowGraph]);

  const [groups, setGroups] = useState<IGroupItem[]>([]);
  const dnd = useMemo(
    () =>
      new Addon.Dnd({
        target: flowGraph,
        scaled: true,
        validateNode: (droppingNode: Node) => {
          const position = droppingNode.getPosition();
          const size = droppingNode.getSize();
          const { node } = droppingNode.getData();
          const cellViewsFromPoint = findViewsFromPoint(
            flowGraph,
            position.x + size.width / 2,
            position.y + size.height / 2,
          );
          // let cellViews =
          //   cellViewsFromPoint.filter((cellView) => cellView.isEdgeView()) ||
          //   [];
          // if (cellViews && cellViews.length) {
          //   const currentEdge = flowGraph.getCellById(
          //     cellViews[cellViews.length - 1].cell.id,
          //   ) as Edge | null;
          if (lastEdgeRef.current) {
            const currentEdge = lastEdgeRef.current;
            if (currentEdge) {
              let targetNode = currentEdge.getTargetNode();
              let { model: targetModel } =
                targetNode?.getData<INodeData>() || {};
              const sourceNode = currentEdge.getSourceNode();
              const { model: sourceModel } =
                sourceNode?.getData<INodeData>() || {};
              const inComingEdgesLength = (
                flowGraph.getIncomingEdges(targetNode as Node) || []
              ).length;
              if (
                inComingEdgesLength > 1 ||
                (sourceModel && targetModel?.isParentOf(sourceModel))
              ) {
                sourceModel?.append(
                  ELBuilder.createELNode(node.type, targetModel),
                );
              } else {
                targetModel?.prepend(
                  ELBuilder.createELNode(node.type, targetModel),
                );
              }
              history.push();
            }
          }
          const cellViews =
            cellViewsFromPoint.filter((cellView) => cellView.isNodeView()) ||
            [];
          if (cellViews && cellViews.length) {
            const currentNode = flowGraph.getCellById(
              cellViews[cellViews.length - 1].cell.id,
            ) as Node | null;
            if (currentNode) {
              let { model } = currentNode.getData<INodeData>();
              model?.replace(ELBuilder.createELNode(node.type as any));
              history.push();
            }
          }
          return false;
        },
      }),
    [flowGraph],
  );

  // life
  useEffect(() => {
    setGroups([SEQUENCE_GROUP, BRANCH_GROUP, CONTROL_GROUP, OTHER_GROUP, NODE_GROUP]);
  }, [setGroups]);

  return (
    <div className={styles.liteflowEditorSideBarContainer}>
      <Collapse
        className={styles.liteflowEditorSideBarCollapse}
        defaultActiveKey={['node', 'sequence', 'branch', 'control', 'other']}
      >
        {groups.map((group) => (
          <Panel key={group.key} header={group.name}>
            <PanelContent dnd={dnd} cellTypes={group.cellTypes} />
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

const View: React.FC<any> = (props) => {
  const { node, icon, ...rest } = props;
  return (
    <div className={classNames(styles.liteflowShapeWrapper)} {...rest}>
      <img className={styles.liteflowShapeSvg} src={icon}></img>
    </div>
  );
};

interface IPanelContentProps {
  dnd: Addon.Dnd;
  cellTypes: LiteFlowNode[];
}

const PanelContent: React.FC<IPanelContentProps> = (props) => {
  const { dnd, cellTypes } = props;
  const onMouseDown = (evt: any, node: LiteFlowNode) => {
    dnd.start(Node.create({ shape: node.shape, data: { node } }), evt);
  };
  return (
    <div className={styles.liteflowEditorSideBarPanelContent}>
      {cellTypes.map((cellType, index) => {
        return (
          <div
            key={index}
            className={classNames(styles.liteflowEditorSideBarCellContainer, {
              [styles.disabled]: cellType.disabled,
            })}
          >
            <div className={styles.liteflowEditorSideBarCellWrapper}>
              <View
                icon={cellType.icon}
                onMouseDown={(evt: any) => {
                  if (!cellType.disabled) {
                    onMouseDown(evt, cellType);
                  }
                }}
              />
            </div>
            <p className={styles.liteflowEditorSideBarCellTitle}>
              {cellType.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default SideBar;
