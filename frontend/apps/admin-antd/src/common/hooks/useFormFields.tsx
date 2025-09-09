import { Divider, FormInstance } from "antd";
import { cloneDeep } from "src/common/utils";
import { Fragment } from "react";
import { MyColumnType, Field } from "src/common/utils";

const useFormFields = <T,>(
  formList: MyColumnType<T>[],
  { isJustShow, formIns }: { isJustShow: boolean; formIns: FormInstance<T> },
) => {
  let recordKeyObj: Record<PropertyKey, any> = {};

  return formList
    .filter((item) => item.fieldConfig || item.fieldConfig!?.formOptions)
    .map((item) => {
      const { fieldConfig = {}, dataIndex } = item;
      const { formRender, formOptions } = fieldConfig! || {};
      if (!formOptions) {
        fieldConfig.formOptions = {
          label: dataIndex as string,
          name: dataIndex as string,
        };
      }
      if (fieldConfig.formOptions && !fieldConfig.formOptions?.label) {
        fieldConfig.formOptions.label = dataIndex as string;
      }
      if (fieldConfig.formOptions && !fieldConfig.formOptions?.name) {
        fieldConfig.formOptions.name = dataIndex as string;
      }
      const { name } = formOptions! || { name: dataIndex };
      let temp: any = [];
      if (Array.isArray(name)) {
        let nameArr = name.slice(0, -1);
        nameArr.forEach((nameItem, index) => {
          if (!recordKeyObj[nameItem]) {
            recordKeyObj[nameItem] = true;
            temp.push(
              <Divider key={`${index} ${nameItem}`} orientation="left">
                {index === 0 ? <h3>{nameItem}</h3> : <h5>{nameItem}</h5>}
              </Divider>,
            );
          }
        });
      }
      let InputItem;
      if (formRender) {
        InputItem = formRender();
      } else if (fieldConfig) {
        fieldConfig.inputAttrConfig = cloneDeep(
          fieldConfig.inputAttrConfig || {},
        );
        if (!("disabled" in fieldConfig.inputAttrConfig)) {
          if (isJustShow) {
            fieldConfig.inputAttrConfig.disabled = true;
          } else {
            fieldConfig.inputAttrConfig.disabled = false;
          }
        }
        InputItem = Field<T>({ fieldConfig, formIns });
      }
      return (
        <Fragment key={item.key || String(item.dataIndex)}>
          <>{temp}</>
          {InputItem}
        </Fragment>
      );
    });
};

export default useFormFields;
