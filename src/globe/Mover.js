import * as THREE from 'three';
import { getSplineFromCoords, getColor } from './utils';
import { POINT_SEGMENTS } from './constants';

export default function Mover(coords) {
  const geometry = new THREE.SphereGeometry(2, 40, 30);
  const material = new THREE.MeshBasicMaterial({
      color: getColor(Math.random() * 360)
  });
  this.movingPoints = [];

  // 
  const {spline} = getSplineFromCoords(coords);
  const vertex = spline.getPoint(0);

  this.mesh = new THREE.Mesh(geometry, material);
  this.mesh.position.set(vertex.x, vertex.y, vertex.z);

  this.update = (index) => {
    const vertex = spline.getPoint(index / POINT_SEGMENTS);
    this.mesh.position.set(vertex.x, vertex.y, vertex.z);
  }
}