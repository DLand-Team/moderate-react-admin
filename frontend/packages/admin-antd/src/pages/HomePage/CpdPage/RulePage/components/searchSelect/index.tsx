import { Form, Select } from "antd";
import { CSSProperties, PropsWithChildren } from "react";
import { useFlat } from "src/service";
import styles from "./style.module.scss";

const SearchSelect = (props: {
    disabled?: boolean;
    placeholder?: string;
    initValue?: string;
    style?: CSSProperties;
    name?: string;
    onSelect?: () => void;
}) => {
    const { processSearchSelectData } = useFlat("ruleStore", {});
    const dataSource = processSearchSelectData(null);
    const { disabled, placeholder, style, name, initValue, onSelect } = props;
    const recordTemp: any = {};
    dataSource.forEach((item: any) => {
        if (!(item.value in recordTemp)) {
            recordTemp[item.value] = {
                label: item.value,
                value: item.value,
            };
        }
    });
    const options = Object.values(recordTemp);
    options.push({ label: "ALL", value: "ALL" });
    const Wrapper = name
        ? Form.Item
        : ({ children }: PropsWithChildren) => <>{children}</>;
    return (
        <Wrapper
            name={name}
            style={{
                margin: 0,
            }}
            className={styles.container}
            initialValue={initValue}
        >
            <Select
                onSelect={onSelect}
                defaultValue={initValue}
                disabled={disabled}
                showSearch
                placeholder={placeholder}
                style={{
                    width: "150px",
                    borderRadius: 0,

                    ...style,
                }}
                defaultActiveFirstOption={false}
                notFoundContent={null}
                options={options as any}
                optionFilterProp="label"
            ></Select>
        </Wrapper>
    );
};

export default SearchSelect;
