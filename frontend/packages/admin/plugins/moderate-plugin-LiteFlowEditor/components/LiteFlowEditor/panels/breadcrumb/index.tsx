import React, { useState, useReducer, useEffect } from 'react';
import { Graph } from '@antv/x6';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import ELNode from '../../model/node';
import { getIconByType } from '../../cells';
import styles from './index.module.scss';

interface IProps {
  flowGraph: Graph;
}

const BreadcrumbPath: React.FC<IProps> = (props) => {
  const { flowGraph } = props;

  const [selectedModel, setSelectedModel] = useState<ELNode | null>(null);

  const forceUpdate = useReducer((n) => n + 1, 0)[1];
  useEffect(() => {
    const handler = () => {
      setSelectedModel(null);
      forceUpdate();
    };
    const handleSelect = (component: ELNode) => {
      setSelectedModel(component);
    };
    flowGraph.on('settingBar:forceUpdate', handler);
    flowGraph.on('model:select', handleSelect);
    return () => {
      flowGraph.off('settingBar:forceUpdate', handler);
      flowGraph.off('model:select', handleSelect);
    };
  }, [flowGraph, setSelectedModel, forceUpdate]);

  const nodes = flowGraph.getSelectedCells().filter((v) => !v.isEdge());
  const parents: ELNode[] = [];
  if (selectedModel || nodes.length === 1) {
    const currentModel = selectedModel || nodes[0].getData().model;
    let nextModel = currentModel.proxy || currentModel;
    while (nextModel) {
      if (nextModel.parent) {
        parents.splice(0, 0, nextModel);
      }
      nextModel = nextModel.parent;
    }
  }

  const handleSelectModel = (selectedModel: ELNode) => {
    flowGraph.trigger('model:select', selectedModel);
  };

  return (
    <div className={styles.liteflowEditorBreadcrumb}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <HomeOutlined />
        </Breadcrumb.Item>
        {parents.map((elNodeModel: ELNode, index: number) => {
          const icon = getIconByType(elNodeModel.type);
          const handleClick = () => {
            flowGraph.cleanSelection();
            flowGraph.select(elNodeModel.getNodes());
            setSelectedModel(elNodeModel);
            handleSelectModel(elNodeModel);
          };
          return (
            <Breadcrumb.Item key={index} onClick={handleClick}>
              <img className={styles.liteflowEditorBreadcrumbIcon} src={icon} />
              <span>{elNodeModel.type}</span>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbPath;
