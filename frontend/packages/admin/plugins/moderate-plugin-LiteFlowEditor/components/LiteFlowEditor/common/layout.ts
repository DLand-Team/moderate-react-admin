import { Graph, Node } from '@antv/x6';
import { DagreLayout, DagreLayoutOptions } from '@antv/layout';
import { NODE_WIDTH, RANK_SEP, NODE_SEP, ConditionTypeEnum } from '../constant';
// import dagre from '@dagrejs/dagre';
// import ELK from 'elkjs/lib/elk.bundled.js';
// import cytoscape from 'cytoscape';
// import cyDagre from 'cytoscape-dagre';
// import cyElk from 'cytoscape-elk';
// import cyKlay from 'cytoscape-klay';

// cytoscape.use( cyDagre );
// cytoscape.use( cyElk );
// cytoscape.use( cyKlay );

const rankdir: DagreLayoutOptions['rankdir'] = 'LR';
const align: DagreLayoutOptions['align'] = undefined;
const nodeSize: number = NODE_WIDTH;
const ranksep: number = RANK_SEP;
const nodesep: number = NODE_SEP;
const controlPoints: DagreLayoutOptions['controlPoints'] = false;
const begin: [number, number] = [40, 40];

export const forceLayout = (flowGraph: Graph, cfg: any = {}): void => {
  antvDagreLayout(flowGraph, cfg);

  // dagreLayout(flowGraph, cfg);
};

/**
 * 使用AntV的图布局包实现布局
 * @param flowGraph 图实例
 * @param cfg 配置
 */
function antvDagreLayout(flowGraph: Graph, cfg: any = {}): void {
  const dagreLayout: DagreLayout = new DagreLayout({
    begin,
    type: 'dagre',
    rankdir,
    align,
    nodeSize,
    ranksep,
    nodesep,
    controlPoints,
  });

  dagreLayout.updateCfg({
    // ranker: 'tight-tree', // 'tight-tree' 'longest-path' 'network-simplex'
    // nodeOrder,
    // preset: preset(flowGraph),
    ...cfg,
  });

  const { nodes: newNodes } = dagreLayout.layout({
    // @ts-ignore
    nodes: flowGraph.getNodes().map((node) => {
      node.setZIndex(1);
      return node.toJSON();
    }), // @ts-ignore
    edges: flowGraph.getEdges().map((edge) => {
      edge.setZIndex(0);
      return edge.toJSON();
    }),
  });

  flowGraph.freeze();

  newNodes?.forEach((node: any) => {
    const cell: Node | undefined = flowGraph.getCellById(node.id) as
      | Node
      | undefined;
    if (cell) {
      cell.position(node.x, node.y);
    }
  });

  fineTuneLayer(flowGraph);

  fineTuneCatchNodes(flowGraph);

  flowGraph.unfreeze();
}

/**
 * 解决Dagre布局部分节点层次过低问题
 * @param flowGraph 图实例
 */
function fineTuneLayer(flowGraph: Graph) {
  let queue = flowGraph.getRootNodes();
  let layer: number = 0;

  while (queue.length) {
    let cells: Node[] = [];
    queue.forEach((next: Node) => {
      const { y } = next.position();
      next.position(begin[0] + layer * (ranksep + nodeSize + 40), y);

      const neighbors = flowGraph.getNeighbors(next, {
        outgoing: true,
      }) as Node[];
      cells = cells.concat(neighbors);
    });
    layer++;
    queue = cells;
  }
}

/**
 * 调整捕获异常节点/CATCH的布局
 * @param flowGraph 图实例
 */
function fineTuneCatchNodes(flowGraph: Graph) {
  let queue = flowGraph.getRootNodes();

  while (queue.length) {
    let cells: Node[] = [];
    queue.forEach((next: Node) => {
      const { model } = next.getData();
      const currentModel = model.proxy || model;
      if (currentModel.type === ConditionTypeEnum.CATCH) {
        if (next.shape === ConditionTypeEnum.CATCH) {
          // CATCH start
          beforeCatchStart(flowGraph, next);
        } else {
          // CATCH end
          afterCatchEnd(flowGraph, next);
        }
      }

      const neighbors = flowGraph.getNeighbors(next, {
        outgoing: true,
      }) as Node[];
      cells = cells.concat(neighbors);
    });
    queue = cells;
  }
}

