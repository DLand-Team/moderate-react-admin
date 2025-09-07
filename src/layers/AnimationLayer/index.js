/*
 * @Author: hijiangtao (hijiangtao@gmail.com) 
 * @Date: 2019-01-14 10:53:03 
 * @Description: Deprecated Animation Base layer, need to be reconstructed.
 * @Last Modified time: 2019-01-14 10:53:03 
 */

import {Layer, ScatterplotLayer, CompositeLayer} from 'deck.gl';

const MAX_RADIUSSCALE = 8; // Default Max Display radiusScale
const OVERFLOW_FLAG = 9999; // Animation End Flag

class AnimationLayer extends CompositeLayer {
  initializeState() {
    super.initializeState();

    // replace this with this.state.attributeManager.addInstanced
    this.state = {
      radiusScale: OVERFLOW_FLAG,
      data: [],
      MAX_RADIUSSCALE,
      raf: null,
    };
  }

  shouldUpdateState({changeFlags}) {
    if (changeFlags.propsChanged || changeFlags.dataChanged || changeFlags.stateChanged && this.state.radiusScale !== OVERFLOW_FLAG) {
      return true;
    }

    return false;
  }

  updateState({props, oldProps, changeFlags}) {
    super.updateState({props, oldProps, changeFlags});
    const {propsChanged, stateChanged, dataChanged} = changeFlags;
    if (!propsChanged && !dataChanged && stateChanged) return false;

    if (propsChanged) {
      this.setState((prevState) => {
        return {
          ...prevState,
          data: props.data || prevState.data,
          MAX_RADIUSSCALE: props.radiusScale || prevState.MAX_RADIUSSCALE,
        }
      })
    }

    /**
     * Animaiton trigger judgement
     */
    if (props.data && props.data.length) {
      let {raf} = this.state;
      raf && cancelAnimationFrame(raf);

      if (!props.showAnimation) return null;

      /**
       * Animation Method
       */
      const startAnimation = () => {
        const { speed = 0.02 } = props;
        let {radiusScale = 0} = this.state;
        if (radiusScale === OVERFLOW_FLAG) {
          radiusScale = 0;
        }
        radiusScale += speed;
        
        if (radiusScale >= MAX_RADIUSSCALE) {
          radiusScale = OVERFLOW_FLAG;
          cancelAnimationFrame(raf);
        }
    
        this.setState({radiusScale});
    
        if (radiusScale < MAX_RADIUSSCALE) {
          const raf = window.requestAnimationFrame(startAnimation);
          this.setState({
            raf
          });
        }
      }

      startAnimation();
    }
  }

  // draw(opts) {
  //   const {radiusScale,} = this.state;
  //   console.log('Animation Layer radiusScale', radiusScale);
    
  //   return super.draw(Object.assign({}, opts, {
  //     radiusScale,
  //   }))
  // }
}

AnimationLayer.layerName = 'AnimationLayer';
AnimationLayer.defaultProps = {
  ...Layer.defaultProps,
  showAnimation: false,
};

  
export default AnimationLayer;