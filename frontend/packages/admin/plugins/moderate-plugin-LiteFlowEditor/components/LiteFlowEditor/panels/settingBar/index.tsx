import React, { useState, useEffect, useReducer } from 'react';
import { Graph } from '@antv/x6';
import { Tabs } from 'antd';
import Basic from './basic';
import {
  ComponentPropertiesEditor,
  ConditionPropertiesEditor,
} from './properties';
import Outline from './outline';
import ELNode from '../../model/node';
import NodeOperator from '../../model/el/node-operator';
import styles from './index.module.scss';

const { TabPane } = Tabs;

interface IProps {
  flowGraph: Graph;
}

const SettingBar: React.FC<IProps> = (props) => {
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
  }, [flowGraph]);

  const nodes = flowGraph.getSelectedCells().filter((v) => !v.isEdge());
  let currentModel;
  if (selectedModel || nodes.length === 1) {
    currentModel = selectedModel || nodes[0].getData().model;
    currentModel = currentModel.proxy || currentModel;
  }

  let propertiesPanel = <Basic flowGraph={flowGraph} />;

  if (currentModel?.parent) {
    if (Object.getPrototypeOf(currentModel) === NodeOperator.prototype) {
      propertiesPanel = <ComponentPropertiesEditor model={currentModel} />;
    } else {
      propertiesPanel = <ConditionPropertiesEditor model={currentModel} />;
    }
  }

  return (
    <div className={styles.liteflowEditorSettingBarContainer}>
      <Tabs defaultActiveKey={'properties'}>
        <TabPane tab={'属性'} key={'properties'}>
          {propertiesPanel}
        </TabPane>
        <TabPane tab={'结构树'} key={'outline'}>
          <Outline flowGraph={flowGraph} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default SettingBar;
