import React from'react';
import { Node } from '@antv/x6';
import classNames from 'classnames';
import { debounce } from 'lodash';
import { Modal, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { INodeData } from '../../model/node';
import styles from './index.module.scss';
import { history } from '../../hooks/useHistory';

const NodeToolBar: React.FC<{ node: Node }> = (props) => {
  const { node } = props;
  const {
    model,
    toolbar = { append: true, delete: true, prepend: true, replace: true },
  } = node.getData<INodeData>() || {};
  const showContextPad = debounce((info: any) => {
    node.model?.graph?.trigger('graph:showContextPad', info);
  }, 100);
  const onPrepend = (event: any) => {
    showContextPad({
      x: event.clientX,
      y: event.clientY,
      node,
      scene: 'prepend',
      title: '前面插入节点',
      edge: null,
    });
  };
  const onAppend = (event: any) => {
    showContextPad({
      x: event.clientX,
      y: event.clientY,
      node,
      scene: 'append',
      title: '后面插入节点',
      edge: null,
    });
  };
  const onReplace = (event: any) => {
    node.model?.graph?.select(model.getNodes());
    node.model?.graph?.trigger('model:select', model);
    showContextPad({
      x: event.clientX,
      y: event.clientY,
      node,
      scene: 'replace',
      title: '替换当前节点',
      edge: null,
    });
  };
  const onDelete = debounce(() => {
    node.model?.graph?.select(model.selectNodes());
    node.model?.graph?.trigger('model:select', model);
    Modal.confirm({
      title: `确认要删除选中的节点？`,
      content: '点击确认按钮进行删除，点击取消按钮返回',
      onOk() {
        if (model.remove()) {
          node.model?.graph?.cleanSelection();
          history.push();
        }
      },
    });
  }, 100);
  return (
    <div className={classNames(styles.liteflowNodeToolBar)}>
      {toolbar.prepend && (
        <div
          className={classNames(styles.liteflowAddNodePrepend)}
          onClick={onPrepend}
        >
          <Tooltip title="前面插入节点">
            <div
              className={classNames(styles.liteflowAddNodePrependIcon)}
            ></div>
          </Tooltip>
        </div>
      )}
      {toolbar.append && (
        <div
          className={classNames(styles.liteflowAddNodeAppend)}
          onClick={onAppend}
        >
          <Tooltip title="后面插入节点">
            <div className={classNames(styles.liteflowAddNodeAppendIcon)}></div>
          </Tooltip>
        </div>
      )}
      {(toolbar.replace || toolbar.delete) && (
        <div className={classNames(styles.liteflowTopToolBar)}>
          {
            <div
              className={classNames(styles.liteflowToolBarBtn)}
              onClick={onReplace}
            >
              <Tooltip title="替换当前节点">
                <EditOutlined />
              </Tooltip>
            </div>
          }
          {
            <div
              className={classNames(
                styles.liteflowToolBarBtn,
                styles.liteflowDeleteNode,
              )}
              onClick={onDelete}
            >
              <Tooltip title="删除节点">
                <DeleteOutlined />
              </Tooltip>
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default NodeToolBar;
