import React, { ReactElement } from 'react';
import { Graph } from '@antv/x6';
import { Tooltip, Dropdown } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import styles from '../index.module.scss';

interface IOptions {
  tooltip: string;
  getIcon: (flowGraph: Graph) => ReactElement;
  getOverlay: (flowGraph: Graph, onChange: (data: any) => void) => ReactElement;
  handler: (flowGraph: Graph, data: any) => void;
  disabled?: (flowGraph: Graph) => boolean;
}

interface IDropdownWidgetProps {
  flowGraph: Graph;
}

const makeDropdownWidget = (options: IOptions) => {
  const Widget: React.FC<IDropdownWidgetProps> = (props) => {
    const { flowGraph } = props;
    const { tooltip, getIcon, getOverlay, handler } = options;
    const iconWrapperCls = [styles.btnWidget];
    let { disabled = false } = options;
    if (typeof disabled === 'function') {
      disabled = disabled(flowGraph);
      disabled && iconWrapperCls.push(styles.disabled);
    }
    const onChange = (data: any): void => {
      if (disabled) return;
      handler(flowGraph, data);
      flowGraph.trigger('toolBar:forceUpdate');
    };
    return (
      <Tooltip title={tooltip}>
        <Dropdown
          disabled={disabled}
          overlay={getOverlay(flowGraph, onChange)}
          trigger={['click']}
        >
          <div className={iconWrapperCls.join(' ')}>
            {getIcon(flowGraph)} <CaretDownOutlined className={styles.caret} />
          </div>
        </Dropdown>
      </Tooltip>
    );
  };
  return Widget;
};

export default makeDropdownWidget;
