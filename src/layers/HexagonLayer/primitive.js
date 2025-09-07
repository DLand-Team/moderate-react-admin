/*
 * @Author: hijiangtao (hijiangtao@gmail.com)  
 * @Date: 2019-03-09 14:51:42 
 * @Desc: Hexagon Primitive Layer 
 * @Last Modified time: 2019-03-09 14:51:42 
 */

import {HexagonCellLayer, CompositeLayer} from 'deck.gl';

const DEFAULT_COLOR = [255, 0, 255, 255];

// const COLOR_MAP = [
//   [35, 255, 222],
//   [75, 255, 35],
//   [164, 255, 35],
//   [255,140,0],
//   [255,56,0],
//   [255,0,0],
// ];

const MOCK_DATA = [
  { COORDINATES: [-122.4, 37.7], COLOR: [255, 0, 0], SPACES: 100 },
  { COORDINATES: [-122.4, 37.7], COLOR: [255, 0, 0], SPACES: 100 },
  { COORDINATES: [-122.4, 37.7], COLOR: [255, 0, 0], SPACES: 100 },
  { COORDINATES: [-122.4, 37.7], COLOR: [255, 0, 0], SPACES: 100 },
  { COORDINATES: [-122.4, 37.7], COLOR: [255, 0, 0], SPACES: 100 },
  { COORDINATES: [-122.4, 37.7], COLOR: [255, 0, 0], SPACES: 100 },
  { COORDINATES: [-122.4, 37.7], COLOR: [255, 0, 0], SPACES: 100 },
  { COORDINATES: [-122.4, 37.7], COLOR: [255, 0, 0], SPACES: 100 },
  { COORDINATES: [-122.4, 37.7], COLOR: [255, 0, 0], SPACES: 100 },
  { COORDINATES: [-122.4, 37.7], COLOR: [255, 0, 0], SPACES: 100 },
]

class HexagonPrimitiveLayer extends CompositeLayer {
  renderLayers() {
    const {
      radius = 20000, 
      angle = 0,
      upperPercentile = 100, 
      coverage = 1, 
      extruded, 
      elevationScale = 100, 
      data = MOCK_DATA, 
      colorRange,
      showAnimation, 
      ...otherProps
    } = this.props;
    
    // calculate the maximum value for item.SPACES
    data.sort((a, b) => {
      return b.SPACES - a.SPACES;
    });
    let max = data[0].SPACES;
    let filterDataset = data.slice(0, Math.max(Number.parseInt(data.length*coverage), data.length));

    const layerProps = {
      ...otherProps,
      id: `${this.id}-hp-child`,
      data: filterDataset,
      radius,
      angle,
      elevationScale,
      getColor: x => x.COLOR
    }

    return [
      new HexagonCellLayer(layerProps),
    ];
  }
}

HexagonPrimitiveLayer.layerName = 'HexagonPrimitiveLayer';
HexagonPrimitiveLayer.defaultProps = {
  ...HexagonCellLayer.defaultProps,
  getColor: {type: 'accessor', value: DEFAULT_COLOR},
  getElevation: {type: 'accessor', value: x => x.SPACES},
  getCentroid: {type: 'accessor', value: x => x.COORDINATES},
  lightSettings: {
    type: 'accessor',
    value: {
      lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
      ambientRatio: 0.4,
      diffuseRatio: 0.6,
      specularRatio: 0.2,
      lightsStrength: [0.8, 0.0, 0.8, 0.0],
      numberOfLights: 2,
    },
  },
  radius: {type: 'number', min: 0, value: 20000},
};

export default HexagonPrimitiveLayer;