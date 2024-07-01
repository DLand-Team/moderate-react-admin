import { Point, NodeView } from '@antv/x6';

export default function anchor(view: NodeView) {
  const { x, y } = view.cell.position();
  const { width, height } = view.cell.size();
  return Point.create(x + width / 2, y + height / 2);
}
