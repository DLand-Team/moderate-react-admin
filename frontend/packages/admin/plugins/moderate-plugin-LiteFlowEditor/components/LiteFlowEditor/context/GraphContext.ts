import { Context, createContext, RefObject } from 'react';
import { Graph } from '@antv/x6';

/**
 * graph: Graph实例
 * graphWrapper: Graph的容器
 */
interface IGraphContext {
  model: any;
  graph: Graph;
  graphWrapper: RefObject<HTMLDivElement>;
}

const defaultValue: IGraphContext = {} as any;

export const GraphContext: Context<IGraphContext> = createContext(defaultValue);

export default GraphContext;
