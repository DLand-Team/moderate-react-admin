/*
 * @Author: hijiangtao (hijiangtao@gmail.com) 
 * @Date: 2019-01-11 15:06:15 
 * @Description: A Layer based on ArcLayer, which enable source-to-target animation on Arc Lines.
 * @Last Modified time: 2019-01-11 15:06:15 
 */

import {ArcLayer} from 'deck.gl';

const DEFAULT_COLOR = [255, 140, 0, 255];

class BrushArcLayer extends ArcLayer {
  draw(opts) {
    if (!this.props.showBrushAnimation) {
      return super.draw(opts);
    }

    const { coef } = this.props;

    const uniforms = Object.assign({}, opts.uniforms, { coef });
    super.draw(Object.assign({}, opts, { uniforms }));
  }

  getShaders() {
    if (!this.props.showBrushAnimation) {
      return super.getShaders();
    }

    // here comes our custom shader
    // we will use step function to create opacity gradient with colorA and color B
    // for more information see https://thebookofshaders.com/05/
    return Object.assign({}, super.getShaders(), {
      inject: {
        'vs:#decl': `
          uniform float coef;
        `,
        'vs:#main-end': `
          if (coef > 0.0) {
            vec4 pct = vec4(segmentRatio);
            pct.a = step(coef, segmentRatio);
            vec4 colorA = instanceTargetColors;
            vec4 colorB = vec4(instanceTargetColors.r, instanceTargetColors.g, instanceTargetColors.b, 0.0);
            vec4 color = mix(colorA, colorB, pct) / 255.;
            vColor = color;
          }
        `,
        'fs:#main-start': `
          if (vColor.a == 0.0) discard;
        `,
      },
    });
  }
}

BrushArcLayer.layerName = 'BrushArcLayer';
BrushArcLayer.defaultProps = {
  ...ArcLayer.defaultProps,
  showBrushAnimation: false,
  getSourcePosition: {type: 'accessor', value: x => x.source},
  getTargetPosition: {type: 'accessor', value: x => x.target},
  getSourceColor: {type: 'accessor', value: DEFAULT_COLOR},
  getTargetColor: {type: 'accessor', value: DEFAULT_COLOR},
  getStrokeWidth: {type: 'accessor', value: 1},
};

  
export default BrushArcLayer;