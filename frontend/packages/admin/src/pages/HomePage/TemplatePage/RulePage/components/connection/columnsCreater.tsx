import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Input, Popconfirm, Switch, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { ColumnsCreater } from "src/common/hooks/editTable";
import { useFlat } from "src/service";
import { Connection } from "src/service/stores/ruleStore/model";

const columnsCreater: ColumnsCreater<Connection> = ({
	editingKey,
	save,
	isEditing,
	cancel,
	edit,
	form,
}) => {
	const { marketList } = useFlat("marketStore", {
		marketList: "IN",
	});
	const { t } = useTranslation(["rule"]);
	const { t: commonT } = useTranslation(["common"]);
	const { isDetail, setIsEditing, deleteConnectionAct } = useFlat(
		"ruleStore",
		{ isDetail: "IN" },
	);
	let value: ReturnType<ColumnsCreater<Connection>> = [
		{
			title: t("rulePage_exclude"),
			dataIndex: "exclude",
			key: "exclude",
			editable: true,
			align: "center",
			width: "50px",
			render: (value) => {
				return <Switch disabled checked={value}></Switch>;
			},
			fieldConfig: {
				type: "Switch",
				formOptions: {
					name: "exclude",
					style: {
						margin: 0,
					},
					valuePropName: "checked",
					initialValue: false,
				},
			},
		},
		{
			title: t("rulePage_connectionMarket"),
			dataIndex: "marketId",
			key: "marketId",
			editable: true,
			fieldConfig: {
				formOptions: {
					style: {
						margin: 0,
					},
				},
				options: [
					...marketList
						.filter((item) => {
							return item.marketType == 2;
						})
						.map((item) => {
							return {
								key: item.id!,
								value: item.id!,
								label: item.marketName,
							};
						}),
				],
				inputAttrConfig: {
					placeholder: t("rulePage_placeholder_connectionMarket"),
					style: {
						width: "150px",
					},
				},
				type: "Select",
			},
			render: (value) => {
				let targetItem = marketList.find((item) => {
					return item.id === value;
				});
				return targetItem ? targetItem.id : "";
			},
		},
		{
			title: t("rulePage_maxConnectTime"),
			dataIndex: "maxConxTime",
			key: "maxConxTime",
			editable: true,
			fieldConfig: {
				render: (_, formIns) => {
					return (
						<Form.Item
							name={"maxConxTime"}
							normalize={(value) => {
								if (value && !isNaN(value * 1)) {
									return value * 1;
								}
								return value;
							}}
							rules={[
								{
									pattern: /^[0-9]+$/,
									message: "rule_number",
								},
								{
									message: "rulePage_rule_maxConxTime",
									validator: (_, value, callback) => {
										let temp = parseInt(value);
										if (
											!isNaN(temp) &&
											temp <
												parseInt(
													formIns.getFieldValue(
														"minConxTime",
													),
												)
										) {
											callback("no");
										} else {
											callback();
										}
									},
								},
							]}
							style={{ margin: 0 }}
						>
							<Input
								maxLength={8}
								style={{ width: "70%" }}
								placeholder={"placeholder_input"}
							></Input>
						</Form.Item>
					);
				},
			},
		},
		{
			title: t("rulePage_minConnectTime"),
			dataIndex: "minConxTime",
			key: "minConxTime",
			editable: true,
			fieldConfig: {
				inputAttrConfig: {
					placeholder: "placeholder_input",
					maxLength: 8,
					style: {
						width: "70%",
					},
				},
				formOptions: {
					name: "minConxTime",
					style: {
						margin: 0,
					},
					rules: [
						{
							pattern: /^[0-9]+$/,
							message: "rule_number",
						},
					],
				},
			},
		},
	];
	if (!isDetail) {
		value.push({
			title: t("operation"),
			dataIndex: "operation",
			align: "center",
			render: (_: any, record) => {
				const editable = isEditing(record);
				return editable ? (
					<span>
						<Typography.Link
							onClick={async () => {
								await form.validateFields();
								setIsEditing(false);
								save(record.uid!);
							}}
							style={{ marginRight: 8 }}
						>
							{/* Save */}
							<CheckOutlined />
						</Typography.Link>
						<Popconfirm
							title={commonT`blog.cancel`}
							onConfirm={() => {
								setIsEditing(false);
								cancel();
							}}
							okText={commonT`blog.Yes`}
							cancelText={commonT`blog.No`}
						>
							<DeleteOutlined />
						</Popconfirm>
					</span>
				) : (
					<span>
						<Typography.Link
							disabled={editingKey !== ""}
							onClick={() => {
								edit(record);
								setIsEditing(true);
							}}
							style={{ marginRight: 8 }}
						>
							{/* Edit */}
							<EditOutlined />
						</Typography.Link>
						<Typography.Link disabled={editingKey !== ""}>
							<Popconfirm
								title={commonT`blog.delete`}
								onConfirm={() => {
									deleteConnectionAct({
										id: record.id || record.uid!,
									});
								}}
								okText={commonT`blog.Yes`}
								cancelText={commonT`blog.No`}
							>
								{/* Delete */}
								<DeleteOutlined />
							</Popconfirm>
						</Typography.Link>
					</span>
				);
			},
		});
	}
	return value;
};

export default columnsCreater;
