import React, { useState, useEffect } from 'react';
import { Graph } from '@antv/x6';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import makeBtnWidget from './common/makeBtnWidget';
import { useGraph, useGraphWrapper } from '../../../hooks';

interface IProps {
  flowGraph: Graph;
}

export function getFullscreenElement() {
  const element = document as any;
  return element.fullscreenElement || element.mozFullScreenElement ||  element.msFullScreenElement || element.webkitFullscreenElement || null
}

const previousSize: any = { width: 800, height: 500 };
let onFullscreenChange = () => {
  // Do nothing
}

const Fullscreen: React.FC<IProps> = makeBtnWidget({
  tooltip: '全屏',
  handler(flowGraph: Graph, props: any) {
    const element = props.graphWrapperRef.current
    previousSize.width = element.clientWidth;
    previousSize.height = element.clientHeight;
    onFullscreenChange = () => {
      flowGraph.resize(previousSize.width, previousSize.height);
      flowGraph.centerContent();
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      flowGraph.trigger('flowGraph:fullscreenchange');
    }
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }

    setTimeout(() => {
      flowGraph.resize(element.clientWidth, element.clientHeight);
      flowGraph.centerContent();
      document.addEventListener('fullscreenchange', onFullscreenChange);
      flowGraph.trigger('flowGraph:fullscreenchange');
    }, 300);
  },
  getIcon() {
    return <FullscreenOutlined />;
  },
  disabled() {
    return false;
  },
});

const FullscreenExit: React.FC<IProps> = makeBtnWidget({
  tooltip: '退出全屏',
  handler() {
    if(getFullscreenElement()) {
      if (onFullscreenChange) {
        onFullscreenChange();
      }
      const element = document as any;
      if (element.exitFullscreen) {
        element.exitFullscreen();
      } else if (element.mozCancelFullScreen) {
        element.mozCancelFullScreen();
      } else if (element.msExitFullscreen) {
        element.msExitFullscreen();
      } else if (element.webkitExitFullscreen) {
        element.webkitExitFullscreen();
      }
    }
  },
  getIcon() {
    return <FullscreenExitOutlined />;
  },
  disabled() {
    return false;
  },
});

const FullscreenTools: React.FC<any> = (props) => {
  const flowGraph = useGraph();
  const graphWrapperRef = useGraphWrapper();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    function fullscreenchange() {
      setIsFullscreen(!isFullscreen);
    }
    flowGraph.on('flowGraph:fullscreenchange', fullscreenchange);
    return () => {
      flowGraph.off('flowGraph:fullscreenchange', fullscreenchange);
    }
  }, [flowGraph, setIsFullscreen, isFullscreen]);

  if (isFullscreen) {
    return <FullscreenExit {...props} graphWrapperRef={graphWrapperRef} />
  }

  return <Fullscreen {...props} graphWrapperRef={graphWrapperRef} />
}

export default FullscreenTools;
