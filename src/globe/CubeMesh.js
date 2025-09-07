import * as THREE from 'three';
import { getCubeCoordsFromLatLng, getColor } from './utils';

/**
* add single Cube
* @param {*} lat 
* @param {*} lng 
* @param {*} size 
* @param {*} color 
*/
const addSingleCube = (pointGeo, {point, lat, lng, size, color}) => {
  const vec3 = getCubeCoordsFromLatLng({lat, lng});

  point.position.x = vec3.x;
  point.position.y = vec3.y;
  point.position.z = vec3.z;

  point.lookAt(new THREE.Vector3(0,0,0));

  const zoomFactor = 0.15;
  point.scale.z = Math.max(size, zoomFactor);
  point.updateMatrix();

  point.geometry.faces.forEach((each, i) => {
      point.geometry.faces[i].color = color;
  });

  pointGeo.merge(point.geometry, point.matrix);
};

/**
 * create Cube Unit
 */
const createPointUnit = () => {
  const geometry = new THREE.BoxGeometry(2, 2, 1);
  geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, -0.5));

  const mesh = new THREE.Mesh(geometry);
  return mesh;
};

/**
* Cube class
* @param {*} data 
*/
export default function CubeMesh(data) {
  const pointGeo = new THREE.Geometry();

  const point = createPointUnit();

  data.forEach((item) => {
    const [lat, lng] = item;
    const size = Math.random() * 60;
    const color = getColor(size);
    addSingleCube(pointGeo, {point, lat, lng, size, color});
  })

  const mat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    vertexColors: THREE.FaceColors,
    morphTargets: false,
    transparent: true,
    opacity: 0.7
  });

  this.cubemesh = new THREE.Mesh(pointGeo, mat);
};