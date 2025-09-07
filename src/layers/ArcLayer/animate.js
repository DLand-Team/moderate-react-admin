/*
 * @Author: hijiangtao (hijiangtao@gmail.com) 
 * @Date: 2019-01-11 15:06:15 
 * @Description: A Layer based on ArcLayer, which enable source-to-target animation on Arc Lines.
 * @Last Modified time: 2019-01-11 15:06:15 
 */

import {CompositeLayer} from 'deck.gl';
import ArcLayer from './index';

const MAX_COEF = 1; // Default Max Display coef
const OVERFLOW_FLAG = 9999; // Animation End Flag

class BrushArcLayer extends CompositeLayer {
  initializeState() {
    this.state = {
      coef: OVERFLOW_FLAG,
      data: [],
      raf: null,
    };
  }

  shouldUpdateState({changeFlags}) {
    if (changeFlags.propsChanged || changeFlags.dataChanged || changeFlags.stateChanged && this.state.coef !== OVERFLOW_FLAG) {
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
        }
      })
    }

    /**
     * Animaiton trigger judgement
     */
    if (props.data && props.data.length) {
      if (!props.showBrushAnimation) {
        this.setState({
          coef: props.coef || MAX_COEF
        });

        return ;
      }

      let {raf} = this.state;
      raf && cancelAnimationFrame(raf);

      /**
       * Arc Brush Animation Method
       */
      const startAnimation = () => {
        const { speed = 0.005 } = props;
        let {coef} = this.state;
        if (coef === OVERFLOW_FLAG) {
          coef = 0;
        }
        coef += speed;
        
        if (coef >= MAX_COEF) {
          coef = OVERFLOW_FLAG;
          cancelAnimationFrame(raf);
        }
    
        this.setState({coef});
    
        if (coef < MAX_COEF) {
          const raf = window.requestAnimationFrame(startAnimation);
          this.setState({
            raf
          });
        }
      }

      startAnimation();
    }
  }

  renderLayers() {
    let {
      updateTriggers = {}, 
      showBrushAnimation, 
      data, 
      getSourcePosition, 
      getTargetPosition, 
      getSourceColor,
      getTargetColor,
      getStrokeWidth,
      ...otherProps} = this.props;
    const {coef} = this.state;
    if (showBrushAnimation) {
      otherProps.coef = coef;
    }
    
    if (coef === OVERFLOW_FLAG) return [];

    const layerProps = {
      ...otherProps,
      id: `${this.id}-aa-child`,
      data,
      getSourcePosition,
      getTargetPosition,
      getSourceColor,
      getTargetColor,
      updateTriggers: {
        ...updateTriggers,
        getColor: [coef],
      },
      getStrokeWidth,
      showBrushAnimation,
    };

    return [
      new ArcLayer(layerProps)
    ]
  }
}

BrushArcLayer.layerName = 'BrushArcLayer';
BrushArcLayer.defaultProps = {
  ...ArcLayer.defaultProps,
  showBrushAnimation: false,
};

  
export default BrushArcLayer;