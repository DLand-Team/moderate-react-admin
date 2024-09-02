import { FormInstance, Input, Select } from "antd";
import { useEffect, useState } from "react";
import SearchSelect from "../searchSelect";
import styles from "./style.module.scss";

const InputGroup = Input.Group;
const { Option } = Select;

export interface Props<T> {
    isForm?: boolean;
    formIns?: FormInstance<T>;
    allowCodeShare: number;
    operateCarriers: string;
    notOperateCarriers: string;
}

export default <
    T extends {
        notOperateCarriers?: string | null;
        operateCarriers?: string | null;
    } = any
>(
    props: Props<T>
) => {
    const { allowCodeShare, operateCarriers, notOperateCarriers, formIns } =
        props;

    const [disable, setDisable] = useState(false);

    useEffect(() => {
        setDisable(!allowCodeShare);
    }, [allowCodeShare]);

    const [useFlag, setUseFlag] = useState(operateCarriers ? 1 : 0);

    useEffect(() => {
        setUseFlag(operateCarriers ? 1 : 0);
    }, [operateCarriers, notOperateCarriers]);

    return (
        <InputGroup className={styles.operateCarriersSelect} compact>
            <Select
                value={useFlag}
                style={{
                    width: "90px",
                }}
                disabled={disable}
                onSelect={(e) => {
                    setUseFlag(e);
                    if (e) {
                        const value: string =
                            formIns?.getFieldValue("notOperateCarriers");
                        if (value) {
                            const values = formIns?.getFieldsValue();
                            formIns?.setFieldsValue({
                                ...values!,
                                notOperateCarriers: null,
                                operateCarriers: value,
                            } as any);
                        }
                    } else {
                        const value = formIns?.getFieldValue("operateCarriers");
                        if (value) {
                            const values = formIns?.getFieldsValue();
                            formIns?.setFieldsValue({
                                ...values!,
                                notOperateCarriers: value,
                                operateCarriers: null,
                            } as any);
                        }
                    }
                }}
                className="customInputItemSelect"
            >
                <Option value={1}>USE</Option>
                <Option value={0}>NOT</Option>
            </Select>

            <div
                style={{
                    display: !useFlag ? "none" : "",
                }}
                className={styles.selectCustom}
            >
                <SearchSelect name={"operateCarriers"} disabled={disable} />
            </div>
            <div
                style={{
                    display: useFlag ? "none" : "",
                }}
                className={styles.selectCustom}
            >
                <SearchSelect name={"notOperateCarriers"} disabled={disable} />
            </div>
        </InputGroup>
    );
};
