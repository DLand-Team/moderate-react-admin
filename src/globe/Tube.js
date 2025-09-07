import * as THREE from 'three';
import { getSplineFromCoords } from './utils';
import { CURVE_SEGMENTS } from './constants';

const TUBE_RADIUS_SEGMENTS = 2;
const DEFAULT_TUBE_RADIUS = 2;
const DRAW_RANGE_DELTA = 16;
const MAX_DRAW_RANGE = DRAW_RANGE_DELTA * CURVE_SEGMENTS;

export default function TubeAnim(coords, material) {
  const { spline } = getSplineFromCoords(coords);
  const geometry = new THREE.TubeBufferGeometry(spline, CURVE_SEGMENTS, DEFAULT_TUBE_RADIUS, TUBE_RADIUS_SEGMENTS, false);

  geometry.setDrawRange(0, MAX_DRAW_RANGE);

  this.mesh = new THREE.Mesh(geometry, material);
}
