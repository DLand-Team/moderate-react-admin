import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Input, Popconfirm, Switch, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { ColumnsCreater } from "src/common/hooks/editTable";
import { useFlat } from "src/service";
import { Connection } from "src/service/stores/ruleStore/model";

const columnsCreater: ColumnsCreater<Connection, { branchName?: string }> = (
	{ editingKey, save, isEditing, cancel, edit, form },
	extranProps = {},
) => {
	const { t } = useTranslation(["rule"]);
	const { t: commonT } = useTranslation(["common"]);
	const { isDetail, setIsEditing, deleteConnectionAct } = useFlat(
		["ruleStore", extranProps?.branchName],
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
			title: t("rulePage_maxConnectTime"),
			dataIndex: "maxConxTime",
			key: "maxConxTime",
			editable: true,
			width: "200px",
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
			width: "200px",
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
			title: commonT("operation"),
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
