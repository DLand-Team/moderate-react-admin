import { PlusOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Switch, Typography, message } from "antd";
import { useTranslation } from "react-i18next";
import {
	type ColumnsCreater,
	type Wrapper,
	useEditTable,
} from "src/common/hooks/useEditTable";
import { UUID } from "src/common/utils";
import { useFlat } from "src/reduxService";
import { MarketItem } from "src/reduxService/stores/marketStore/model";
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

const colCreater: ColumnsCreater<MarketItem> = ({
	editingKey,
	form,
	save,
	isEditing,
	cancel,
	edit,
}) => {
	const { t } = useTranslation(["market"]);
	return [
		{
			title: t("marketPage.locationType"),
			dataIndex: "locationType",
			key: "locationType",
			editable: true,
			fieldConfig: {
				formOptions: {
					rules: [
						{
							required: true,
							message:
								t`marketPage.placeholder_select` +
								" " +
								t`marketPage.locationType`,
						},
					],
				},
				options: [
					{
						key: "I",
						value: "I",
						label: t("marketPage.IATANUM"),
					},
					{
						key: "T",
						value: "T",
						label: t("marketPage.PCC"),
					},
					{
						key: "C",
						value: "C",
						label: t("marketPage.CITY"),
					},
					{
						key: "N",
						value: "N",
						label: t("marketPage.COUNTRY"),
					},
					{
						key: "W",
						value: "W",
						label: t("marketPage.WORLD"),
					},
				],
				inputAttrConfig: {
					placeholder: `${t("marketPage.placeholder_select")} ${t(
						"marketPage.marketType",
					)}`,
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
			title: t("marketPage.exclude"),
			dataIndex: "exclude",
			key: "exclude",
			editable: true,
			render: (value) => {
				return <Switch checked={value}></Switch>;
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
			fieldConfig: {
				render: () => {
					const { locationType, exclude } = form.getFieldsValue();
					return (
						<div>
							{calcWeight({
								locationType,
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
			title: t("marketPage.operation"),
			dataIndex: "operation",
			render: (_: any, record) => {
				const editable = isEditing(record);
				return editable ? (
					<span>
						<Typography.Link
							onClick={() => save(record.key!)}
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
};

const Wrapper: Wrapper<MarketItem> = ({
	children,
	editingKey,
	setDataList,
	dataList,
}) => {
	const { t } = useTranslation(["market"]);
	const { currentData, setCurrentMarketData } = useFlat("marketStore");
	return (
		<>
			{children}
			<Button
				style={{
					marginTop: "30px",
				}}
				onClick={() => {
					if (editingKey) {
						message.warning({
							content: "inEditing",
						});
						return;
					}
					const newData = [
						...dataList,
						{
							key: UUID(),
						} as MarketItem,
					];
					setDataList(newData);
					setCurrentMarketData({
						...currentData!,
						cpdMarketItems: newData,
					});
				}}
				icon={<PlusOutlined />}
				type="dashed"
			>
				{t`marketPage.addLine`}
			</Button>{" "}
		</>
	);
};

const MarketItemsTable = () => {
	const { currentData, setCurrentMarketData } = useFlat("marketStore");
	const { t } = useTranslation(["market"]);
	const tableNode = useEditTable<MarketItem>({
		colCreater: colCreater,
		values: currentData?.cpdMarketItems || [],
		Wrapper,
		handleValuesChange: (_, values) => {
			setCurrentMarketData({
				...currentData!,
				cpdMarketItems: values,
			});
		},
	});
	return (
		<>
			<Typography
				style={{
					fontSize: "16px",
					marginBottom: "30px",
				}}
			>
				{t("marketPage.itemListTitle")}
			</Typography>
			{tableNode}
		</>
	);
};

export default MarketItemsTable;
