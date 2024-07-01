export { default as registerEvents } from './events';
export { default as registerShortcuts } from './shortcuts';

import { Graph } from '@antv/x6';

import { LITEFLOW_ANCHOR, LITEFLOW_EDGE, LITEFLOW_ROUTER } from '../constant';

import { default as liteflowEdge } from './edge';
import { default as liteflowRouter } from './router';
import { default as liteflowAnchor } from './anchor';

Graph.registerEdge(LITEFLOW_EDGE, liteflowEdge);
Graph.registerRouter(LITEFLOW_ROUTER, liteflowRouter);
Graph.registerAnchor(LITEFLOW_ANCHOR, liteflowAnchor);

export { LITEFLOW_EDGE, LITEFLOW_ROUTER, LITEFLOW_ANCHOR };
