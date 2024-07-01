declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}

// declare module 'cytoscape';
// declare module 'cytoscape-dagre';
// declare module 'cytoscape-elk';
// declare module 'cytoscape-klay';

declare interface LiteFlowNode {
  type: string;
  label: string;
  icon: string;
  shape?: string;
  node?: any;
  disabled?: boolean;
}

declare interface IMenuInfo {
  x: number;
  y: number;
  scene: string;
  visible: boolean;
}

declare type IContextPadScene = 'append' | 'prepend' | 'replace';
