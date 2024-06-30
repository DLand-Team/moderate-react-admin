import React from 'react';
import { shortcuts } from '../../../../common/shortcuts';
import { SnippetsOutlined } from '@ant-design/icons';

const blankMenuConfig = [
  {
    key: 'selectAll',
    title: '全选',
    icon: <SnippetsOutlined />,
    handler: shortcuts.selectAll.handler,
  },
  // {
  //   key: 'paste',
  //   title: '粘贴',
  //   icon: <SnippetsOutlined />,
  //   disabled: (flowGraph: Graph) => flowGraph.isClipboardEmpty(),
  //   handler: shortcuts.paste.handler,
  // },
];

export default blankMenuConfig;
