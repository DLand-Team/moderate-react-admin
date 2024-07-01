import React from 'react';
import { Graph } from '@antv/x6';
import { UndoOutlined } from '@ant-design/icons';
import { shortcuts } from '../../../common/shortcuts';
import makeBtnWidget from './common/makeBtnWidget';
import { history } from '../../../hooks/useHistory';

interface IProps {
  flowGraph: Graph;
}

const Save: React.FC<IProps> = makeBtnWidget({
  tooltip: '撤销',
  handler: shortcuts.undo.handler,
  getIcon() {
    return <UndoOutlined />;
  },
  disabled() {
    return !history.canUndo();
  },
});

export default Save;
