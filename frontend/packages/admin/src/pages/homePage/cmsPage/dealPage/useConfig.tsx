import {
	Descriptions,
	Form,
	FormInstance,
	Input,
	Modal,
	Space,
	Switch,
	notification,
} from "antd";
import { useEffect } from "react";
import { usePageConfig } from "src/common/hooks";
import { fieldCreater } from "src/common/utils";
import { useFlat } from "src/reduxService";
import {
	PageType,
	Status,
	TypeEnum,
} from "plugins/plugin1/services/dealStore/model";
import { DealType } from "src/types/deal";

const RejectReasonModal = ({
	resolver,
}: {
	resolver: { form: FormInstance };
}) => {
	const [form] = Form.useForm<{ reject_reason: string }>();

	resolver.form = form;

	return (
		<Form form={form}>
			<Form.Item
				label="reject_reason"
				name="reject_reason"
				rules={[{ required: true }]}
				initialValue={""}
			>
				<Input.TextArea rows={12} />
			</Form.Item>
		</Form>
	);
};
const getHighlights = (list: string[], name: string[]) => {
	return list.map((_, index) => {
		let nameArr = [...name, index];
		return {
			title: nameArr.join("-"),
			dataIndex: index,
			key: nameArr.join("-"),
			fieldConfig: {
				formOptions: {
					label: nameArr.join("-"),
					name: nameArr,
				},
			},
		};
	});
};
const useConfig = () => {
	const {
		setIsAddModalShow,
		queryAct,
		approveAct,
		rejectAct,
		dataList,
		recordData,
		formVersion,
	} = useFlat("dealStore");
	let askData: any = [
		{
			isSearch: true,
			dataIndex: "ask.capital_raising.amount",
			fieldConfig: {
				scope: ["modal"],
				inputAttrConfig: {
					disabled: true,
				},
				formOptions: {
					initialValue: recordData?.ask?.capital_raising?.amount,
					rules: [
						{
							required: true,
						},
					],
					label: "amount",
					name: ["ask", "capital_raising", "amount"],
				},
			},
		},
	];

	if (recordData?.type == DealType.EQUITY) {
		askData = [
			{
				isSearch: true,
				dataIndex: "ask.equity.amount",
				fieldConfig: {
					scope: ["modal"],
					inputAttrConfig: {
						disabled: true,
					},
					formOptions: {
						initialValue: recordData?.ask?.equity?.amount,
						rules: [
							{
								required: true,
							},
						],
						label: "amount",
						name: ["ask", "equity", "amount"],
					},
				},
			},
			{
				isSearch: true,
				dataIndex: "ask.equity.usage",
				fieldConfig: {
					scope: ["modal"],
					inputAttrConfig: {
						disabled: true,
					},
					formOptions: {
						initialValue: recordData?.ask?.equity?.usage,
						rules: [
							{
								required: true,
							},
						],
						label: "usage",
						name: ["ask", "equity", "usage"],
					},
				},
			},
			{
				isSearch: true,
				dataIndex: "ask.equity.partners",
				fieldConfig: {
					scope: ["modal"],
					inputAttrConfig: {
						disabled: true,
					},
					formOptions: {
						initialValue: recordData?.ask?.equity?.partners,
						rules: [
							{
								required: true,
							},
						],
						label: "partners",
						name: ["ask", "equity", "partners"],
					},
				},
			},
		];
	}
	if (recordData?.type == DealType.STARTUP_PITCH) {
		askData = [
			{
				isSearch: true,
				dataIndex: "ask.start_up_pitch.amount",
				fieldConfig: {
					scope: ["modal"],
					inputAttrConfig: {
						disabled: true,
					},
					formOptions: {
						initialValue: recordData?.ask?.startup_pitch?.amount,
						rules: [
							{
								required: true,
							},
						],
						label: "amount",
						name: ["ask", "start_up_pitch", "amount"],
					},
				},
			},
			{
				isSearch: true,
				dataIndex: "ask.start_up_pitch.usage",
				fieldConfig: {
					scope: ["modal"],
					inputAttrConfig: {
						disabled: true,
					},
					formOptions: {
						initialValue: recordData?.ask?.startup_pitch.usage,
						rules: [
							{
								required: true,
							},
						],
						label: "usage",
						name: ["ask", "start_up_pitch", "usage"],
					},
				},
			},
			{
				isSearch: true,
				dataIndex: "ask.start_up_pitch.partners",
				fieldConfig: {
					scope: ["modal"],
					inputAttrConfig: {
						disabled: true,
					},
					formOptions: {
						initialValue: recordData?.ask?.startup_pitch?.partners,
						rules: [
							{
								required: true,
							},
						],
						label: "partners",
						name: ["ask", "start_up_pitch", "partners"],
					},
				},
			},
		];
	}
	if (recordData?.type == DealType.PARTNERSHIPS) {
		askData = [
			{
				isSearch: true,
				dataIndex: "ask.partnerships.partners",
				fieldConfig: {
					scope: ["modal"],
					inputAttrConfig: {
						disabled: true,
					},
					formOptions: {
						initialValue: recordData?.ask?.partnerships?.partners,
						rules: [
							{
								required: true,
							},
						],
						label: "partners",
						name: ["ask", "partnerships", "partners"],
					},
				},
			},
		];
	}
	if (recordData?.type == DealType.SELL_A_BUSINESS) {
		askData = [
			{
				isSearch: true,
				dataIndex: "ask.sell_a_business.amount",
				fieldConfig: {
					scope: ["modal"],
					inputAttrConfig: {
						disabled: true,
					},
					formOptions: {
						initialValue: recordData?.ask?.sell_a_business.amount,
						rules: [
							{
								required: true,
							},
						],
						label: "amount",
						name: ["ask", "sell_a_business", "amount"],
					},
				},
			},
			{
				isSearch: true,
				dataIndex: "ask.sell_a_business.vendor_finance",
				fieldConfig: {
					scope: ["modal"],
					inputAttrConfig: {
						disabled: true,
					},
					formOptions: {
						initialValue:
							recordData?.ask?.sell_a_business.vendor_finance,
						rules: [
							{
								required: true,
							},
						],
						label: "usage",
						name: ["ask", "sell_a_business", "vendor_finance"],
					},
				},
			},
		];
	}

	return usePageConfig<PageType>(() => {
		return [
			fieldCreater("id", {
				fieldConfig: {
					scope: ["table"],
				},
			}),
			{
				title: "user_id",
				dataIndex: "user_id",
				key: "user_id",
				fieldConfig: {
					isSearch: true,
					scope: ["table"],
					formOptions: {
						label: "user_id",
						name: "user_id",
					},
				},
			},
			{
				title: "type",
				dataIndex: "type",
				key: "type",
				fieldConfig: {
					isSearch: true,
					type: "Select",
					options: [
						TypeEnum.CapitalRaising,
						TypeEnum.Equity,
						TypeEnum.Partnerships,
						TypeEnum.SellABusiness,
						TypeEnum.StartupPitch,
					],
					inputAttrConfig: {
						disabled: true,
					},
					formOptions: {
						required: true,
						label: "type",
						name: "type",
					},
				},
			},
			{
				isSearch: true,
				dataIndex: "title",
				key: "title",
				fieldConfig: {
					inputAttrConfig: {
						disabled: true,
					},
					formOptions: {
						initialValue: recordData?.title,
						rules: [
							{
								required: true,
							},
						],
						label: "title",
						name: "title",
					},
				},
				render: (_, record) => (
					<a
						onClick={() => {
							Modal.confirm({
								icon: null,
								width: 800,
								content: (
									<Descriptions
										title="deal detail"
										column={2}
									>
										{Object.entries(record).map(
											([key, value]) => (
												<Descriptions.Item
													key={key}
													label={key}
												>
													{value &&
													typeof value == "object"
														? JSON.stringify(value)
														: value || ""}
												</Descriptions.Item>
											),
										)}
									</Descriptions>
								),
							});
						}}
					>
						{record.title}
					</a>
				),
			},
			{
				isSearch: true,
				dataIndex: "overview",
				key: "overview",
				fieldConfig: {
					formOptions: {
						initialValue: recordData?.overview,
						rules: [
							{
								required: true,
							},
						],
						label: "overview",
						name: "overview",
					},
				},
			},
			{
				isSearch: true,
				dataIndex: "address",
				key: "address",
				fieldConfig: {
					inputAttrConfig: {
						disabled: true,
					},
					formOptions: {
						initialValue: recordData?.address,
						rules: [
							{
								required: true,
							},
						],
						label: "address",
						name: "address",
					},
				},
			},
			...askData,
			...getHighlights(recordData?.highlights || [], ["highlights"]),
			{
				title: "is_submitted",
				dataIndex: "is_submitted",
				key: "is_submitted",
				fieldConfig: {
					type: "Switch",
					isSearch: false,
					scope: ["table"],
				},
				render: (value) => {
					return <Switch checked={value}></Switch>;
				},
			},
			{
				title: "is_draft",
				dataIndex: "is_draft",
				key: "is_draft",
				fieldConfig: {
					type: "Switch",
					isSearch: false,
					scope: ["table"],
				},
				render: (value) => {
					return <Switch checked={value}></Switch>;
				},
			},
			{
				title: "is_approved",
				dataIndex: "is_approved",
				key: "is_approved",
				fieldConfig: {
					type: "Switch",
					isSearch: false,
					scope: ["table"],
				},
				render: (value) => {
					return <Switch checked={value}></Switch>;
				},
			},
			{
				title: "official_deal_id",
				dataIndex: "official_deal_id",
				key: "official_deal_id",
				fieldConfig: {
					isSearch: false,
					formOptions: {
						label: "official_deal_id",
					},
				},
			},
			{
				title: "category_id",
				dataIndex: "category_id",
				key: "category_id",
				fieldConfig: {
					formOptions: {
						label: "category_id",
					},
					type: "Input",
					isSearch: false,
				},
			},
			{
				title: "prime_category",
				dataIndex: "prime_category_name",
				key: "prime_category_name",
				fieldConfig: {
					formOptions: {
						label: "prime_category",
					},
				},
			},
			{
				title: "status",
				dataIndex: "status",
				key: "status",
				fieldConfig: {
					isSearch: true,
					type: "Select",
					options: [
						Status.Active,
						Status.Deactivated,
						Status.Fullfilled,
						Status.FullyFunded,
						Status.Pending,
						Status.Rejected,
						Status.Sold,
						Status.SoldOut,
						Status.Suspended,
					],
					formOptions: {
						label: "status",
						name: "status",
					},
				},
			},
			{
				title: "reject_reason",
				dataIndex: "reject_reason",
				key: "reject_reason",
				fieldConfig: {
					scope: ["table"],
				},
			},
			{
				title: "action",
				key: "action",
				render: (_, record) => (
					<Space size="middle">
						<a
							onClick={async () => {
								setIsAddModalShow({
									isShowAddModal: true,
									recordData: record,
								});
							}}
						>
							edit
						</a>
						{record.is_draft &&
							record.is_submitted &&
							!record.is_approved && (
								<a
									onClick={async () => {
										await approveAct({
											id: record.id,
											title: record.title,
										});
										await queryAct();
										notification.info({
											message: "success!",
										});
									}}
								>
									approve
								</a>
							)}
						{record.is_draft &&
							record.is_submitted &&
							!record.is_approved && (
								<a
									onClick={async () => {
										//@ts-ignore
										let resolver = { form: null } as {
											form: FormInstance;
										};

										Modal.confirm({
											title: "reject reason",
											content: (
												<RejectReasonModal
													resolver={resolver}
												/>
											),
											icon: null,
											async onOk() {
												await resolver.form.validateFields();

												const x = {
													id: record.id,
													reject_reason:
														resolver.form.getFieldValue(
															"reject_reason",
														),
												};

												await rejectAct(x);
												await queryAct();
											},
										});
									}}
								>
									reject
								</a>
							)}
					</Space>
				),
			},
		];
	}, [dataList, formVersion, recordData]);
};

export const useFromConfig = () => {
	const { dataList: cateDataList, queryAct: queryCateAct } =
		useFlat("dealStore");
	const { dataList, recordData, formVersion } = useFlat("dealStore");
	useEffect(() => {
		queryCateAct();
	}, []);
	return usePageConfig<PageType>(() => {
		return [
			{
				title: "title",
				dataIndex: "title",
				key: "title",
				fieldConfig: {
					formOptions: {
						label: "title",
						name: "title",
					},
				},
			},
			{
				title: "industry",
				dataIndex: "industry",
				key: "industry",
				fieldConfig: {
					formOptions: {
						initialValue: recordData?.industry,
						label: "industry",
						name: "industry",
					},
				},
			},
		];
	}, [dataList, formVersion, recordData, cateDataList]);
};
export default useConfig;
