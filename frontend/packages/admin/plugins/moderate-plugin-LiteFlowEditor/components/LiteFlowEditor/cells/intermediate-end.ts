import { NODE_TYPE_INTERMEDIATE_END } from '../constant';
import icon from '../assets/intermediate-end-icon.svg';

const config: LiteFlowNode = {
  label: '结束',
  type: NODE_TYPE_INTERMEDIATE_END,
  icon,
  node: {
    primer: 'circle',
  },
};

export default config;
