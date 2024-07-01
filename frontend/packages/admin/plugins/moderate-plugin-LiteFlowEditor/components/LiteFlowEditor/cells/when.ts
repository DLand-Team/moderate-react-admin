import { ConditionTypeEnum } from '../constant';
import icon from '../assets/when-icon.svg';

const config: LiteFlowNode = {
  label: '并行(When)',
  type: ConditionTypeEnum.WHEN,
  icon,
  node: {
    primer: 'circle',
  },
};

export default config;
