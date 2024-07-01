import { Cell, Graph } from '@antv/x6';

export const hasCellSelected = (flowGraph: Graph): boolean => {
  return flowGraph.getSelectedCellCount() > 0;
};

export const hasNodeSelected = (flowGraph: Graph): boolean => {
  return (
    flowGraph.getSelectedCells().filter((cell: Cell) => cell.isNode()).length >
    0
  );
};

export const hasEdgeSelected = (flowGraph: Graph): boolean => {
  return (
    flowGraph.getSelectedCells().filter((cell: Cell) => cell.isEdge()).length >
    0
  );
};

export const getSelectedNodes = (flowGraph: Graph): Cell[] => {
  return flowGraph.getSelectedCells().filter((cell: Cell) => cell.isNode());
};

export const getSelectedEdges = (flowGraph: Graph): Cell[] => {
  return flowGraph.getSelectedCells().filter((cell: Cell) => cell.isEdge());
};

export const toSelectedCellsJSON = (
  flowGraph: Graph,
): { cells: Cell.Properties[] } => {
  const json = flowGraph.toJSON();
  const selectedCells = flowGraph.getSelectedCells();
  return {
    cells: json.cells.filter((cell) =>
      selectedCells.find((o) => o.id === cell.id),
    ),
  };
};
