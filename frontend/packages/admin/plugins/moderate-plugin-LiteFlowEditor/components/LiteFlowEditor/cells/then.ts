import { ConditionTypeEnum } from '../constant';
import icon from '../assets/then-icon.svg';

const config: LiteFlowNode = {
  label: '串行(Then)',
  type: ConditionTypeEnum.THEN,
  icon,
  node: {
    primer: 'circle',
  },
};

export default config;
