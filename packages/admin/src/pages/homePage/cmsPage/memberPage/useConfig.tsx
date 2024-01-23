import { usePageConfig } from "@/common/hooks";
import { Modal, Space } from "antd";
import { useStore } from "./services/pageStore";
import { PageType } from "./services/pageStore/model";
import { fieldCreater } from "@/common/utils";

const TYPE_ENUM = ["prime", "parent", "sub"];

const useConfig = () => {
	const [store] = useStore();
	const {
		setAddModalShowAct,
		deleteAct,
		queryAct,
		setIsDetailAct,
		dataList,
		formVersion,
	} = store;

	return usePageConfig<PageType>(() => {
		return [
			{
				...fieldCreater("email"),
				render(value, record) {
					// FIXME: click this and then click `edit`, the form will be disabled
					return (
						<a
							onClick={() => {
								setAddModalShowAct(true, true, record);
							}}
						>
							{value}
						</a>
					);
				},
			},
			fieldCreater("nick_name"),
			fieldCreater("first_name"),
			fieldCreater("last_name"),
			// FieldCreater("password", {}),
			fieldCreater("stripe_customer_id", {
				fieldConfig: {
					scope: ["modal"],
				},
			}),
			fieldCreater("postcode"),
			fieldCreater("mobile"),
			fieldCreater("role"),
			fieldCreater("stripe_session_id", {
				fieldConfig: {
					scope: ["modal"],
				},
			}),
			fieldCreater("stripe_subscription_id", {
				fieldConfig: {
					scope: ["modal"],
				},
			}),
			fieldCreater("hubspotId", {
				fieldConfig: {
					scope: ["modal"],
				},
			}),
			fieldCreater("company_id", {
				fieldConfig: {
					scope: ["modal"],
				},
			}),
			fieldCreater("id"),
			{
				title: "description",
				dataIndex: "description",
				key: "description",
				fieldConfig: {
					isSearch: true,
					formOptions: {
						label: "description",
						name: "description",
						rules: [
							{
								required: true,
							},
							{
								type: "string",
								min: 4,
								max: 60,
							},
						],
					},
				},
			},
			{
				title: "type",
				dataIndex: "type",
				key: "type",
				fieldConfig: {
					isSearch: true,
					inputType: "Select",
					options: TYPE_ENUM,
					formOptions: {
						initialValue: TYPE_ENUM[0],
						label: "type",
						name: "type",
						rules: [
							{
								required: true,
							},
						],
					},
				},
			},
			{
				title: "action",
				key: "action",
				render: (_, record) => (
					<Space size="middle">
						<a
							onClick={() => {
								setAddModalShowAct(true, false, record);
							}}
						>
							edit
						</a>
						<a
							onClick={() => {
								Modal.confirm({
									content: "are you sure?",
									onOk: async () => {
										await deleteAct({
											id: record.id,
										});
										queryAct();
									},
								});
							}}
						>
							delete
						</a>
					</Space>
				),
			},
		];
	}, [dataList, formVersion]);
};

export default useConfig;
