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
import { useEffect } from "react";
import PdfPreview from "plugins/plugin1/common/components/pdfPreview";
import { usePageConfig } from "src/common/hooks";
import { MyColumnType, fieldCreater } from "src/common/utils";
import { useFlat } from "src/reduxService";
import {
	PageType,
	Status,
	TypeEnum,
} from "plugins/plugin1/services/dealStore/model";
import {
	DealEntity,
	DealType,
	IDealFaqComponent,
	IDealTeamMember,
} from "src/types/deal";
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

const getAttachments = (list: string[], name: string[]) => {
	return list.map<MyColumnType<DealEntity>>((item, index) => {
		let nameArr = [...name, index];
		return {
			title: nameArr.join("-"),
			dataIndex: index,
			key: nameArr.join("-"),
			fieldConfig: {
				render() {
					return (
						<a
							onClick={() => {
								let url = item.replace(
									"https://d2k5mqgnyo4nix.cloudfront.net",
									"/doc",
								);
								Modal.confirm({
									width: "950px",
									style: {
										position: "relative",
									},
									content: <PdfPreview pdfUrl={url} />,
								});
							}}
						>
							{item}
						</a>
					);
				},
				formOptions: {
					label: nameArr.join("-"),
					name: nameArr,
				},
			},
		};
	});
};

const getTeams = (list: IDealTeamMember[], name: string[]) => {
	let result: any[] = [];
	list.forEach((item, index) => {
		let nameArr = [...name, index];
		let name1 = [...nameArr, "name"];
		let name2 = [...nameArr, "title"];
		let name3 = [...nameArr, "image"];
		result.push({
			title: name1.join("-"),
			dataIndex: "name",
			key: name1.join("-"),
			fieldConfig: {
				formOptions: {
					label: name1.join("-"),
					name: name1,
				},
			},
		});
		result.push({
			title: name2.join("-"),
			dataIndex: "title",
			key: name2.join("-"),
			fieldConfig: {
				formOptions: {
					label: name2.join("-"),
					name: name2,
				},
			},
		});
		result.push({
			title: name3.join("-"),
			dataIndex: "image",
			key: name3.join("-"),
			fieldConfig: {
				render() {
					return (
						<Form.Item label={nameArr.join("-")}>
							<Typography>{item.image}</Typography>
							<img
								width={"30%"}
								src={item.image}
								alt={item.image}
							/>
						</Form.Item>
					);
				},
				formOptions: {
					label: name3.join("-"),
					name: name3,
				},
			},
		});
	});
	return result;
};
const getPics = (list: string[], name: string[]) => {
	return list.map<MyColumnType<DealEntity>>((item, index) => {
		let nameArr = [...name, index];
		return {
			title: nameArr.join("-"),
			dataIndex: index,
			key: nameArr.join("-"),
			fieldConfig: {
				render() {
					return (
						<Form.Item label={nameArr.join("-")}>
							<Typography>{item}</Typography>
							<img width={"30%"} src={item} alt={item} />
						</Form.Item>
					);
				},
				formOptions: {
					label: nameArr.join("-"),
					name: nameArr,
				},
			},
		};
	});
};

const getFaqs = (list: IDealFaqComponent[], name: string[]) => {
	let result: any[] = [];
	debugger;
	list.forEach((_, index) => {
		let nameArr = [...name, index];
		let name1 = [...nameArr, "question"];
		let name2 = [...nameArr, "answer"];
		result.push({
			title: name1.join("-"),
			dataIndex: "question",
			key: name1.join("-"),
			fieldConfig: {
				formOptions: {
					label: name1.join("-"),
					name: name1,
				},
			},
		});
		result.push({
			title: name2.join("-"),
			dataIndex: "answer",
			key: name2.join("-"),
			fieldConfig: {
				formOptions: {
					label: name2.join("-"),
					name: name2,
				},
			},
		});
	});
	return result;
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
				title: "title",
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
							setIsAddModalShow({
								isShowAddModal: true,
								recordData: record,
							});
						}}
					>
						{record.title}
					</a>
				),
			},
			{
				title: "overview",
				isSearch: true,
				dataIndex: "overview",
				key: "overview",
				fieldConfig: {
					type: "TextArea",
					inputAttrConfig: {
						autoSize: {
							minRows: 3,
						},
					},
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
			{
				title: "logo",
				dataIndex: "logo",
				key: "logo",
				fieldConfig: {
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
			...getHighlights(recordData?.highlights || [], ["highlights"]),
			...getPics(recordData?.pics || [], ["pics"]),
			{
				title: "is_submitted",
				dataIndex: "is_submitted",
				key: "is_submitted",
				fieldConfig: {
					type: "Switch",
					isSearch: false,
					scope: ["table", "modal"],
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
					scope: ["table", "modal"],
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
					scope: ["table", "modal"],
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
				title: "documents_social.attachments",
				dataIndex: "documents_social.attachments",
				key: "documents_social.attachments",
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
			...getTeams(recordData?.teams || [], ["teams"]),
			...getFaqs(recordData?.faq || [], ["faq"]),
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
