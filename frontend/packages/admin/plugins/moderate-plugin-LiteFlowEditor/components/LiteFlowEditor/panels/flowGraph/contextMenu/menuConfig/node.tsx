import React from 'react';

import { CopyOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { Graph } from '@antv/x6';
import { shortcuts } from '../../../../common/shortcuts';
import { getSelectedNodes } from '../../../../utils/flowChartUtils';

const nodeMenuConfig = [
  {
    key: 'delete',
    title: '删除',
    icon: <DeleteOutlined />,
    handler: shortcuts.delete.handler,
  },
];

export default nodeMenuConfig;
