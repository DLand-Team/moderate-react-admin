import { NODE_TYPE_END } from '../constant';
import icon from '../assets/end-icon.svg';

const config: LiteFlowNode = {
  label: '结束',
  type: NODE_TYPE_END,
  icon,
  node: {
    primer: 'circle',
  },
};

export default config;
