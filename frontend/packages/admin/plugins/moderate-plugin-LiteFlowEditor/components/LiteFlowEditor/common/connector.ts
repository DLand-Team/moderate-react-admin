import { Path, Point } from '@antv/x6';
import { NODE_HEIGHT } from '../constant';

export default function connector(
  sourcePoint: Point.PointLike,
  targetPoint: Point.PointLike,
  routePoints: Point.PointLike[],
  args: any,
) {
  let path: Path;
  const { side = 'left', height = NODE_HEIGHT } = args;
  const radius = height / 2;
  if (side === 'right') {
    const prev = Point.create(sourcePoint.x + radius, sourcePoint.y - radius);
    path = new Path(Path.createSegment('M', prev));
    path.arcTo(12, 12, 0, 1, 1, targetPoint.x + radius, targetPoint.y + radius);
  } else {
    const prev = Point.create(sourcePoint.x - radius, sourcePoint.y - radius);
    path = new Path(Path.createSegment('M', prev));
    path.arcTo(12, 12, 0, 1, 1, targetPoint.x - radius, targetPoint.y + radius);
  }
  return path.serialize();
}
