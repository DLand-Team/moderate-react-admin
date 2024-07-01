import React from 'react';
import { Form, Input, Select } from 'antd';
import { debounce } from 'lodash-es';
import { history } from '../../../hooks/useHistory';
import ELNode from '../../../model/node';
import { ConditionTypeEnum } from '../../../constant';
import styles from './index.module.scss';

interface IProps {
  model: ELNode;
}

const WHEN_ANY_TRUE: boolean = true;
const WHEN_ANY_FALSE: boolean = false;

const ConditionPropertiesEditor: React.FC<IProps> = (props) => {
  const { model } = props;
  const properties = model.getProperties();

  const [form] = Form.useForm();

  const handleOnChange = debounce(async () => {
    try {
      const changedValues = await form.validateFields();
      model.setProperties({ ...properties, ...changedValues });
      history.push(undefined, { silent: true });
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }, 200);

  return (
    <div className={styles.liteflowEditorPropertiesEditorContainer}>
      <Form
        layout="vertical"
        form={form}
        initialValues={{ ...properties }}
        onValuesChange={handleOnChange}
      >
        {model.type === ConditionTypeEnum.WHEN && (
          <Form.Item name="any" label="Any（any）">
            <Select allowClear>
              <Select.Option value={WHEN_ANY_TRUE}>是</Select.Option>
              <Select.Option value={WHEN_ANY_FALSE}>否</Select.Option>
            </Select>
          </Form.Item>
        )}
        <Form.Item name="id" label="唯一标识（id）">
          <Input allowClear />
        </Form.Item>
        <Form.Item name="tag" label="标签（tag）">
          <Input allowClear />
        </Form.Item>
      </Form>
    </div>
  );
};

export default ConditionPropertiesEditor;
