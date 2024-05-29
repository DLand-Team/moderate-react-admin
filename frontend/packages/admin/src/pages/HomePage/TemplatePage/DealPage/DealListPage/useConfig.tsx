import {
	Form,
	FormInstance,
	Input,
	Modal,
	Space,
	Switch,
	Typography,
	notification,
} from "antd";
import { useEffect, useMemo } from "react";
import { MyColumnType, fieldCreater } from "src/common/utils";
import { useFlat } from "src/service";
import {
	DealEntity,
	DealType,
	Status,
	TypeEnum,
} from "src/service/stores/dealStore/model";
import { getAttachments, getPics } from "./utils/configCeater";
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

const useConfig = (form?: FormInstance) => {
	const {
		setIsAddModalShow,
		queryDealListAct,
		approveAct,
		rejectAct,
		recordData,
		formVersion,
		pageData,
	} = useFlat("dealStore");
	const { dataList } = pageData;
	const { queryListAct, pageData: categoryPageData } =
		useFlat("categoryStore");
	const { dataList: categoryList } = categoryPageData;
	useEffect(() => {
		queryListAct();
	}, []);

	let askData: MyColumnType<any>[] = [
		{
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
				dataIndex: "ask.equity.partners",
				fieldConfig: {
					scope: ["modal"],
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
				dataIndex: "ask.startup_pitch.partners",
				fieldConfig: {
					type: "MultipleOne",
					scope: ["modal"],
					formOptions: {
						initialValue: recordData?.ask?.startup_pitch?.partners,
						childRule: [
							{
								required: true,
								message: "This is a required field",
							},
							{
								max: 100,
								message: "must be up to 100 characters",
							},
						],

						rules: [
							{
								required: true,
							},
							{
								validator: (_, value) => {
									if (value!?.length < 1) {
										return Promise.reject(
											new Error(
												"You need to create at least 1 partner!",
											),
										);
									} else if (value!?.length > 5) {
										return Promise.reject(
											new Error(
												"You need to create at most 5 partners!",
											),
										);
									}
									return Promise.resolve();
								},
							},
						],
						label: "partners",
						name: ["ask", "partnerships", "partners"],
					},
				},
			},
		];
	}
	if (recordData?.type == DealType.PARTNERSHIPS) {
		askData = [
			{
				dataIndex: "ask.partnerships.partners",
				fieldConfig: {
					type: "MultipleOne",
					scope: ["modal"],
					formOptions: {
						initialValue: recordData?.ask?.partnerships?.partners,
						childRule: [
							{
								required: true,
								message: "This is a required field",
							},
							{
								max: 100,
								message: "must be up to 100 characters",
							},
						],

						rules: [
							{
								required: true,
							},
							{
								validator: (_, value) => {
									if (value!?.length < 1) {
										return Promise.reject(
											new Error(
												"You need to create at least 1 partner!",
											),
										);
									} else if (value!?.length > 5) {
										return Promise.reject(
											new Error(
												"You need to create at most 5 partners!",
											),
										);
									}
									return Promise.resolve();
								},
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
	//@ts-ignore
	return useMemo<MyColumnType<DealEntity>[]>(() => {
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
					formOptions: {
						required: true,
						label: "type",
						name: "type",
					},
				},
			},
			{
				title: "title",
				dataIndex: "title",
				key: "title",
				fieldConfig: {
					formOptions: {
						initialValue: recordData?.title,
						rules: [
							{
								required: true,
							},
							{
								max: 50,
								min: 2,
							},
						],
						label: "title",
						name: "title",
					},
				},
				render: (_, record) => (
					<a
						onClick={() => {
							setIsAddModalShow({
								isShowAddModal: true,
								recordData: record,
								isDetail: true,
							});
						}}
					>
						{record.title}
					</a>
				),
			},
			{
				title: "overview",
				dataIndex: "overview",
				key: "overview",
				fieldConfig: {
					scope: ["modal"],
					type: "TextArea",
					inputAttrConfig: {},
					formOptions: {
						initialValue: recordData?.overview,
						rules: [
							{
								required: true,
							},
							{
								max: 500,
								min: 30,
								message: "",
							},
						],
						label: "overview",
						name: "overview",
					},
				},
			},
			{
				dataIndex: "address",
				key: "address",
				fieldConfig: {
					formOptions: {
						initialValue: recordData?.address,
						label: "address",
						name: "address",
					},
					inputAttrConfig: {
						disabled: true,
					},
				},
			},
			...askData,
			{
				title: "logo",
				dataIndex: "logo",
				key: "logo",
				fieldConfig: {
					scope: ["modal"],
					render() {
						return (
							<Form.Item label="logo">
								<Typography>{recordData?.logo}</Typography>
								<img
									width={"50%"}
									src={recordData?.logo}
									alt={recordData?.logo}
								/>
							</Form.Item>
						);
					},
					formOptions: {
						label: recordData?.logo,
						name: recordData?.logo,
					},
				},
			},
			{
				dataIndex: "highlights",
				fieldConfig: {
					type: "MultipleOne",
					scope: ["modal"],
					formOptions: {
						initialValue: recordData?.highlights,
						childRule: [
							{
								required: true,
								message: "This is a required field",
							},
							{
								max: 100,
								message: "must be up to 100 characters",
							},
						],
						rules: [
							{
								required: true,
							},
							{
								validator: (_, value) => {
									if (value!?.length < 1) {
										return Promise.reject(
											new Error(
												"You need to create at least 1 partner!",
											),
										);
									}
									return Promise.resolve();
								},
							},
						],
						label: "highlight",
						name: ["highlights"],
					},
				},
			},
			...getPics(recordData?.pics || [], ["pics"]),
			{
				title: "is_submitted",
				dataIndex: "is_submitted",
				key: "is_submitted",
				fieldConfig: {
					type: "Switch",
					isSearch: false,
					scope: ["table"],
					formOptions: {
						label: "is_submitted",
					},
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
					formOptions: {
						label: "is_draft",
					},
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
					formOptions: {
						label: "is_approved",
					},
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
					scope: [],
					isSearch: false,
					formOptions: {
						label: "official_deal_id",
					},
				},
			},
			{
				title: "industry",
				dataIndex: "industry",
				key: "industry",
				fieldConfig: {
					options: categoryList
						?.filter(
							(item) =>
								item.name !== "Capital Raising" &&
								item.name !== "Partnerships" &&
								item.name !== "Startup Pitch" &&
								item.name !== "Equity" &&
								item.name !== "Sell a Business",
						)
						.map((item) => {
							return {
								label: item.name,
								key: item.id,
								value: item.id,
							};
						}),
					formOptions: {
						required: true,
						label: "industry",
					},
					type: "Select",
					isSearch: false,
				},
			},
			{
				title: "prime_category",
				dataIndex: "prime_category_name",
				key: "prime_category_name",
				fieldConfig: {
					scope: [],
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
					scope: [],
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
					type: "TextArea",
					scope: ["table", "modal"],
					formOptions: {
						label: "reject_reason",
					},
				},
			},
			{
				title: "components.business_name",
				dataIndex: "components.business_name",
				key: "components.business_name",
				fieldConfig: {
					type: "TextArea",
					formOptions: {
						label: "business_name",
						name: ["components", "business_name"],
						rules: [
							{
								max: 30,
							},
						],
					},
				},
			},
			{
				title: "components.business_website",
				dataIndex: "components.business_website",
				key: "components.business_website",
				fieldConfig: {
					type: "TextArea",
					formOptions: {
						label: "business_website",
						name: ["components", "business_website"],
						rules: [
							{
								validator(_, value) {
									if (!value) {
										return Promise.resolve();
									}
									if (value.length > 0 && !value.match(URL)) {
										return Promise.reject({
											message:
												"Please provide a valid website url!",
										});
									}
									return Promise.resolve();
								},
							},
						],
					},
				},
			},
			{
				title: "components.problem_to_be_solved",
				dataIndex: "components.problem_to_be_solved",
				key: "components.problem_to_be_solved",
				fieldConfig: {
					type: "TextArea",
					formOptions: {
						label: "problem_to_be_solved",
						name: ["components", "problem_to_be_solved"],
						inputAttrConfig: {
							placeholder: "Max 500 characters",
						},
						rules: [
							{
								max: 500,
								message:
									"Description must be less than 500 characters",
							},
						],
					},
				},
			},
			{
				title: "components.solution",
				dataIndex: "components.solution",
				key: "components.solution",
				fieldConfig: {
					type: "TextArea",
					formOptions: {
						label: "solution",
						name: ["components", "solution"],
						inputAttrConfig: {
							placeholder: "Max 500 characters",
						},
						rules: [
							{
								max: 500,
								message:
									"Description must be less than 500 characters",
							},
						],
					},
				},
			},
			{
				title: "components.achivement",
				dataIndex: "components.achivement",
				key: "components.achivement",
				fieldConfig: {
					type: "TextArea",
					formOptions: {
						label: "achivement",
						name: ["components", "achivement"],
						inputAttrConfig: {
							placeholder: "Max 500 characters",
						},
						rules: [
							{
								max: 500,
								message:
									"Description must be less than 500 characters",
							},
						],
					},
				},
			},
			{
				title: "components.business_model",
				dataIndex: "components.business_model",
				key: "components.business_model",
				fieldConfig: {
					type: "TextArea",
					formOptions: {
						label: "business_model",
						name: ["components", "business_model"],
						inputAttrConfig: {
							placeholder: "Max 500 characters",
						},
						rules: [
							{
								max: 500,
								message:
									"Description must be less than 500 characters",
							},
						],
					},
				},
			},
			{
				title: "components.funding",
				dataIndex: "components.funding",
				key: "components.funding",
				fieldConfig: {
					type: "TextArea",
					formOptions: {
						label: "funding",
						name: ["components", "funding"],
						inputAttrConfig: {
							placeholder: "Max 500 characters",
						},
						rules: [
							{
								max: 500,
								message:
									"Description must be less than 500 characters",
							},
						],
					},
				},
			},
			{
				title: "market.target_market",
				dataIndex: "market.target_market",
				key: "market.target_market",
				fieldConfig: {
					type: "TextArea",
					formOptions: {
						label: "target_market",
						name: ["market", "target_market"],
						inputAttrConfig: {
							placeholder: "Max 500 characters",
						},
						rules: [
							{
								max: 500,
								message:
									"Description must be less than 500 characters",
							},
						],
					},
				},
			},
			{
				title: "market.opportunity_description",
				dataIndex: "market.opportunity_description",
				key: "market.opportunity_description",
				fieldConfig: {
					type: "TextArea",
					formOptions: {
						label: "opportunity_description",
						name: ["market", "opportunity_description"],
					},
					inputAttrConfig: {
						placeholder: "Max 500 characters",
					},
					rules: [
						{
							max: 500,
							message:
								"Description must be less than 500 characters",
						},
					],
				},
			},
			{
				title: "market.enviroment",
				dataIndex: "market.enviroment",
				key: "market.enviroment",
				fieldConfig: {
					type: "TextArea",
					formOptions: {
						label: "enviroment",
						name: ["market", "enviroment"],
					},
					inputAttrConfig: {
						placeholder: "Max 500 characters",
					},
					rules: [
						{
							max: 500,
							message:
								"Description must be less than 500 characters",
						},
					],
				},
			},
			{
				title: "documents_social.linkedin",
				dataIndex: "documents_social.linkedin",
				key: "documents_social.linkedin",
				fieldConfig: {
					type: "TextArea",
					formOptions: {
						label: "linkedin",
						name: ["documents_social", "linkedin"],
					},
				},
			},
			{
				title: "documents_social.facebook",
				dataIndex: "documents_social.facebook",
				key: "documents_social.facebook",
				fieldConfig: {
					type: "TextArea",
					formOptions: {
						label: "facebook",
						name: ["documents_social", "facebook"],
					},
				},
			},
			{
				title: "documents_social.instagram",
				dataIndex: "documents_social.instagram",
				key: "documents_social.instagram",
				fieldConfig: {
					type: "TextArea",
					formOptions: {
						label: "instagram",
						name: ["documents_social", "instagram"],
					},
				},
			},
			...getAttachments(recordData?.documents_social?.attachments || [], [
				"documents_social",
				"attachments",
			]),
			{
				dataIndex: "teams",
				fieldConfig: {
					type: "MultipleObj",
					scope: ["modal"],
					childFieldConfig: {
						name: {
							type: "TextArea",
							formOptions: {
								label: "test",
								rules: [
									{
										validator(
											option: { field: string },
											value,
										) {
											const [fieldName, index] =
												option.field.split(".");
											let values =
												form?.getFieldValue(fieldName);
											if (
												values[Number(index)].title &&
												!value
											) {
												return Promise.reject(
													new Error(
														'If the "title" field already has a value, then this field must be filled in.',
													),
												);
											}
											return Promise.resolve();
										},
									},
								],
							},
						},
						title: {
							type: "TextArea",
							formOptions: {
								label: "test",
								rules: [
									{
										validator(
											option: { field: string },
											value,
										) {
											const [fieldName, index] =
												option.field.split(".");
											let values =
												form?.getFieldValue(fieldName);
											if (
												values[Number(index)].name &&
												!value
											) {
												return Promise.reject(
													new Error(
														'If the "name" field already has a value, then this field must be filled in.',
													),
												);
											}
											return Promise.resolve();
										},
									},
								],
							},
						},
						image: {
							type: "TextArea",
							formOptions: {
								label: "test",
							},
						},
					},
					formOptions: {
						initialValue: recordData?.teams,
						rules: [],
						label: "teams",
						name: ["teams"],
					},
				},
			},
			{
				dataIndex: "faq",
				fieldConfig: {
					type: "MultipleObj",
					scope: ["modal"],
					childFieldConfig: {
						question: {
							type: "TextArea",
							formOptions: {
								label: "test",
								rules: [
									{
										validator(
											option: { field: string },
											value,
										) {
											const [fieldName, index] =
												option.field.split(".");
											let values =
												form?.getFieldValue(fieldName);
											if (
												values[Number(index)].answer &&
												!value
											) {
												return Promise.reject(
													new Error(
														'If the "answer" field already has a value, then this field must be filled in.',
													),
												);
											}
											return Promise.resolve();
										},
									},
								],
							},
						},
						answer: {
							type: "TextArea",
							formOptions: {
								label: "test",
								rules: [
									{
										validator(
											option: { field: string },
											value,
										) {
											const [fieldName, index] =
												option.field.split(".");
											let values =
												form?.getFieldValue(fieldName);
											if (
												values[Number(index)]
													.question &&
												!value
											) {
												return Promise.reject(
													new Error(
														'If the "question" field already has a value, then this field must be filled in.',
													),
												);
											}
											return Promise.resolve();
										},
									},
								],
							},
						},
					},
					formOptions: {
						initialValue: recordData?.faq,
						label: "faq",
						name: ["faq"],
					},
				},
			},
			{
				title: "action",
				key: "action",
				render: (_, record) => {
					return (
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
											await queryDealListAct();
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
													await queryDealListAct();
												},
											});
										}}
									>
										reject
									</a>
								)}
						</Space>
					);
				},
			},
		];
	}, [dataList, formVersion, recordData]);
};

export default useConfig;