function beforeCatchStart(flowGraph: Graph, catchStart: Node) {
  const catchRootNode = (flowGraph.getNeighbors(catchStart, {
    outgoing: true,
  }) as Node[])[0];

  const deltaY = catchStart.position().y - catchRootNode.position().y;

  let queue = [catchStart];

  while (queue.length) {
    let cells: Node[] = [];
    queue.forEach((next: Node) => {
      const { x, y } = next.position();
      next.position(x, y - deltaY);
      
      const neighbors = flowGraph.getNeighbors(next, {
        incoming: true,
      }) as Node[];
      cells = cells.concat(neighbors);
    });
    queue = cells;
  }
}

function afterCatchEnd(flowGraph: Graph, catchEnd: Node) {
  const catchRootNode = (flowGraph.getNeighbors(catchEnd, {
    incoming: true,
  }) as Node[])[0];

  const deltaY = catchEnd.position().y - catchRootNode.position().y;

  let queue = [catchEnd];

  while (queue.length) {
    let cells: Node[] = [];
    queue.forEach((next: Node) => {
      const { x, y } = next.position();
      next.position(x, y - deltaY);
      
      const neighbors = flowGraph.getNeighbors(next, {
        outgoing: true,
      }) as Node[];
      cells = cells.concat(neighbors);
    });
    queue = cells;
  }
}

/**
 * 使用Dagre原始包实现布局
 * @param flowGraph 图实例
 * @param cfg 配置
 */
// function dagreLayout(flowGraph: Graph, cfg: any = {}): void {
//   const g = new dagre.graphlib.Graph();
//   g.setGraph({ rankdir, nodesep: 50, ranksep: 50 });
//   g.setDefaultEdgeLabel(() => ({}));

//   flowGraph.getNodes().forEach((node) => {
//     node.setZIndex(1);
//     g.setNode(node.id, { width: nodeSize, height: nodeSize });
//   })

//   flowGraph.getEdges().forEach((edge) => {
//     edge.setZIndex(0);
//     const source = edge.getSourceNode() as Node;
//     const target = edge.getTargetNode() as Node;
//     g.setEdge(source?.id, target?.id);
//   })

//   dagre.layout(g);

//   flowGraph.freeze();

//   g.nodes().forEach((id) => {
//     const node = flowGraph.getCellById(id) as Node;
//     if (node) {
//       const pos = g.node(id);
//       node.position(pos.x, pos.y);
//     }
//   })

//   flowGraph.unfreeze();
// }

/**
 * 使用ELK实现布局
 * @param flowGraph 图实例
 * @param cfg 配置
 */
// function elkLayout(flowGraph: Graph, cfg: any = {}) {
//   const elk = new ELK();
//   const elkOptions: Record<string, any> = {
//     'elk.algorithm': 'layered',
//     'elk.layered.spacing.nodeNodeBetweenLayers': 80,
//     'elk.spacing.nodeNode': 20,
//     'elk.direction': 'RIGHT',
//   };
//   const nodes = flowGraph
//     .getCells()
//     .filter((cell) => cell.isNode())
//     .map((cell) => cell.toJSON()) as any[];
//   const edges = flowGraph
//     .getCells()
//     .filter((cell) => cell.isEdge())
//     .map((cell) => cell.toJSON()) as any[];
//   const elkGraph = {
//     id: 'root',
//     layoutOptions: elkOptions,
//     children: nodes.map((node) => ({
//       ...node,
//       width: nodeSize,
//       height: nodeSize,
//     })),
//     edges: edges.map((edge) => ({
//       ...edge,
//       source: edge.source.cell,
//       target: edge.target.cell,
//     })),
//   };
//   elk
//     .layout(elkGraph as any)
//     .then((layoutedGraph: any) => {
//       flowGraph.freeze();
//       layoutedGraph.children.forEach((node: any) => {
//         const current: Node | undefined = flowGraph.getCellById(node?.id) as Node | undefined;
//         if (current) {
//           current.position(node.x, node.y);
//         }
//       });
//       flowGraph.unfreeze();
//     })
//     .catch(console.error);
// }
