import {
	Button,
	Col,
	Form,
	FormInstance,
	Input,
	Popconfirm,
	Row,
	Select,
	Space,
	Table,
	Typography,
	message,
} from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState, useImperativeHandle } from "react";
import { Field, FieldConfig, MyColumnType } from "src/common/utils/getField";

import {
	CheckOutlined,
	DeleteOutlined,
	EditOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { UUID } from "src/common/utils";
import { useFlat } from "src/service";
import type { FilterItem } from "src/service/stores/filterStore/model";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
	editing: boolean;
	dataIndex: string;
	title: any;
	type: "number" | "text";
	record: FilterItem;
	index?: number;
	children?: React.ReactNode;
	fieldConfig?: FieldConfig;
	form: FormInstance<any>;
}

const EditableCell = (
    {
        editing,
        children,
        fieldConfig,
        form,
        ...rest
    }: EditableCellProps
) => {
	return (
		<td {...rest}>
			{editing ? (
				<Field fieldConfig={fieldConfig || {}} formIns={form}></Field>
			) : (
				children
			)}
		</td>
	);
};

const CustomTable = (
    {
        ref,
        ...dataProps
    }: {
        isDetail: boolean;
        handleIsEditing: (isEditing: boolean) => void;
    } & {
        ref: React.RefObject<unknown | null>;
    }
) => {
    const { handleIsEditing, isDetail = false } = dataProps;
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState("");
    const { filterItemList, addFilterItem, setFilterItemList } =
        useFlat("filterStore");
    const { t } = useTranslation(["filter"]);
    const { t: commonT } = useTranslation(["common"]);

    useImperativeHandle(ref, () => ({
        cancel,
    }));
    const isEditing = (record: FilterItem) => record.key === editingKey;

    const edit = (record: Partial<FilterItem>) => {
        form.setFieldsValue({ ...record });
        setEditingKey(record.key!);
        form.setFieldValue("pv", 2);
        handleIsEditing(true);
    };

    const cancel = () => {
        setEditingKey("");
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as FilterItem;
            const newData = [...filterItemList];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                newData[index] = { ...row, key: key + "" };
                setFilterItemList(newData);
                setEditingKey("");
                form.resetFields();
                handleIsEditing(false);
            }
        } catch (errInfo) {
            console.log("Validate Failed:", errInfo);
        }
    };

    let columns: (MyColumnType<FilterItem> & {
        editable?: boolean;
    })[] = [
        {
            title: t`filterItem.FilterBy`,
            dataIndex: "filterBy",
            key: "filterBy",
            editable: true,
            align: "center",
            fieldConfig: {
                options: [
                    {
                        key: "travelTime",
                        value: "travelTime",
                        label: "Travel Time",
                    },
                    {
                        key: "connections",
                        value: "connections",
                        label: "Connection",
                    },
                ],
                inputAttrConfig: {
                    placeholder: t`filterItem.placeholder_select`,
                    style: {
                        width: 150,
                    },
                },
                type: "Select",
                render: (record, form) => {
                    console.log(record);
                    const optionArr =
                        typeof record.options == "function"
                            ? record.options()
                            : record.options;
                    let filterArrTemp = [...filterItemList];
                    let optionArr1 = optionArr?.filter((item) => {
                        return !filterArrTemp.find((item2) => {
                            return item2.filterBy === (item as any)?.value;
                        });
                    });
                    return (
                        <Form.Item
                            name="filterBy"
                            style={{
                                margin: 0,
                            }}
                            rules={[
                                {
                                    required: true,
                                    message: t`filterItem.placeholder_select`,
                                },
                            ]}
                        >
                            <Select
                                onChange={(value) => {
                                    if (value == "connections") {
                                        form.setFieldsValue({
                                            pv: 2,
                                            number: "",
                                        });
                                    } else {
                                        form.setFieldsValue({
                                            number: "",
                                        });
                                    }
                                }}
                                {...record.inputAttrConfig}
                            >
                                {optionArr1 &&
                                    optionArr1.length > 0 &&
                                    optionArr1.map((item) => {
                                        let temp =
                                            typeof item == "object"
                                                ? item
                                                : {
                                                        key: item,
                                                        value: item,
                                                        label: item,
                                                    };
                                        return (
                                            <Select.Option
                                                value={temp.value}
                                                key={temp.key}
                                            >
                                                {temp.label}
                                            </Select.Option>
                                        );
                                    })}
                            </Select>
                        </Form.Item>
                    );
                },
            },

            render: (value) => {
                let data = {
                    travelTime: "Travel Time",
                    connections: "Connection",
                };
                return value in data
                    ? data[value as keyof typeof data]
                    : "";
            },
        },
        {
            title: t`filterItem.Operator`,
            dataIndex: "operator",
            key: "operator",
            editable: true,
            align: "center",
            fieldConfig: {
                formOptions: {
                    name: "operator",
                    style: {
                        margin: 0,
                    },
                    rules: [
                        {
                            required: true,
                            message: t`filterItem.placeholder_select`,
                        },
                    ],
                },
                options: [
                    {
                        key: 1,
                        label: ">",
                        value: 1,
                    },
                    {
                        key: 2,
                        label: "<",
                        value: 2,
                    },
                    {
                        key: 3,
                        label: "=",
                        value: 3,
                    },
                ],
                inputAttrConfig: {
                    allowClear: true,
                    placeholder: t`filterItem.placeholder_select`,
                    style: {
                        width: 150,
                    },
                },
                type: "Select",
            },
            render: (value) => {
                let map = {
                    1: ">",
                    2: "<",
                    3: "=",
                };
                return value in map ? map[value as keyof typeof map] : "";
            },
        },
        {
            title: t`filterItem.Number`,
            dataIndex: "number",
            key: "number",
            editable: true,
            align: "center",
            fieldConfig: {
                type: "Input",
                formOptions: {
                    name: "number",
                    style: {
                        margin: 0,
                        width: 200,
                    },
                },
                render: () => {
                    return (
                        <Form.Item
                            style={{ margin: 0 }}
                            name="number"
                            rules={[
                                {
                                    validator: (_, value, callback) => {
                                        let filterBy =
                                            form.getFieldValue("filterBy");
                                        let pv = form.getFieldValue("pv");
                                        if (filterBy == "connections") {
                                            if (
                                                value === undefined ||
                                                value === ""
                                            ) {
                                                callback(
                                                    t`filterItem.placeholder_input`,
                                                );
                                            } else {
                                                var reg = /^([0-9]|10)$/;
                                                if (!reg.test(value)) {
                                                    callback(
                                                        t`filterItem.rule_number_2`,
                                                    );
                                                }
                                                if (Number(value) > 10) {
                                                    callback(
                                                        t`filterItem.rule_number_2`,
                                                    );
                                                }
                                            }
                                        } else {
                                            if (pv == "1") {
                                                //百分比
                                                const reg = /^([1-9]\d*)$/;
                                                if (!reg.test(value)) {
                                                    callback(
                                                        t`filterItem.rule_number_3`,
                                                    );
                                                }
                                                if (Number(value) > 10000) {
                                                    callback(
                                                        t`filterItem.rule_number_3`,
                                                    );
                                                }
                                            } else {
                                                const reg = /^([1-9]\d*)$/;
                                                if (!reg.test(value)) {
                                                    callback(
                                                        t`filterItem.rule_number_1`,
                                                    );
                                                }
                                                if (
                                                    Number(value) > 200000
                                                ) {
                                                    callback(
                                                        t`filterItem.rule_number_1`,
                                                    );
                                                }
                                            }
                                        }
                                        callback();
                                    },
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    );
                },
            },
        },
        {
            title: t`filterItem.pv`,
            dataIndex: "pv",
            key: "pv",
            editable: true,
            align: "center",
            fieldConfig: {
                options: [
                    {
                        key: 1,
                        label: t`filterItem.Percent`,
                        value: 1,
                    },
                    {
                        key: 2,
                        label: t`filterItem.Value`,
                        value: 2,
                    },
                ],
                formOptions: {
                    name: "pv",
                    style: {
                        margin: 0,
                    },
                    initialValue: 2,
                },

                inputAttrConfig: {
                    allowClear: true,
                    placeholder: t`filterItem.placeholder_select`,
                    style: {
                        width: 150,
                    },
                },
                type: "Select",
                render: ({ inputAttrConfig, options }, form) => {
                    // const optionArr = typeof options == "function" ? options() : options;
                    let filterBy = form.getFieldValue("filterBy");
                    let optionArr =
                        typeof options == "function" ? options() : options;
                    if (filterBy === "connections") {
                        optionArr = [
                            {
                                key: 2,
                                label: t`filterItem.Value`,
                                value: 2,
                            },
                        ];
                    }
                    return (
                        <Form.Item
                            name="pv"
                            style={{
                                margin: 0,
                            }}
                            rules={[
                                {
                                    required: true,
                                    message: t`filterItem.placeholder_select`,
                                },
                            ]}
                        >
                            <Select
                                onChange={() => {
                                    form.setFieldsValue({
                                        number: undefined,
                                    });
                                }}
                                {...inputAttrConfig}
                            >
                                {optionArr &&
                                    optionArr.length > 0 &&
                                    optionArr.map((item) => {
                                        let temp =
                                            typeof item == "object"
                                                ? item
                                                : {
                                                        key: item,
                                                        value: item,
                                                        label: item,
                                                    };
                                        return (
                                            <Select.Option
                                                value={temp.value}
                                                key={temp.key}
                                            >
                                                {temp.label}
                                            </Select.Option>
                                        );
                                    })}
                            </Select>
                        </Form.Item>
                    );
                },
            },
            render: (value) => {
                let data = {
                    1: t`filterItem.Percent`,
                    2: t`filterItem.Value`,
                };
                return value in data
                    ? data[value as keyof typeof data]
                    : "";
            },
        },
    ];

    if (!isDetail) {
        columns.push({
            title: t`filterItem.action`,
            dataIndex: "action",
            align: "center",
            render: (_: any, record: FilterItem) => {
                const editable = isEditing(record);
                return editable ? (
                    <Space size="middle">
                        <Typography.Link
                            onClick={() => save(record.key!)}
                            style={{ marginRight: 8 }}
                        >
                            <CheckOutlined />
                        </Typography.Link>
                        <Typography.Link>
                            <Popconfirm
                                title={commonT`blog.cancel`}
                                onConfirm={cancel}
                                okText={commonT`blog.Yes`}
                                cancelText={commonT`blog.No`}
                            >
                                <DeleteOutlined />
                            </Popconfirm>
                        </Typography.Link>
                    </Space>
                ) : (
                    <Space size="middle">
                        <Typography.Link
                            disabled={editingKey !== ""}
                            onClick={() => {
                                edit(record);
                            }}
                        >
                            {/* Edit */}
                            <EditOutlined />
                        </Typography.Link>
                        <Typography.Link>
                            <Popconfirm
                                title={commonT`blog.delete`}
                                onConfirm={() => {
                                    let temp = filterItemList.filter(
                                        (item) => {
                                            if (Array.isArray(record)) {
                                                return !record.includes(
                                                    item.key,
                                                );
                                            } else if (
                                                typeof record === "object"
                                            ) {
                                                return (
                                                    item.key != record.key
                                                );
                                            } else {
                                                return item.key != record;
                                            }
                                        },
                                    );
                                    setFilterItemList(temp);
                                }}
                                okText={commonT`blog.Yes`}
                                cancelText={commonT`blog.No`}
                            >
                                <DeleteOutlined />
                            </Popconfirm>
                        </Typography.Link>
                    </Space>
                );
            },
        });
    }

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (
                record: FilterItem,
            ): {
                record: FilterItem;
                editing: boolean;
                form: FormInstance<any>;
            } => ({
                record,
                editing: isEditing(record),
                form: form,
                ...col,
            }),
        };
    });

    return (
        <Form
            style={{
                width: "100%",
            }}
            form={form}
            component={false}
        >
            <Row>
                <Col span={24} style={{ textAlign: "left" }}>
                    {t`filterItem.FilterBy`}
                </Col>
            </Row>
            <Table
                style={{
                    width: "100%",
                }}
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={filterItemList}
                columns={mergedColumns as ColumnsType<any>}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
            />
            {!isDetail && (
                <Button
                    style={
                        {
                            // bottom: "45px",
                        }
                    }
                    onClick={() => {
                        if (editingKey !== "") {
                            message.warning({
                                content: commonT`blog.editing`,
                            });
                            return;
                        }
                        if (filterItemList.length < 2) {
                            let key = UUID();
                            setEditingKey(key);
                            addFilterItem({
                                key,
                            } as FilterItem);
                            // return true;
                        } else {
                            message.warning(
                                t`filterItem.warn_addFilterItemLength`,
                            );
                            return false;
                        }
                    }}
                    icon={<PlusOutlined />}
                    type="dashed"
                >{t`filterItem.addLine`}</Button>
            )}
        </Form>
    );
};

export default CustomTable;
