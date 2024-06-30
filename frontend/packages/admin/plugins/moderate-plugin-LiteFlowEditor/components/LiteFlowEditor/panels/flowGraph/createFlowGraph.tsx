import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import { Cell, Graph, NodeView } from '@antv/x6';
import { debounce } from 'lodash';
import { MIN_ZOOM, MAX_ZOOM } from '../../constant';
// import MiniMapSimpleNode from './miniMapSimpleNode';
import {
  LITEFLOW_ANCHOR,
  LITEFLOW_ROUTER,
  registerEvents,
  registerShortcuts,
} from '../../common';

const createFlowChart = (
  container: HTMLDivElement,
  miniMapContainer: HTMLDivElement,
): Graph => {
  const flowGraph = new Graph({
    autoResize: true,
    container,
    rotating: false,
    resizing: false,
    onEdgeLabelRendered: (args) => {
      const { edge, selectors, label } = args;
      const content = selectors.foContent as HTMLElement;
      if (content) {
        content.style.display = 'flex';
        content.style.alignItems = 'center';
        content.style.justifyContent = 'center';
        content.style.overflow = 'hidden';
        if (label?.attrs?.label.text === '+') {
          const showContextPad = debounce((info: any) => {
            flowGraph.trigger('graph:showContextPad', info);
          }, 100);
          const handleOnClick = (event: any) => {
            showContextPad({
              x: event.clientX,
              y: event.clientY,
              edge,
            });
          };
          ReactDOM.render(
            <Button
              size="small"
              onClick={handleOnClick}
              className="liteflow-edge-add-button"
            >
              +
            </Button>,
            content,
          );
        } else {
          content.appendChild(
            document.createTextNode(label?.attrs?.label.text + ''),
          );
        }
      }
    },
    // https://x6.antv.vision/zh/docs/tutorial/basic/clipboard
    clipboard: {
      enabled: true,
      useLocalStorage: true,
    },
    // https://x6.antv.vision/zh/docs/tutorial/intermediate/connector
    connecting: {
      snap: true,
      allowBlank: false,
      allowLoop: false,
      allowNode: false,
      allowEdge: false,
      dangling: true,
      highlight: true,
      anchor: LITEFLOW_ANCHOR, // LITEFLOW_ANCHOR, // 'center',
      connectionPoint: 'bbox',
      connector: {
        name: 'rounded', //两条线交叉时，出现线桥。
        args: {
          radius: 8,
        },
      },
      router: LITEFLOW_ROUTER, // LITEFLOW_ROUTER, // 'normal',
      validateEdge: (args) => {
        const { edge } = args;
        return !!(edge?.target as any)?.port;
      },
      validateConnection({
        sourceView,
        targetView,
        sourceMagnet,
        targetMagnet,
      }) {
        if (!sourceMagnet) {
          return false;
        } else if (!targetMagnet) {
          return false;
        } else {
          return sourceView !== targetView;
        }
      },
    },
    // https://x6.antv.vision/zh/docs/tutorial/basic/background
    background: {
      color: '#f4f7fc',
    },
    // https://x6.antv.vision/zh/docs/tutorial/basic/grid
    grid: {
      visible: true,
    },
    // https://x6.antv.vision/zh/docs/tutorial/basic/selection
    selecting: {
      enabled: true,
      rubberband: false, // 启用框选
      movable: true,
      multiple: true,
      strict: true,
      showNodeSelectionBox: true,
      selectNodeOnMoved: true,
      pointerEvents: 'none',
    },
    // https://x6.antv.vision/zh/docs/tutorial/basic/snapline
    snapline: {
      enabled: true,
      clean: 100,
    },
    // https://x6.antv.vision/zh/docs/tutorial/basic/keyboard
    keyboard: {
      enabled: true,
      global: false,
    },
    // https://x6.antv.vision/zh/docs/tutorial/basic/history
    history: {
      enabled: true,
      beforeAddCommand(event, args: any) {
        if (args.options) {
          return args.options.ignore !== true;
        }
      },
    },
    // https://x6.antv.vision/zh/docs/tutorial/basic/minimap
    minimap: {
      width: 150,
      height: 150,
      minScale: MIN_ZOOM,
      maxScale: MAX_ZOOM,
      enabled: true,
      scalable: false,
      container: miniMapContainer,
      graphOptions: {
        async: true,
        getCellView(cell: Cell) {
          if (cell.isNode()) {
            return NodeView.registry.get('react-shape-view');
            // return MiniMapSimpleNode;
          }
        },
        createCellView(cell: Cell) {
          if (cell.isEdge()) {
            return null;
          }
        },
      },
    },
    // https://x6.antv.vision/zh/docs/tutorial/basic/scroller
    scroller: {
      enabled: true,
      pageVisible: false,
      pageBreak: false,
      pannable: true,
    },
    mousewheel: {
      enabled: true,
      minScale: MIN_ZOOM,
      maxScale: MAX_ZOOM,
      modifiers: ['ctrl', 'meta'],
    },
    // embedding: {
    //   enabled: true,
    //   findParent({ node }) {
    //     const bbox = node.getBBox();
    //     return this.getNodes().filter((grahpNode) => {
    //       const nodeData = grahpNode.getData();
    //       if (nodeData && nodeData.parent) {
    //         const targetBBox = grahpNode.getBBox();
    //         return bbox.isIntersectWithRect(targetBBox);
    //       }
    //       return false;
    //     });
    //   },
    //   frontOnly: false,
    // },
    interacting: {
      nodeMovable: true,
      edgeLabelMovable: true,
    },
  });
  registerEvents(flowGraph);
  registerShortcuts(flowGraph);
  return flowGraph;
};

export default createFlowChart;
