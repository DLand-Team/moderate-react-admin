import { Col } from "antd";
import { Rule } from "antd/es/form";
import { cloneDeep } from "src/common/utils";
import { Field, MyColumnType } from "../utils";

const useSearchFields = <T,>(
    columns: MyColumnType<T>[],
    options: {
        count?: number;
        form?: any;
    } = { count: 4 }
) => {
    const { count, form } = options;
    return columns.map((item, index) => {
        const { dataIndex, fieldConfig = {} } = item;

        let fieldConfigTemp = cloneDeep(fieldConfig);
        const {
            searchFromRender,
            inputAttrConfig,
            formOptions,
            isSearch = true,
        } = fieldConfigTemp;
        if (!formOptions) {
            fieldConfigTemp.formOptions = {
                label: dataIndex as string,
                name: dataIndex as string,
            };
        }
        if (
            fieldConfigTemp.formOptions &&
            !fieldConfigTemp.formOptions?.label
        ) {
            fieldConfigTemp.formOptions.label = dataIndex as string;
        }
        if (fieldConfigTemp.formOptions && !fieldConfigTemp.formOptions?.name) {
            fieldConfigTemp.formOptions.name = dataIndex as string;
        }
        let InputItem;
        if (!isSearch) return;
        if (searchFromRender) {
            InputItem = searchFromRender;
            return (
                <Col span={Math.floor(24 / count!)} key={index}>
                    <InputItem />
                </Col>
            );
        } else if (fieldConfig) {
            if (inputAttrConfig) {
                inputAttrConfig.disabled = false;
            }
            if (formOptions?.rules) {
                formOptions.rules.forEach((a: Rule) => {
                    //@ts-ignore
                    if (a.required) {
                        //@ts-ignore
                        a.required = false;
                    }
                });
            }
            return (
                <Col span={Math.floor(24 / count!)} key={index}>
                    <Field fieldConfig={fieldConfigTemp} formIns={form} />
                </Col>
            );
        }
    });
};

export default useSearchFields;
