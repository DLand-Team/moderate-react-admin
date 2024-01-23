import { useFlatInject, usePageConfig } from "@/common/hooks";
import { fieldCreater } from "@/common/utils";
import {
	Descriptions,
	Form,
	FormInstance,
	Input,
	Modal,
	Space,
	notification,
} from "antd";
import { useEffect } from "react";
import { useStore } from "./services/pageStore";
import { PageType, Status, TypeEnum } from "./services/pageStore/model";

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

const useConfig = () => {
	const [store] = useStore();

	const {
		setAddModalShowAct,
		queryAct,
		approveAct,
		rejectAct,
		dataList,
		recordData,
		formVersion,
	} = store;

	return usePageConfig<PageType>(() => {
		return [
			fieldCreater("id"),
			{
				...fieldCreater("title"),
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
													{typeof value == "object"
														? JSON.stringify(value)
														: value}
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
			fieldCreater("sub_title"),
			fieldCreater("user_id"),
			fieldCreater("is_submitted", {
				fieldConfig: {
					scope: ["search"],
				},
			}),
			fieldCreater("is_approved", {
				fieldConfig: {
					scope: ["search"],
				},
			}),
			fieldCreater("is_draft", {
				fieldConfig: {
					scope: ["search"],
				},
			}),
			fieldCreater("official_deal_id"),
			{
				title: "type",
				dataIndex: "type",
				key: "type",
				fieldConfig: {
					isSearch: true,
					inputType: "Select",
					options: [
						TypeEnum.CapitalRaising,
						TypeEnum.Equity,
						TypeEnum.Partnerships,
						TypeEnum.SellABusiness,
						TypeEnum.StartupPitch,
					],
					formOptions: {
						label: "type",
						name: "type",
					},
				},
			},
			fieldCreater("category_id", { fieldConfig: { isSearch: false } }),
			{
				title: "prime_category",
				dataIndex: "prime_category_name",
				key: "prime_category_name",
			},
			{
				title: "status",
				dataIndex: "status",
				key: "status",
				fieldConfig: {
					isSearch: true,
					inputType: "Select",
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
			fieldCreater("reject_reason", {
				fieldConfig: {
					scope: ["table"],
				},
			}),
			{
				title: "action",
				key: "action",
				render: (_, record) => (
					<Space size="middle">
						<a
							onClick={async () => {
								setAddModalShowAct(true, record);
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
											async onOk(...args) {
												await resolver.form.validateFields();

												const x = {
													id: record.id,
													reject_reason:
														resolver.form.getFieldValue(
															"reject_reason",
														),
												};

												console.log(x);

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
	const [{ dataList: cateDataList, queryAct: queryCateAct }] =
		useFlatInject("categoryPageStore");
	const [store] = useStore();
	const {
		setAddModalShowAct,
		deleteAct,
		queryAct,
		approveAct,
		rejectAct,
		setIsDetailAct,
		dataList,
		recordData,
		formVersion,
	} = store;
	useEffect(() => {
		queryCateAct();
	}, []);
	const getConfigMedia = () => {
		return [
			{
				title: "facebook",
				dataIndex: "media" + "facebook",
				key: "media" + "facebook",
				fieldConfig: {
					formOptions: {
						label: "facebook",
						name: ["components", "media", "facebook"],
					},
				},
			},
			{
				title: "linkedin",
				dataIndex: "media" + "linkedin",
				key: "media" + "linkedin",
				fieldConfig: {
					formOptions: {
						label: "linkedin",
						name: ["components", "media", "linkedin"],
					},
				},
			},
			{
				title: "instagram",
				dataIndex: "media" + "instagram",
				key: "media" + "instagram",
				fieldConfig: {
					formOptions: {
						label: "instagram",
						name: ["components", "media", "instagram"],
					},
				},
			},
		];
	};
	const getConfigItemA = (name: string) => {
		return [
			{
				title: "title",
				dataIndex: name + "title",
				key: name + "title",
				fieldConfig: {
					formOptions: {
						label: "title",
						name: ["components", name, "title"],
					},
				},
			},
			{
				title: "sub_title",
				dataIndex: name + "sub_title",
				key: name + "sub_title",
				fieldConfig: {
					formOptions: {
						label: "sub_title",
						name: ["components", name, "sub_title"],
					},
				},
			},
		];
	};
	const getHighlights = (list: string[], name) => {
		return list.map((item, index) => {
			return {
				title: `${name}-${index}`,
				dataIndex: index,
				key: `${name}-${index}`,
				fieldConfig: {
					formOptions: {
						label: `${name}-${index}`,
						name: [...name, index],
					},
				},
			};
		});
	};

	const getFaq = (list: any[], name) => {
		let res = [];
		list.forEach((item, index) => {
			res = res.concat([
				{
					title: index + "answer",
					dataIndex: index + "answer",
					key: index + "answer",
					fieldConfig: {
						formOptions: {
							label: "answer",
							name: [...name, index, "answer"],
						},
					},
				},
				{
					title: index + "question",
					dataIndex: index + "question",
					key: index + "question",
					fieldConfig: {
						formOptions: {
							label: "question",
							name: [...name, index, "question"],
						},
					},
				},
			]);
		});
		return res;
	};
	return usePageConfig<PageType>(() => {
		// if (recordData?.type == DealType.CAPITAL_RAISING)
		return [
			fieldCreater("id", {
				fieldConfig: {
					inputOptions: {
						disabled: true,
					},
				},
			}),
			...(recordData?.attachments
				? getHighlights(recordData.attachments, ["attachments"])
				: []),
			{
				title: "components_sub_title",
				dataIndex: "components_sub_title",
				key: "components_sub_title",
				fieldConfig: {
					formOptions: {
						label: "sub_title",
						name: ["components", "sub_title"],
					},
				},
			},
			{
				title: "amount",
				dataIndex: "amount",
				key: "amount",
				fieldConfig: {
					formOptions: {
						label: "amount",
						name: ["components", "amount"],
					},
				},
			},
			{
				title: "ask_desc",
				dataIndex: "ask_desc",
				key: "ask_desc",
				fieldConfig: {
					formOptions: {
						label: "ask_desc",
						name: ["components", "ask_desc"],
					},
				},
			},
			{
				title: "logo",
				dataIndex: "logo",
				key: "logo",
				fieldConfig: {
					formOptions: {
						label: "logo",
						name: ["components", "logo"],
					},
					inputOptions: {
						disabled: true,
					},
				},
			},
			{
				title: "category_id",
				dataIndex: "category_id",
				key: "category_id",
				fieldConfig: {
					inputType: "Select",
					options: () => {
						return (
							cateDataList?.map((item) => {
								return {
									key: item.id,
									value: item.id,
									label: item.name,
								};
							}) || []
						);
					},
					formOptions: {
						label: "category_id",
						name: ["components", "category_id"],
					},
					inputOptions: {},
				},
			},
			...(recordData?.components?.media ? getConfigMedia() : []),
			// business_model
			...(recordData?.components?.highlights
				? getHighlights(recordData.components.highlights, [
					"components",
					"highlights",
				])
				: []),
			...(recordData?.components?.pics
				? getHighlights(recordData.components.pics, [
					"components",
					"pics",
				])
				: []),
			...(recordData?.components?.faq
				? getFaq(recordData.components.faq, ["components", "faq"])
				: []),
			...getConfigItemA("business_model"),
			...getConfigItemA("competition"),
			...getConfigItemA("customers"),
			...getConfigItemA("executive_summary"),
			...getConfigItemA("funding"),
			...getConfigItemA("market"),
			...getConfigItemA("problem_to_be_solved"),
			...getConfigItemA("product"),
			...getConfigItemA("traction"),
			...getConfigItemA("vision"),
		];
		return [
			fieldCreater("id"),
			{
				...fieldCreater("title"),
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
													{typeof value == "object"
														? JSON.stringify(value)
														: value}
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
			fieldCreater("sub_title"),
			fieldCreater("user_id"),
			fieldCreater("is_submitted", {
				fieldConfig: {
					scope: ["search"],
				},
			}),
			fieldCreater("is_approved", {
				fieldConfig: {
					scope: ["search"],
				},
			}),
			fieldCreater("is_draft", {
				fieldConfig: {
					scope: ["search"],
				},
			}),
			fieldCreater("official_deal_id"),
			{
				title: "type",
				dataIndex: "type",
				key: "type",
				fieldConfig: {
					isSearch: true,
					inputType: "Select",
					options: [
						TypeEnum.CapitalRaising,
						TypeEnum.Equity,
						TypeEnum.Partnerships,
						TypeEnum.SellABusiness,
						TypeEnum.StartupPitch,
					],
					formOptions: {
						label: "type",
						name: "type",
					},
				},
			},
			fieldCreater("category_id", { fieldConfig: { isSearch: false } }),
			{
				title: "prime_category",
				dataIndex: "prime_category_name",
				key: "prime_category_name",
			},
			{
				title: "status",
				dataIndex: "status",
				key: "status",
				fieldConfig: {
					isSearch: true,
					inputType: "Select",
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
			fieldCreater("reject_reason", {
				fieldConfig: {
					scope: ["table"],
				},
			}),
			{
				title: "action",
				key: "action",
				render: (_, record) => (
					<Space size="middle">
						<a
							onClick={async () => {
								setAddModalShowAct(true, record);
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
											async onOk(...args) {
												await resolver.form.validateFields();

												const x = {
													id: record.id,
													reject_reason:
														resolver.form.getFieldValue(
															"reject_reason",
														),
												};

												console.log(x);

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
	}, [dataList, formVersion, recordData, cateDataList]);
};
export default useConfig;
