
import { DeleteOutlined } from '@ant-design/icons';

import { shortcuts } from '../../../../common/shortcuts';

const nodeMenuConfig = [
  {
    key: 'delete',
    title: '删除',
    icon: <DeleteOutlined />,
    handler: shortcuts.delete.handler,
  },
];

export default nodeMenuConfig;
