import React, { ReactElement } from 'react';
import { Tooltip } from 'antd';
import { Graph } from '@antv/x6';
import styles from '../index.module.scss';
import { useGraph } from '../../../../hooks';

interface IOptions {
  tooltip: string;
  getIcon: (flowGraph: Graph) => ReactElement;
  handler: (flowGraph: Graph, props?: any) => void;
  disabled?: (flowGraph: Graph) => boolean;
  selected?: (flowGraph: Graph) => boolean;
}

interface IBtnWidgetProps {
  flowGraph: Graph;
}

const makeBtnWidget = (options: IOptions) => {
  const Widget: React.FC<IBtnWidgetProps> = (props: any) => {
    const flowGraph = useGraph();
    const { tooltip, getIcon, handler } = options;
    const iconWrapperCls = [styles.btnWidget];
    let { disabled = false, selected = false } = options;
    if (typeof disabled === 'function') {
      disabled = disabled(flowGraph);
      disabled && iconWrapperCls.push(styles.disabled);
    }
    if (typeof selected === 'function') {
      selected = selected(flowGraph);
      selected && iconWrapperCls.push(styles.selected);
    }
    const onClick = (): void => {
      if (disabled) return;
      handler(flowGraph, props);
      flowGraph.trigger('toolBar:forceUpdate');
    };
    return (
      <Tooltip title={tooltip}>
        <div className={iconWrapperCls.join(' ')} onClick={onClick}>
          {getIcon(flowGraph)}
        </div>
      </Tooltip>
    );
  };
  return Widget;
};

export default makeBtnWidget;
