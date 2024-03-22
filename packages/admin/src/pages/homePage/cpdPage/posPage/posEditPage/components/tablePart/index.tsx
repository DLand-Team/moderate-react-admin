import {
	Form,
	FormInstance,
	Popconfirm,
	Select,
	Table,
	Typography,
} from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FieldConfig, MyColumnType, getField } from "src/common/utils/getField";

interface Item {
	key: string;
	no: string;
	pos_name: string;
	posId?: number;
	posInfo?: string;
}

const originData: Item[] = [];
for (let i = 0; i < 100; i++) {
	originData.push({
		key: i.toString(),
		posId: i,
		no: i.toString(),
		pos_name: `Edward ${i}`,
	});
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
	editing: boolean;
	dataIndex: string;
	title: any;
	type: "number" | "text";
	record: Item;
	index?: number;
	children?: React.ReactNode;
	fieldConfig?: FieldConfig;
	form: FormInstance<any>;
}

const EditableCell: React.FC<EditableCellProps> = ({
	editing,
	dataIndex,
	title,
	type,
	record,
	index,
	children,
	fieldConfig,
	form,
	...restProps
}) => {
	const formNode = editing ? getField(fieldConfig!, form) : "";
	return <td {...restProps}>{editing ? formNode : children}</td>;
};

const CustomTable = () => {
	const [form] = Form.useForm();
	const [data, setData] = useState(originData);
	const [editingKey, setEditingKey] = useState("");

	const isEditing = (record: Item) => record.key === editingKey;

	const edit = (record: Partial<Item> & { key: React.Key }) => {
		form.setFieldsValue({ name: "", age: "", address: "", ...record });
		setEditingKey(record.key);
	};

	const cancel = () => {
		setEditingKey("");
	};

	const save = async (key: React.Key) => {
		try {
			const row = (await form.validateFields()) as Item;

			const newData = [...data];
			const index = newData.findIndex((item) => key === item.key);
			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, {
					...item,
					...row,
				});
				setData(newData);
				setEditingKey("");
			} else {
				newData.push(row);
				setData(newData);
				setEditingKey("");
			}
		} catch (errInfo) {
			console.log("Validate Failed:", errInfo);
		}
	};

	const columns: (MyColumnType<Item> & {
		editable?: boolean;
	})[] = [
		{
			title: "posPage.posType",
			dataIndex: "posType",
			key: "posType",
			editable: true,
			width: "130px",
			fieldConfig: {
				watch: (newValues, old) => {
					console.log("newValues" + JSON.stringify(newValues));
					console.log("oldValues" + JSON.stringify(old));
				},
				options: [
					{
						key: "I",
						value: "T",
						label: "posPage.IATANUM",
					},
					{
						key: "T",
						value: "I",
						label: "posPage.PCC",
					},
					{
						key: "C",
						value: "I",
						label: "posPage.CITY",
					},
					{
						key: "N",
						value: "I",
						label: "posPage.COUNTRY",
					},
					{
						key: "W",
						value: "I",
						label: "posPage.WORLD",
					},
				],
				formOptions: {
					rules: [
						{
							required: true,
							message: `${"posPage.placeholder_input"} ${"posPage.posType"}`,
						},
					],
				},
				inputAttrConfig: {
					placeholder: `${"posPage.placeholder_select"} ${"posPage.posType"}`,
					maxLength: 60,
					style: {
						width: "140px",
					},
				},
				type: "Select",
				render: ({ inputAttrConfig, options }, form) => {
					const optionArr =
						typeof options == "function" ? options() : options;
					return (
						<Form.Item
							style={{
								margin: 0,
							}}
						>
							<Select
								onChange={() => {
									form.setFieldsValue({
										posInfo: undefined,
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
					I: "posPage.IATANUM",
					T: "posPage.PCC",
					C: "posPage.CITY",
					N: "posPage.COUNTRY",
					W: "posPage.WORLD",
				};
				return value in data ? data[value as keyof typeof data] : "";
			},
		},
		{
			title: "posName",
			editable: true,
			dataIndex: "pos_name",
			fieldConfig: {
				formOptions: {
					name: "pos_name",
					style: {
						margin: 0,
					},
				},
			},
			render: (item, record) => {
				const { posId } = record;
				return (
					<Link
						to={{
							pathname: "/userCenter/pos/detail",
							search: `?title=${"posPage.posEetailTitle"}&posId=${posId}`,
						}}
					>
						{item}
					</Link>
				);
			},
		},
		{
			title: "posPage.comment",
			dataIndex: "comment",
			key: "comment",
		},
		{
			title: "age",
			dataIndex: "age",
			width: "15%",
			editable: true,
			fieldConfig: {
				formOptions: {
					name: "age",
					style: {
						margin: 0,
					},
				},
				type: "Input",
			},
		},
		{
			title: "address",
			dataIndex: "address",
			width: "40%",
			editable: true,
			fieldConfig: {
				formOptions: {
					name: "address",
					style: {
						margin: 0,
					},
				},
				type: "Input",
			},
		},
		{
			title: "operation",
			dataIndex: "operation",
			render: (_: any, record: Item) => {
				const editable = isEditing(record);
				return editable ? (
					<span>
						<Typography.Link
							onClick={() => save(record.key)}
							style={{ marginRight: 8 }}
						>
							Save
						</Typography.Link>
						<Popconfirm title="Sure to cancel?" onConfirm={cancel}>
							<a>Cancel</a>
						</Popconfirm>
					</span>
				) : (
					<Typography.Link
						disabled={editingKey !== ""}
						onClick={() => edit(record)}
					>
						Edit
					</Typography.Link>
				);
			},
		},
	];

	const mergedColumns = columns.map((col) => {
		if (!col.editable) {
			return col;
		}
		return {
			...col,
			onCell: (
				record: Item,
			): {
				record: Item;
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
		<Form form={form} component={false}>
			<Table
				components={{
					body: {
						cell: EditableCell,
					},
				}}
				bordered
				dataSource={data}
				columns={mergedColumns as ColumnsType<any>}
				rowClassName="editable-row"
				pagination={{
					onChange: cancel,
				}}
			/>
		</Form>
	);
};

export default CustomTable;
