import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Input, Popconfirm, Switch, Typography, message } from "antd";
import { useTranslation } from "react-i18next";
import { ColumnsCreater } from "src/components/editTable";
import { useFlat } from "src/service";
import {
	AddItemDrawerType,
	Connection,
} from "src/service/stores/ruleStore/model";
import SelectPro from "../selectPro";

const columnsCreater: ColumnsCreater<Connection, { branchName?: string }> = (
	{ editingKey, save, isEditing, cancel, edit },
	extranProps = {},
) => {
	const { t } = useTranslation(["rule"]);
	const { t: commonT } = useTranslation(["common"]);
	const { conByPosList, isDetail, setIsEditing, deleteConnectionAct } =
		useFlat(["ruleStore", extranProps?.branchName], {
			isDetail: "IN",
			conByPosList: "IN",
		});
	const { marketList } = useFlat("marketStore");
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
			width: "300px",
			fieldConfig: {
				formOptions: {
					name: "marketId",
					style: {
						margin: 0,
					},
				},
				options: [
					...marketList
						.filter((item) => {
							return item.marketType == 1;
						})
						.map((item) => {
							return {
								key: item.id!,
								value: item.id!,
								label: item.marketName,
							};
						}),
				],
				render: () => {
					return (
						<Form.Item
							name="marketId"
							rules={[
								{
									required: true,
									message:
										t("placeholder_input") +
										t("rulePage_originMarket") +
										"!",
								},
							]}
						>
							<SelectPro
								branchName={extranProps?.branchName!}
								inputAttrConfig={{
									placeholder: commonT`placeholder_input`,
								}}
								optionArr={marketList
									.filter((item) => {
										return item.marketType == 1;
									})
									.map((item) => {
										return {
											id: item.id,
											value: item.id,
											label: item.marketName,
										};
									})}
								drawerTableType={{
									add: AddItemDrawerType.market_add,
									edit: AddItemDrawerType.market_edit,
									detail: AddItemDrawerType.market_detail,
								}}
							/>
						</Form.Item>
					);
				},
			},
			render: (value) => {
				let targetItem = marketList.find((item) => {
					return item.id === value;
				});
				return targetItem ? targetItem.marketName : "";
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
									message: t("rule_number"),
								},
								{
									message: t("rulePage_rule_maxConxTime"),
									validator: (_, value, callback) => {
										let temp = parseInt(value);
										if (
											!isNaN(temp) &&
											temp <
												parseInt(
													formIns.getFieldValue(
														"mct",
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
								placeholder={t("placeholder_input")}
							></Input>
						</Form.Item>
					);
				},
			},
		},
		{
			title: t("rulePage_minConnectTime"),
			dataIndex: "mct",
			key: "mct",
			width: "200px",
			editable: true,
			fieldConfig: {
				inputAttrConfig: {
					placeholder: t("placeholder_input"),
					maxLength: 8,
					style: {
						width: "70%",
					},
				},
				formOptions: {
					name: "mct",
					style: {
						margin: 0,
					},
					rules: [
						{
							pattern: /^[0-9]+$/,
							message: t("rule_number"),
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
								await save(record.uid!);
								setIsEditing(false);
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
							<EditOutlined />
						</Typography.Link>
						<Typography.Link disabled={editingKey !== ""}>
							<Popconfirm
								title={commonT`blog.delete`}
								onConfirm={() => {
									if (
										conByPosList[record.position].length > 1
									) {
										deleteConnectionAct({
											id: record.id,
											uid: record.uid,
										});
									} else {
										message.warning(
											t("rulePage_leastOneItinerary"),
										);
									}
								}}
								okText={commonT`blog.Yes`}
								cancelText={commonT`blog.No`}
							>
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
