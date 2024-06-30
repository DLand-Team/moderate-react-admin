import { Form, FormProps, Table } from "antd";
import { ColumnsType, TableProps } from "antd/es/table";
import { FormInstance } from "antd/lib/form/Form";
import { isEqual } from "lodash-es";
import React, { useEffect, useRef, useState } from "react";
import { Field, FieldConfig, MyColumnType, UUID } from "src/common/utils";

interface EditableCellProps<T> extends React.HTMLAttributes<HTMLElement> {
	editing: boolean;
	children?: React.ReactNode;
	fieldConfig?: FieldConfig;
	dataIndex: string;
	title: string;
	type: "number" | "text";
	record: T;
	index?: number;
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
		record: Partial<T> | undefined;
		editingKey: string;
		form: FormInstance<T>;
		save: (key: string) => void;
		cancel: () => void;
		edit: (record: T) => void;
		isEditing: (record: T) => boolean;
		dataList: T[];
		setDataList: React.Dispatch<T[]>;
		setIsfresh: () => void;
		deleteByKey: (key: string) => void;
	}>,
) => React.ReactElement;
export type ColumnsCreater<T> = (props: {
	editingKey: string;
	form: FormInstance<T>;
	save: (key: string) => void;
	cancel: () => void;
	edit: (record: T) => void;
	isEditing: (record: T) => boolean;
	deleteByKey: (key: string) => void;
	record: Partial<T>;
}) => MyColumnType<T>[];

export const EditTable = <T extends { uid?: string } = any>({
	columnCreater,
	defaultValue,
	tableOptions = {},
	formOptions = {},
	values,
	Wrapper = ({ children }) => <div key={1}>{children}</div>,
	handleValuesChange,
}: {
	columnCreater: ColumnsCreater<T>;
	defaultValue?: T[];
	values?: T[];
	tableOptions?: TableProps<T>;
	formOptions?: FormProps<T>;
	Wrapper?: Wrapper<T>;
	handleValuesChange?: (changedData: T, allData: T[]) => void;
	handleDelete?: (changedData: T, allData: T[]) => void;
}) => {
	const [form] = Form.useForm();
	const [editingKey, setEditingKey] = useState("");
	const [currentRecord, setCurrentRecord] = useState<
		Partial<T> | undefined
	>();
	const [itemList, setItemList] = useState<T[]>(defaultValue || []);
	const itemListRef = useRef(defaultValue || []);
	const forceRefesh = useState(UUID())[1];
	const isEditing = (record: T) => record.uid === editingKey;
	useEffect(() => {
		if (values && !isEqual(values, itemListRef.current)) {
			setItemList(values);
			itemListRef.current = values;

			forceRefesh(UUID());
		}
	}, [values]);
	const edit = (record: Partial<T>) => {
		form.setFieldsValue({ ...record });
		setEditingKey(record.uid!);
		setCurrentRecord(record);
	};

	const cancel = () => {
		setEditingKey("");
	};

	const save = async (key: React.Key) => {
		try {
			const row = (await form.validateFields()) as T;
			const newData = [...itemList];
			const index = newData.findIndex((item) => key === item.uid);
			if (index > -1) {
				newData[index] = { ...newData[index], ...row };
				itemListRef.current = newData;
				setEditingKey("");
				handleValuesChange?.(newData[index], newData);
				form.resetFields();
			}
		} catch (errInfo) {
			console.log("Validate Failed:", errInfo);
		}
	};
	const deleteByKey = async (key: React.Key) => {
		if (values) return;
		try {
			// const row = form.getFieldsValue() as T;
			let newData = [...itemList];
			newData = newData.filter((item) => key != item.uid);
			setItemList(newData);
			setEditingKey("");
			// handleDelete?.(row, newData);
		} catch (errInfo) {
			console.log("Validate Failed:", errInfo);
		}
	};
	const columns = columnCreater({
		editingKey,
		save,
		edit,
		form,
		cancel,
		isEditing,
		deleteByKey,
		record: currentRecord!,
	});
	const mergedColumns = columns.map((col) => {
		if (!col.editable) {
			return col;
		}
		const { fieldConfig } = col;
		return {
			...col,
			onCell: (
				record: T,
			): {
				record: T;
				editing: boolean;
				form: FormInstance<any>;
				fieldConfig: FieldConfig<T> | undefined;
			} => ({
				record,
				editing: isEditing(record),
				form: form,
				fieldConfig,
			}),
		};
	});
	return (
		<Wrapper
			record={currentRecord}
			editingKey={editingKey}
			edit={edit}
			cancel={cancel}
			isEditing={isEditing}
			save={save}
			deleteByKey={deleteByKey}
			form={form}
			columns={columns}
			dataList={itemListRef.current}
			setDataList={(value) => {
				itemListRef.current = value;
				setItemList(value);
			}}
			setIsfresh={() => {
				forceRefesh(UUID());
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
					dataSource={itemListRef.current.map((item) => {
						return {
							...item,
							key: item.uid || UUID(),
						};
					})}
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
};
