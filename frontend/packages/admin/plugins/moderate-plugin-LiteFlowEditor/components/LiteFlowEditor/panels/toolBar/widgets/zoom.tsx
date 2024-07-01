import React, { useState, useEffect } from 'react';
import { Graph } from '@antv/x6';
import { ZoomOutOutlined, ZoomInOutlined } from '@ant-design/icons';
import { MAX_ZOOM, MIN_ZOOM } from '../../../constant';
import { shortcuts } from '../../../common/shortcuts';
import makeBtnWidget from './common/makeBtnWidget';
import { useGraph } from '../../../hooks';
import styles from './index.module.scss';

interface IProps {
  flowGraph: Graph;
}

const ZoomOut: React.FC<IProps> = makeBtnWidget({
  tooltip: '缩小',
  handler: shortcuts.zoomOut.handler,
  getIcon() {
    return <ZoomOutOutlined />;
  },
  disabled(flowGraph: Graph) {
    return flowGraph.zoom() <= MIN_ZOOM;
  },
});

const ZoomIn: React.FC<IProps> = makeBtnWidget({
  tooltip: '放大',
  handler: shortcuts.zoomIn.handler,
  getIcon() {
    return <ZoomInOutlined />;
  },
  disabled(flowGraph: Graph) {
    return flowGraph.zoom() >= MAX_ZOOM;
  },
});

const Zoom: React.FC<IProps> = (props) => {
  const flowGraph = useGraph();
  const [scale, setScale] = useState<number>(flowGraph.zoom());
  useEffect(() => {
    const handleScale = () => {
      setScale(flowGraph.zoom());
    };
    flowGraph.on('scale', handleScale);
    return () => {
      flowGraph.off('scale', handleScale);
    };
  }, [flowGraph]);
  return (
    <div className={styles.zoomContainer}>
      <ZoomOut {...props} />
      <span className={styles.zoomText}>{Helper.scaleFormatter(scale)}</span>
      <ZoomIn {...props} />
    </div>
  );
};

const Helper = {
  scaleFormatter(scale: number): string {
    return (scale * 100).toFixed(0) + '%';
  },
};

export default Zoom;
