import { EditOutlined, FileOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Select, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { useFlat } from "src/service";
import { AddItemDrawerType } from "src/service/stores/ruleStore/model";

const { Option } = Select;

function SelectPro({
    optionArr,
    inputAttrConfig = {},
    handleChange,
    drawerTableType,
    branchName = "",
    ...rest
}: {
    optionArr: any[];
    inputAttrConfig?: any;
    handleChange?: any;
    drawerTableType: {
        add: AddItemDrawerType;
        edit?: AddItemDrawerType;
        detail?: AddItemDrawerType;
    };
    branchName: string;
}) {
    const { setIsAddItemDrawerFlag } = useFlat(["ruleStore", branchName], {});
    const { t } = useTranslation(["rule"]);
    const { t: commonT } = useTranslation(["common"]);
    const handleClick = (
        subType: "add" | "edit" | "detail",
        id: string | number = ""
    ) => {
        let type = drawerTableType[subType];
        type != undefined &&
            setIsAddItemDrawerFlag({
                flag: true,
                type,
                id,
            });
    };
    return (
        <Select
            onChange={handleChange}
            optionRender={(option) => {
                return (
                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <div
                            style={{
                                flex: 1,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {option.label}
                        </div>
                        <Button.Group
                            style={{
                                width: "50px",
                                height: "100%",
                            }}
                        >
                            <Tooltip title={commonT("edit")}>
                                <Button
                                    onClick={() => {
                                        handleClick("edit", option.value!);
                                    }}
                                    type="primary"
                                    size="small"
                                    icon={<EditOutlined />}
                                ></Button>
                            </Tooltip>

                            <Tooltip title={commonT("detail")}>
                                <Button
                                    onClick={() => {
                                        handleClick("detail", option.value!);
                                    }}
                                    type="primary"
                                    size="small"
                                    icon={<FileOutlined />}
                                ></Button>
                            </Tooltip>
                        </Button.Group>
                    </div>
                );
            }}
            dropdownRender={(menu) => (
                <div>
                    {menu}
                    <Divider style={{ margin: "4px 0" }} />
                    <div
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            handleClick("add");
                        }}
                    >
                        <Button icon={<PlusOutlined />} type="text">
                            {`${commonT("add")} ${
                                {
                                    [AddItemDrawerType.market_add]:
                                        t("rulePage_Market"),
                                    [AddItemDrawerType.pos_add]:
                                        t("rulePage_pos"),
                                    [AddItemDrawerType.sort_add]:
                                        t("rulePage_sortItem"),
                                    [AddItemDrawerType.filter_add]: t(
                                        "rulePage_filterItem"
                                    ),
                                }[
                                    drawerTableType[
                                        "add"
                                    ] as AddItemDrawerType.market_add
                                ]
                            }`}
                        </Button>
                    </div>
                </div>
            )}
            {...inputAttrConfig}
            {...rest}
        >
            {optionArr &&
                optionArr.length > 0 &&
                optionArr.map((item: any) => {
                    return (
                        <Option value={item.value} key={item.id + item.label}>
                            {item.label}
                        </Option>
                    );
                })}
        </Select>
    );
}

export default SelectPro;
