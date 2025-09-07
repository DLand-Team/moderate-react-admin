/*
 * @Author: hijiangtao (hijiangtao@gmail.com) 
 * @Date: 2019-01-14 17:45:07 
 * @Description: Screengrid display layer.
 * @Last Modified time: 2019-01-14 17:45:07 
 */

import {ScreenGridLayer, CompositeLayer} from 'deck.gl';

class PreConfigScreenGridLayer extends CompositeLayer {
  renderLayers() {
    const {data, getPosition, colorRange, getWeight, cellSize = 5, gpuAggregation = true, coverage = 1, ...otherProps} = this.props;

    /**
     * Sort data by descending order with coverage (0~1) condition
     */
    let splitData = data;
    if (typeof data !== 'string') {
      data.sort((a, b) => {
        return b.SPACES - a.SPACES;
      });
      const coverageLen = data.length * coverage - 1 >= 0 ? parseInt(data.length * coverage - 1, 10) : 0;
      splitData = data.slice(0, coverageLen);
    }

    return [
      new ScreenGridLayer({
        ...otherProps,
        id: `${this.id}-sg-child`,
        data: splitData,
        getPosition,
        getWeight,
        cellSizePixels: cellSize,
        colorRange,
      }),
    ];
  }
}

PreConfigScreenGridLayer.layerName = 'PreConfigScreenGridLayer';
PreConfigScreenGridLayer.defaultProps = {
  ...ScreenGridLayer.defaultProps,
  getPosition: {type: 'accessor', value: x => x.COORDINATES},
  getWeight: {type: 'accessor', value: x => x.SPACES},
  colorRange: {
    type: 'accessor',
    value: [
      [255, 255, 178, 25],
      [254, 217, 118, 85],
      [254, 178, 76, 127],
      [253, 141, 60, 170],
      [240, 59, 32, 212],
      [189, 0, 38, 255],
    ]
  }
};
  
export default PreConfigScreenGridLayer;