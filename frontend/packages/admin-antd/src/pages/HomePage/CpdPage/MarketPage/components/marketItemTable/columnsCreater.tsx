import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Form, Popconfirm, Switch, Typography } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MyColumnType } from "src/common/utils";
import { ColumnsCreater } from "src/components/editTable";
import { ROUTE_ID } from "src/router";
import { useFlat } from "src/service";
import type { MarketItem } from "src/service/stores/marketStore/model";
import LocationField from "../customFIelds/location-field";
import LocationTypeField from "../customFIelds/locationType-field";

const calcWeight = (data: { locationType: string; exclude: boolean }) => {
	const { locationType, exclude } = data;
	let weight = 0;
	weight +=
		{
			P: 1,
			C: 2,
			S: 3,
			N: 4,
			Z: 5,
			A: 6,
			W: 7,
		}[locationType] || 0;
	weight = weight * (exclude ? 1 : 10);
	return weight;
};

const columnsCreater: ColumnsCreater<MarketItem, { branchName: string }> = (
	{ editingKey, form, save, isEditing, edit, deleteByKey },
	extra,
) => {
	const { t } = useTranslation(["market"]);
	const { t: commonT } = useTranslation(["common"]);
	const { setIsEditing } = useFlat(["marketStore", extra?.branchName]);
	const isDetail = extra?.branchName == ROUTE_ID.MarketDetailPage;
	let data: MyColumnType<MarketItem>[] = [
		{
			title: t("marketPage.locationType"),
			dataIndex: "locationType",
			key: "locationType",
			editable: true,
			align: "center",
			fieldConfig: {
				formOptions: {
					rules: [
						{
							required: true,
							message:
								t`marketPage.placeholder_select` +
								t`marketPage.locationType`,
						},
					],
				},
				inputAttrConfig: {
					placeholder:
						t`marketPage.placeholder_select` +
						t`marketPage.marketType`,
					maxLength: 60,
					style: {
						width: "140px",
					},
				},
				type: "Select",
				render: LocationTypeField,
			},
			render: (value) => {
				return (
					<>
						{
							(
								{
									P: t`marketPage.AIRPORT`,
									C: t`marketPage.CITY`,
									S: t`marketPage.STATE`,
									N: t`marketPage.COUNTRY`,
									Z: t`marketPage.ATPCO`,
									A: t`marketPage.TC`,
									W: t`marketPage.WORLD`,
								} as any
							)[value]
						}
					</>
				);
			},
		},
		{
			title: t("marketPage.location"),
			dataIndex: "locationInfo",
			key: "locationInfo",
			editable: true,
			align: "center",
			fieldConfig: {
				inputAttrConfig: {
					placeholder: t`marketPage.rule_placeholder`,
				},
				formOptions: {
					name: "locationInfo",
					rules: [
						{
							required: true,
							message:
								t`marketPage.placeholder_input` +
								" " +
								t`marketPage.location`,
						},
					],
				},
				render: LocationField,
			},
		},
		{
			title: t("marketPage.EXCLUDE"),
			dataIndex: "exclude",
			key: "exclude",
			editable: true,
			align: "center",
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
			title: t("marketPage.weight"),
			dataIndex: "weight",
			key: "weight",
			editable: true,
			align: "center",
			fieldConfig: {
				render: (_, formIns) => {
					const { locationType, exclude } = form.getFieldsValue();
					const weightValue = calcWeight({
						locationType,
						exclude,
					});
					useEffect(() => {
						formIns.setFieldValue("weight", weightValue);
					}, [weightValue]);

					return (
						<Form.Item name={"weight"}>
							{calcWeight({
								locationType,
								exclude,
							})}
						</Form.Item>
					);
				},
			},
			render: (value) => {
				return <div>{value}</div>;
			},
		},
	];
	if (!isDetail) {
		data.push({
			title: t("marketPage.operation"),
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
							<CheckOutlined />
						</Typography.Link>
						<Popconfirm
							title={commonT`blog.cancel`}
							onConfirm={async () => {
								await save(record.uid!);
								setIsEditing(false);
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
									deleteByKey(record.uid!);
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
	return data;
};

export default columnsCreater;
