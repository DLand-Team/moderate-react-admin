import { Markup } from '@antv/x6';
import { LINE_COLOR } from '../constant';

export default {
  inherit: 'edge',
  markup: [
    {
      tagName: 'path',
      selector: 'wrap',
      groupSelector: 'lines',
      attrs: {
        fill: 'none',
        cursor: 'pointer',
        stroke: 'transparent',
        strokeLinecap: 'round',
      },
    },
    {
      tagName: 'path',
      selector: 'line',
      groupSelector: 'lines',
      attrs: {
        fill: 'none',
        pointerEvents: 'none',
      },
    },
  ],
  attrs: {
    wrap: {
      fill: 'none',
      cursor: 'pointer',
      stroke: 'transparent',
      strokeLinecap: 'round',
    },
    line: {
      stroke: LINE_COLOR,
      strokeWidth: 2,
      fill: 'none',
      pointerEvents: 'none',
    },
  },
  label: '+',
  defaultLabel: {
    markup: Markup.getForeignObjectMarkup(),
    attrs: {
      fo: {
        width: 30,
        height: 30,
        x: -15,
        y: -15,
      },
    },
    position: {
      distance: 0.5,
      options: {
        keepGradient: true,
        ensureLegibility: true,
      },
    },
  },
};
