import { Graph } from '@antv/x6';
import { Button, Input, Modal, Radio, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

interface IProps {
  title?: string;
  flowGraph: Graph;
}

const NodeEditModal: React.FC<IProps> = (props) => {
  const { title = '编辑节点', flowGraph } = props;
  const [label, setLabel] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);

  // life
  useEffect(() => {
    const handler = () => setVisible(true);
    flowGraph.on('graph:editNode', handler);
    return () => {
      flowGraph.off('graph:editNode', handler);
    };
  }, []);
  useEffect(() => {
    if (visible) {
      const cell = flowGraph.getSelectedCells()[0];
      const { label } = cell.getData() || {};
      setLabel(label);
    } else {
      setLabel('');
    }
  }, [visible]);

  // events
  const onOk = (): void => {
    setVisible(false);
  };
  const onCancel = (): void => {
    setVisible(false);
  };

  return (
    <Modal
      className={styles.liteflowEditorModal}
      width={560}
      title={`${title}-${label}`}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key={'cancel'} onClick={onCancel}>
          取消
        </Button>,
        <Button key={'saveCode'} type={'primary'} onClick={onOk}>
          确定
        </Button>,
      ]}
    >
      <div className={styles.depsInfoModalContent}>
        <Radio.Group options={['判断条件', '陪跑']} value={'判断条件'} />

        <Table
          style={{ paddingTop: 20 }}
          pagination={false}
          columns={[
            {
              title: '上一节点输出结果',
              dataIndex: 'position',
              key: 'position',
              render: () => (
                <Select value="档位">
                  <Select.Option value="档位">档位</Select.Option>
                </Select>
              ),
            },
            {
              title: '条件关系',
              dataIndex: 'relationship',
              key: 'relationship',
              render: () => (
                <Select value=">">
                  <Select.Option value=">">&gt;</Select.Option>
                </Select>
              ),
            },
            {
              title: '阈值',
              dataIndex: 'limit',
              key: 'limit',
              render: () => <Input placeholder="请输入"></Input>,
            },
          ]}
          dataSource={[
            {
              key: '1',
              position: '档位',
              relationship: '>',
              limit: '请输入',
            },
          ]}
        />
      </div>
    </Modal>
  );
};

export default NodeEditModal;
