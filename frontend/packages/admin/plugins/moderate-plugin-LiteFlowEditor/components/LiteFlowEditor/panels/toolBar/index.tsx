import React, { useEffect, useReducer } from 'react';
import { Graph } from '@antv/x6';
import widgets from './widgets';
import { useGraph } from '../../hooks';
import styles from './index.module.scss';

interface IProps {
  flowGraph: Graph;
}

const ToolBar: React.FC<IProps> = () => {
  const flowGraph: Graph = useGraph();
  const forceUpdate = useReducer((n) => n + 1, 0)[1];

  useEffect(() => {
    flowGraph.on('toolBar:forceUpdate', forceUpdate);
    return () => {
      flowGraph.off('toolBar:forceUpdate');
    };
  }, [flowGraph]);

  return (
    <div className={styles.liteflowEditorToolBarContainer}>
      {widgets.map((group, index) => (
        <div key={index} className={styles.liteflowEditorToolBarGroup}>
          {group.map((ToolItem, index) => {
            return <ToolItem key={index} flowGraph={flowGraph} />;
          })}
        </div>
      ))}
    </div>
  );
};

export default ToolBar;
