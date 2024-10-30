import {
	CheckOutlined,
	DeleteOutlined,
	EditOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import {
	Button,
	Form,
	Popconfirm,
	Select,
	Switch,
	Typography,
	message,
} from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { UUID } from "src/common/utils";
import { ColumnsCreater, EditTable, Wrapper } from "src/components/editTable";
import { useFlat } from "src/service";
import type { PosItem } from "src/service/stores/posStore/model";
import FieldRenderPosInfo from "../customFIelds/posInfo-field";

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
	console.log(exclude);
	return weight;
};

const colCreater: ColumnsCreater<PosItem> = ({
	editingKey,
	form,
	save,
	isEditing,
	cancel,
	edit,
	deleteByKey,
}) => {
	const { t } = useTranslation(["pos"]);
	const { t: commonT } = useTranslation(["common"]);
	const { setIsEditing } = useFlat("posStore");

	return [
		{
			title: t("posPage.posType"),
			dataIndex: "posType",
			key: "posType",
			editable: true,
			align: "center",
			fieldConfig: {
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
				],
				inputAttrConfig: {
					placeholder: `${t("posPage.placeholder_select")} ${t(
						"posPage.posType",
					)}`,
					maxLength: 60,
					style: {
						width: "140px",
					},
				},
				type: "Select",
				render: ({ inputAttrConfig, options }, form) => {
					console.log("form.getFieldValue()");
					console.log(form.getFieldValue("posType"));
					const optionArr =
						typeof options == "function" ? options() : options;
					return (
						<Form.Item
							name="posType"
							style={{
								margin: 0,
							}}
							rules={[
								{
									required: true,
									message: `${t(
										"posPage.placeholder_input",
									)} ${t("posPage.posType")}`,
								},
							]}
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
			render: (_, record) => {
				let data = {
					I: t("posPage.IATANUM"),
					T: t("posPage.PCC"),
				};
				return record.posType in data
					? data[record.posType as keyof typeof data]
					: "";
			},
		},
		{
			title: t("posPage.posInfo"),
			dataIndex: "posInfo",
			key: "posInfo",
			editable: true,
			align: "center",
			fieldConfig: {
				render: (_, formIns) => {
					return <FieldRenderPosInfo formIns={formIns} />;
				},
			},
		},
		{
			title: t("posPage.exclude"),
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
			title: t("posPage.weight"),
			dataIndex: "weight",
			key: "weight",
			editable: true,
			align: "center",
			fieldConfig: {
				render: (_, formIns) => {
					const { posType, agentOrAirline, officeOwner, exclude } =
						form.getFieldsValue();
					const weightValue = calcWeight({
						posType,
						agentOrAirline,
						officeOwner,
						exclude,
					});
					useEffect(() => {
						formIns.setFieldValue("weight", weightValue);
					}, [weightValue]);
					return (
						<Form.Item
							style={{
								margin: 0,
							}}
							name={"weight"}
						>
							{calcWeight({
								posType,
								agentOrAirline,
								officeOwner,
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
		{
			title: t("posPage.operation"),
			dataIndex: "operation",
			align: "center",
			render: (_: any, record) => {
				const editable = isEditing(record);
				return editable ? (
					<span>
						<Typography.Link
							onClick={() => {
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
							{/* <a>Cancel</a> */}
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
		},
	];
};

const WrapperComp: Wrapper<PosItem> = ({
	children,
	editingKey,
	setDataList,
	dataList,
}) => {
	const { t } = useTranslation(["pos"]);
	const { t: commonT } = useTranslation(["common"]);
	const { currentData, setCurrentDetail } = useFlat("posStore");
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
							content: commonT`blog.editing`,
						});
						return;
					}
					const newData = [
						...dataList,
						{
							uid: UUID(),
						} as PosItem,
					];
					setDataList(newData);
					setCurrentDetail({
						...currentData!,
						cpdPosItems: newData,
					});
				}}
				icon={<PlusOutlined />}
				type="dashed"
			>
				{t`posPage.addLine`}
			</Button>{" "}
		</>
	);
};

const PosItemsTable = () => {
	const { currentData, setCurrentDetail } = useFlat("posStore");
	const { t } = useTranslation(["pos"]);

	return (
		<>
			<Typography
				style={{
					fontSize: "16px",
					marginBottom: "30px",
				}}
			>
				{t("posPage.itemListTitle")}
			</Typography>
			<EditTable<PosItem>
				columnCreater={colCreater}
				values={currentData?.cpdPosItems || []}
				Wrapper={WrapperComp}
				handleValuesChange={({ allData }) => {
					setCurrentDetail({
						...currentData!,
						cpdPosItems: allData,
					});
				}}
			/>
		</>
	);
};

export default PosItemsTable;
