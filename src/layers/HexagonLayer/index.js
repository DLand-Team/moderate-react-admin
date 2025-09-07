/*
 * @Author: hijiangtao (hijiangtao@gmail.com) 
 * @Date: 2019-01-14 17:44:05 
 * @Description: Hexagon Animation layer.
 * @Last Modified time: 2019-01-14 17:44:05 
 */

import React, { memo } from 'react';
import {HexagonLayer, CompositeLayer} from 'deck.gl';
import HexagonPrimitiveLayer from './primitive';

const ELEVATION_SCALE = {min: 1, max: 500};
const OVERFLOW_FLAG = 9999;

class AugmentHexagonLayer extends CompositeLayer {
  initializeState() {
    super.initializeState();

    this.state = {
      elevationScale: ELEVATION_SCALE.min,
      startAnimationTimer: null,
      intervalTimer: null,
    };
  }

  shouldUpdateState({changeFlags}) {
    if (changeFlags.propsChanged || changeFlags.dataChanged || changeFlags.stateChanged && this.state.elevationScale !== OVERFLOW_FLAG) {
      return true;
    }

    return false;
  }

  updateState({props, oldProps, changeFlags}) {
    super.updateState({props, oldProps, changeFlags});
    const {propsChanged, stateChanged, dataChanged} = changeFlags;
    if (!propsChanged && !dataChanged && stateChanged) return false;

    const {showAnimation} = props;
    if (propsChanged) {
      this.setState((prevState) => {
        return {
          ...prevState,
          data: props.data || prevState.data,
        }
      })
    }

    /**
     * Animaiton trigger judgement
     */
    if (props.data && props.data.length) {
      if (!showAnimation) {
        this.setState({
          elevationScale: ELEVATION_SCALE.max
        });

        return ;
      }

      let {startAnimationTimer, intervalTimer} = this.state;
      startAnimationTimer && window.clearTimeout(startAnimationTimer);
      intervalTimer && window.clearInterval(intervalTimer);
      
      let {elevationScale} = this.state;
      if (elevationScale === OVERFLOW_FLAG) {
        elevationScale = ELEVATION_SCALE.min;
      }

      const _animateHeight = () => {
        if (elevationScale >= ELEVATION_SCALE.max) {
          elevationScale = OVERFLOW_FLAG;
          _stopAnimate(); // eslint-disable-line
        } else {
          elevationScale += 4;
        }
        
        this.setState({elevationScale});
      }

      const _startAnimate = () => {
        this.setState({
          intervalTimer: window.setInterval(_animateHeight, 20)
        }) // eslint-disable-line
      }

      const _animate = () => {    
        // wait 1.5 secs to start animation so that all data are loaded
        this.setState({
          startAnimationTimer: window.setTimeout(_startAnimate, 1500)
        }) // eslint-disable-line
      }
    
      const _stopAnimate = () => {
        let {startAnimationTimer, intervalTimer} = this.state;
        window.clearTimeout(startAnimationTimer);
        window.clearInterval(intervalTimer);
      }
    
      _animate();
    }
  }

  renderLayers() {
    const {
      radius = 1000, 
      upperPercentile = 100, 
      coverage = 1, 
      extruded, 
      elevationRange, 
      data, 
      colorRange,
      showAnimation, 
      ...otherProps
    } = this.props;
    const {elevationScale} = this.state;
    if (showAnimation) {
      otherProps.elevationScale = elevationScale;
    }
    
    if (elevationScale === OVERFLOW_FLAG) return [];

    const layerProps = {
      ...otherProps,
      id: `${this.id}-h-child`,
      coverage,
      data,
      colorRange,
      elevationRange,
      extruded,
      radius,
      upperPercentile,
    }

    return [
      new HexagonLayer(layerProps)
    ];
  }
}

AugmentHexagonLayer.layerName = 'AugmentHexagonLayer';
AugmentHexagonLayer.defaultProps = {
  ...HexagonLayer.defaultProps,
  showAnimation: false,
  getPosition: {type: 'accessor', value: x => x.COORDINATES},
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
  colorRange: {
    type: 'accessor',
    value: [
      [34,93,202],
      [37,102,222],
      [56,115,225],
      [76,129,228],
      [96,143,231],
      [116,157,234],
    ],
  },
  elevationRange: {
    type: 'accessor',
    value: [0, 3000],
  },
  extruded: {
    type: 'accessor',
    value: true,
  }
};

const HexagonCollection = (props) => {
  if (props.primitive) {
    return <HexagonPrimitiveLayer {...props} />;
  } else {
    return <AugmentHexagonLayer {...props} />;
  }
}

export default HexagonCollection;
