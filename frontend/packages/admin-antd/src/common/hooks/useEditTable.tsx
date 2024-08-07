import { Form, FormProps, Table } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { FormInstance } from "antd/lib/form/Form";
import React, { useEffect, useMemo, useState } from "react";
import { Field, FieldConfig, MyColumnType, UUID } from "src/common/utils";

interface EditableCellProps<T> extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: string;
    type: "number" | "text";
    record: T;
    index?: number;
    children?: React.ReactNode;
    fieldConfig?: FieldConfig;
    form: FormInstance<T>;
}

const EditableCell: <T>(props: EditableCellProps<T>) => React.ReactElement = ({
    editing,
    children,
    fieldConfig,
    form,
    ...rest
}) => {
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

export type Wrapper<T> = (
    props: React.PropsWithChildren<{
        columns: MyColumnType<T>[];
        editingKey: string;
        form: FormInstance<T>;
        save: (key: string) => void;
        cancel: () => void;
        edit: (record: T) => void;
        isEditing: (record: T) => boolean;
        dataList: T[];
        setDataList: React.Dispatch<React.SetStateAction<T[]>>;
        setIsfresh: () => void;
    }>
) => React.ReactElement;
export type ColumnsCreater<T> = (props: {
    editingKey: string;
    form: FormInstance<T>;
    save: (key: string) => void;
    cancel: () => void;
    edit: (record: T) => void;
    isEditing: (record: T) => boolean;
}) => MyColumnType<T>[];

export const useEditTable = <T extends { key?: string } = any>({
    colCreater,
    defaultValue,
    tableOptions = {},
    formOptions = {},
    values,
    Wrapper = ({ children }) => <>{children}</>,
    handleValuesChange,
}: {
    colCreater: ColumnsCreater<T>;
    defaultValue?: T[];
    values?: T[];
    tableOptions?: TableProps<T>;
    formOptions?: FormProps<T>;
    Wrapper?: Wrapper<T>;
    handleValuesChange?: (changedData: T, allData: T[]) => void;
}) => {
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState("");
    const [itemList, setItemList] = useState<T[]>(defaultValue || []);
    const [isFresh, setIsfresh] = useState(UUID());
    const isEditing = (record: T) => record.key === editingKey;
    useEffect(() => {
        if (values) {
            setItemList(values);
        }
    }, [values]);
    const edit = (record: Partial<T>) => {
        form.setFieldsValue({ ...record });
        setEditingKey(record.key!);
    };

    const cancel = () => {
        setEditingKey("");
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as T;
            const newData = [...itemList];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                newData[index] = row;
                setItemList(newData);
                setEditingKey("");
                handleValuesChange?.(row, newData);
            }
        } catch (errInfo) {}
    };
    const columns = colCreater({
        editingKey,
        save,
        edit,
        form,
        cancel,
        isEditing,
    });
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (
                record: T
            ): {
                record: T;
                editing: boolean;
                form: FormInstance;
            } => ({
                record,
                editing: isEditing(record),
                form: form,
                ...col,
            }),
        };
    });
    return useMemo(() => {
        return (
            <Wrapper
                editingKey={editingKey}
                edit={edit}
                cancel={cancel}
                isEditing={isEditing}
                save={save}
                form={form}
                columns={columns}
                dataList={itemList}
                setDataList={setItemList}
                setIsfresh={() => {
                    setIsfresh(UUID());
                }}
            >
                <Form
                    style={{
                        width: "100%",
                    }}
                    form={form}
                    component={false}
                    {...formOptions}
                >
                    <Table
                        style={{
                            width: "100%",
                        }}
                        components={{
                            body: {
                                cell: EditableCell<T>,
                            },
                        }}
                        bordered
                        dataSource={itemList}
                        columns={mergedColumns as ColumnsType<T>}
                        rowClassName="editable-row"
                        pagination={{
                            onChange: cancel,
                        }}
                        {...tableOptions}
                    />
                </Form>
            </Wrapper>
        );
    }, [isFresh, columns, defaultValue]);
};
