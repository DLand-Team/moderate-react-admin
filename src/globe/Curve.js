import * as THREE from 'three';
import { getSplineFromCoords } from './utils';
import { CURVE_SEGMENTS } from './constants';

export default function Curve(coords, material) {
  const { spline } = getSplineFromCoords(coords);

  // add curve geometry
  this.curveGeometry = new THREE.BufferGeometry();
  const points = new Float32Array(CURVE_SEGMENTS * 3);
  const vertices = spline.getPoints(CURVE_SEGMENTS - 1);

  for (let i = 0, j = 0; i < vertices.length; i++) {
    const vertex = vertices[i];
    /*eslint-disable */
    points[j++] = vertex.x;
    points[j++] = vertex.y;
    points[j++] = vertex.z;
  }

  // !!!
  // You can use setDrawRange to animate the curve
  this.curveGeometry.addAttribute('position', new THREE.BufferAttribute(points, 3));
  this.curveGeometry.setDrawRange(0, CURVE_SEGMENTS / 7);

  this.mesh = new THREE.Line(this.curveGeometry, material);
}
