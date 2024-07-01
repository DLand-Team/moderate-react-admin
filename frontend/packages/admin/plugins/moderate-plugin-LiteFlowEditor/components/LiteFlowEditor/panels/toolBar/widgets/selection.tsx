import React from 'react';

import { Graph } from '@antv/x6';
import makeBtnWidget from './common/makeBtnWidget';
import { GatewayOutlined } from '@ant-design/icons';

interface IProps {
  flowGraph: Graph;
}

const ToggleSelection: React.FC<IProps> = makeBtnWidget({
  tooltip: '框选节点',
  getIcon() {
    return <GatewayOutlined />;
  },
  handler(flowGraph: Graph) {
    const needEnableRubberBand: boolean = !flowGraph.isRubberbandEnabled();
    if (needEnableRubberBand) {
      flowGraph.disablePanning();
      flowGraph.enableRubberband();
    } else {
      flowGraph.enablePanning();
      flowGraph.disableRubberband();
    }
  },
  selected(flowGraph: Graph) {
    return flowGraph.isRubberbandEnabled();
  },
});

export default ToggleSelection;
