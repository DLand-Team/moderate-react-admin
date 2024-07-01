import { NODE_TYPE_START } from '../constant';
import icon from '../assets/start-icon.svg';

const config: LiteFlowNode = {
  label: '开始',
  type: NODE_TYPE_START,
  icon,
  node: {
    primer: 'circle',
  },
};

export default config;
