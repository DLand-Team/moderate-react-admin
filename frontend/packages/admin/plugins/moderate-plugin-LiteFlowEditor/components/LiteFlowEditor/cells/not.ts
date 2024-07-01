import { ConditionTypeEnum } from '../constant';
import icon from '../assets/not-icon.svg';

const config: LiteFlowNode = {
  label: '非(Not)',
  type: ConditionTypeEnum.NOT,
  icon,
};

export default config;
