/*
 * @Author: hijiangtao (hijiangtao@gmail.com) 
 * @Date: 2019-01-11 15:00:17 
 * @Description: A Layer based on ScatterplotLayer, which enable point fade-out animation on Scatterplot.
 * @Color schema: [255,0,0] to [255,140,0]
 * @Last Modified time: 2019-01-11 15:00:38
 */

import {ScatterplotLayer, CompositeLayer} from 'deck.gl';
// import AnimationLayer from '../AnimationLayer';

const MAX_RADIUSSCALE = 8; // Default Max Display radiusScale
const OVERFLOW_FLAG = 9999; // Animation End Flag

// class FadeScatterplotLayer extends AnimationLayer {
//   initializeState() {
//     // super.initializeState();

//     this.state = {
//       maxSpaces: 1,
//     }
//   }

//   shouldUpdateState(props) {
//     super.shouldUpdateState(props);
//   }

//   updateState({props, oldProps, changeFlags}) {
//     super.updateState({props, oldProps, changeFlags});

//     /**
//      * Animaiton trigger judgement
//      */
//     if (props.data && props.data.length) {
//       let maxSpaces = 1;
//       props.data.map((d) => {
//         if (d.SPACES > maxSpaces) {
//           maxSpaces = d.SPACES;
//         }
//       });
//       this.setState({maxSpaces});

//       if (!props.showWaveAnimation) return ;
//     }
//   }

//   renderLayers() {
//     let {updateTriggers = {}, showWaveAnimation, data, ...otherProps} = this.props;
//     const {radiusScale, MAX_RADIUSSCALE} = this.state;
//     const {maxSpaces} = this.state;

//     console.log('Scatterplot Layer State', this.state);

//     if (showWaveAnimation) {
//       otherProps.radiusScale = radiusScale;
//     }
    
//     if (radiusScale === MAX_RADIUSSCALE) return [];

//     const alpha = showWaveAnimation ? 255 * (MAX_RADIUSSCALE - radiusScale) / MAX_RADIUSSCALE : 255;

//     const layerProps = {
//       LayerType: ScatterplotLayer,
//       ...otherProps,
//       data,
//       getColor: d => [255, (maxSpaces - d.SPACES) / maxSpaces * 140, 0, alpha],
//       updateTriggers: {
//         ...updateTriggers,
//         getColor: [radiusScale],
//       },
//     };

//     return [
//       new ScatterplotLayer(layerProps)
//     ]
//   }
// }

const quantizeScale = (domain, range, value) => {
  const domainRange = domain[1] - domain[0];
  if (domainRange <= 0) {
    console.warn('quantizeScale: invalid domain, returning range[0]');
    return range[0];
  }
  const step = domainRange / range.length;
  const idx = Math.floor((value - domain[0]) / step);
  const clampIdx = Math.max(Math.min(idx, range.length - 1), 0);

  return range[clampIdx];
}

const getQuantizeScale = (domain, range) => {
  return value => quantizeScale(domain, range, value.SPACES);
}

class FadeScatterplotLayer extends CompositeLayer {
  initializeState() {
    this.state = {
      radiusScale: OVERFLOW_FLAG,
      data: [],
      MAX_RADIUSSCALE,
      raf: null,
      maxSpaces: 1,
      minSpaces: 9999,
    };
  }

  shouldUpdateState({changeFlags}) {
    // console.log(this.state.radiusScale)
    if (changeFlags.propsChanged || changeFlags.dataChanged || changeFlags.stateChanged && this.state.radiusScale !== OVERFLOW_FLAG) {
      return true;
    }

    return false;
  }

  updateState({props, oldProps, changeFlags}) {
    super.updateState({props, oldProps, changeFlags});
    const {propsChanged, stateChanged, dataChanged} = changeFlags;

    // Stop following operation if update is triggered by internal state update
    if (!propsChanged && !dataChanged && stateChanged) return false;

    const prevMaxRadiusScale = this.state.MAX_RADIUSSCALE;
    const newMaxRadiusScale = props.radiusScale || prevMaxRadiusScale;

    if (propsChanged) {  
      this.setState((prevState) => {
        return {
          ...prevState,
          data: props.data || prevState.data,
          MAX_RADIUSSCALE: newMaxRadiusScale,
        }
      })
    }

    /**
     * Animaiton trigger judgement
     */
    if (props.data && props.data.length) {
      // Get max spaces in datasets
      let maxSpaces = 1;
      let minSpaces = 9999;
      props.data.map((d) => {
        if (d.SPACES > maxSpaces) {
          maxSpaces = d.SPACES;
        }

        if (d.SPACES < minSpaces) {
          minSpaces = d.SPACES;
        }
      });
      this.setState({maxSpaces, minSpaces});

      if (!props.showWaveAnimation) {
        this.setState({
          radiusScale: props.radiusScale || MAX_RADIUSSCALE
        });

        return ;
      }

      let {raf} = this.state;
      raf && cancelAnimationFrame(raf);

      this.startAnimation();
    }
  }

  /**
   * Point Spread Animation Method
   */
  startAnimation() {
    // console.log(this.props)
    const { speed } = this.props;
    let {radiusScale, MAX_RADIUSSCALE, raf} = this.state;
    if (radiusScale === OVERFLOW_FLAG) {
      radiusScale = 0;
    }
    radiusScale += speed;
    
    if (radiusScale >= MAX_RADIUSSCALE) {
      radiusScale = OVERFLOW_FLAG;
      window.cancelAnimationFrame(raf);
    }

    this.setState({radiusScale});

    if (radiusScale < MAX_RADIUSSCALE) {
      const raf = window.requestAnimationFrame(this.startAnimation.bind(this));
      this.setState({
        raf
      });
    }
  }

  renderLayers() {
    let {
      updateTriggers = {}, 
      showWaveAnimation, 
      data, 
      colorRange, 
      ...otherProps
    } = this.props;
    const {radiusScale, maxSpaces, minSpaces, MAX_RADIUSSCALE} = this.state;
    if (showWaveAnimation) {
      otherProps.radiusScale = radiusScale;
    }
    
    let alpha = showWaveAnimation ? 255 * (MAX_RADIUSSCALE - radiusScale) / MAX_RADIUSSCALE : 255;
    const visible = radiusScale !== OVERFLOW_FLAG;
    if (!visible) alpha = 0;

    const newColorRange = colorRange.map(e => {
      if (!e.length) {
        console.error('Wrong Color Range Format');
        return [255,255,255,255];
      }

      const newColorArray = e.slice(0, 3);
      return newColorArray.concat(alpha);
    });

    const layerProps = {
      ...otherProps,
      id: `${this.id}-sp-child`,
      data,
      getColor: getQuantizeScale([minSpaces, maxSpaces], newColorRange), // d => [255, (maxSpaces - d.SPACES) / maxSpaces * 140, 0, alpha],
      updateTriggers: {
        ...updateTriggers,
        getColor: [radiusScale],
      },
      visible,
    };

    return [
      new ScatterplotLayer(layerProps)
    ]
  }
}

FadeScatterplotLayer.layerName = 'FadeScatterplotLayer';
FadeScatterplotLayer.defaultProps = {
  ...ScatterplotLayer.defaultProps,
  showWaveAnimation: false,
  speed: 0.02,
  colorRange: {
    type: 'accessor',
    value: [
      [255,140,0],
      [255,112,0],
      [255,84,0],
      [255,56,0],
      [255,28,0],
      [255,0,0],
    ],
  }
};

  
export default FadeScatterplotLayer;