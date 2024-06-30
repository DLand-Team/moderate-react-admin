import { ConditionTypeEnum } from '../constant';
import icon from '../assets/catch-icon.svg';

const config: LiteFlowNode = {
  label: '捕获异常(Catch)',
  type: ConditionTypeEnum.CATCH,
  icon,
};

export default config;
