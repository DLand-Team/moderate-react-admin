import {
	Button,
	Form,
	FormInstance,
	Popconfirm,
	Select,
	Switch,
	Table,
	Typography,
	message,
} from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { Field, FieldConfig, MyColumnType } from "src/common/utils/getField";
import FieldRenderPosInfo from "../fieldRenderPosInfo";
import FieldRenderOffice from "../fieldRenderOffice";
import { useTranslation } from "react-i18next";
import { PlusOutlined } from "@ant-design/icons";
import { useFlat } from "src/reduxService";

const calcWeight = (data: {
	posType: string;
	agentOrAirline: string;
	officeOwner: string;
	exclude: boolean;
}) => {
	const { posType, agentOrAirline, officeOwner, exclude } = data;
	let weight = 0;
	weight += 5 * (!agentOrAirline ? 8 : 1);
	weight += 6 * (!officeOwner || officeOwner == "ALL" ? 6 : 1);
	weight +=
		{
			I: 1,
			T: 2,
			C: 3,
			N: 4,
			W: 48,
		}[posType] || 0;
	weight = weight * (exclude ? 1 : 10);
	return weight;
};
interface Item {
	key: string;
	no: string;
	pos_name: string;
	posId?: number;
	posInfo?: string;
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

const CustomTable = () => {
	const [form] = Form.useForm();
	const [editingKey, setEditingKey] = useState("");
	const { posItemList: data, addPostItem: setData } = useFlat("posStore");
	const { t } = useTranslation(["pos"]);
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
			title: t("posPage.posType"),
			dataIndex: "posType",
			key: "posType",
			editable: true,
			fieldConfig: {
				watch: (newValues, old) => {
					console.log("newValues" + JSON.stringify(newValues));
					console.log("oldValues" + JSON.stringify(old));
				},
				options: [
					{
						key: "I",
						value: "I",
						label: t("posPage.IATANUM"),
					},
					{
						key: "T",
						value: "T",
						label: t("posPage.PCC"),
					},
					{
						key: "C",
						value: "C",
						label: t("posPage.CITY"),
					},
					{
						key: "N",
						value: "N",
						label: t("posPage.COUNTRY"),
					},
					{
						key: "W",
						value: "W",
						label: t("posPage.WORLD"),
					},
				],
				formOptions: {
					rules: [
						{
							required: true,
							message: `${t("posPage.placeholder_input")} ${t("posPage.posType")}`,
						},
					],
				},
				inputAttrConfig: {
					placeholder: `${t("posPage.placeholder_select")} ${t("posPage.posType")}`,
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
					I: t("posPage.IATANUM"),
					T: t("posPage.PCC"),
					C: t("posPage.CITY"),
					N: t("posPage.COUNTRY"),
					W: t("posPage.WORLD"),
				};
				return value in data ? data[value as keyof typeof data] : "";
			},
		},
		{
			title: t("posPage.officeO"),
			dataIndex: "officeOwner",
			key: "officeOwner",
			editable: true,
			fieldConfig: {
				render() {
					return <FieldRenderOffice />;
				},
			},
		},
		{
			title: t("posPage.aoa"),
			dataIndex: "agentOrAirline",
			key: "agentOrAirline",
			editable: true,
			fieldConfig: {
				formOptions: {
					style: {
						margin: 0,
					},
				},
				options: [
					{
						key: "A",
						label: t("posPage.Airline"),
						value: "A",
					},
					{
						key: "T",
						label: t("posPage.Agent"),
						value: "T",
					},
				],
				inputAttrConfig: {
					placeholder: t("posPage.placeholder_aoa"),
					allowClear: true,
					onChange: () => {
						setTimeout(() => {
							form.setFieldValue("posInfo", "");
						}, 100);
					},
				},
				type: "Select",
			},
			render: (value) => {
				let map = {
					A: t("posPage.Airline"),
					T: t("posPage.Agent"),
				};
				return value in map ? map[value as keyof typeof map] : "";
			},
		},
		{
			title: t("posPage.posInfo"),
			dataIndex: "posInfo",
			key: "posInfo",
			editable: true,
			fieldConfig: {
				render: () => {
					return <FieldRenderPosInfo formIns={form} />;
				},
			},
		},
		{
			title: t("posPage.exclude"),
			dataIndex: "exclude",
			key: "exclude",
			editable: true,
			render: (value) => {
				return <Switch checked={value}></Switch>;
			},
			fieldConfig: {
				type: "Switch",
				formOptions: {
					valuePropName: "checked",
					initialValue: false,
				},
			},
		},
		{
			title: t("posPage.weight"),
			dataIndex: "weight",
			key: "weight",
			editable: true,
			fieldConfig: {
				render: () => {
					const { posType, agentOrAirline, officeOwner, exclude } =
						form.getFieldsValue();
					return (
						<div>
							{calcWeight({
								posType,
								agentOrAirline,
								officeOwner,
								exclude,
							})}
						</div>
					);
				},
			},
			render: (value) => {
				return <div>{value}</div>;
			},
		},
		{
			title: t("posPage.operation"),
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
		<Form
			style={{
				width: "100%",
			}}
			form={form}
			component={false}
		>
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
				dataSource={data}
				columns={mergedColumns as ColumnsType<any>}
				rowClassName="editable-row"
				pagination={{
					onChange: cancel,
				}}
			/>
			<Button
				onClick={() => {
					// if (editingKey) {
					// 	message.warning({
					// 		content: t`posPage.inEditing`,
					// 	});
					// 	return;
					// }
					setData({});
					// handleCreate();
					// if (tableData.length >= pageSize) {
					// 	this.setState((prevState) => ({
					// 		currentPageIndex: prevState.currentPageIndex + 1,
					// 	}));
					// }
				}}
				icon={<PlusOutlined />}
				type="dashed"
			>{t`posPage.addLine`}</Button>
		</Form>
	);
};

export default CustomTable;
