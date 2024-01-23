import { useFlatInject, usePageConfig } from "@/common/hooks";
import { MyColumnType } from "@/common/model/fieldsHooks";
import { fieldCreater } from "@/common/utils";
import { Modal, Space } from "antd";
import { useStore } from "./services/pageStore";
import { PageType } from "./services/pageStore/model";
import { useEffect } from "react";

const useConfig = () => {
	const { setAddModalShowAct, deleteAct, queryAct } = useStore()[0];
	const { dataList: opportunityList, queryAct: queryOpportunityListAct } =
		useFlatInject("opportunityPageStore")[0];

	const { dataList: userList, queryAct: queryUserListAct } =
		useFlatInject("usersPageStore")[0];

	useEffect(() => {
		if (!opportunityList?.length) {
			queryOpportunityListAct();
		}
		if (!userList?.length) {
			queryUserListAct();
		}
	}, []);

	return usePageConfig(() => {
		let value: MyColumnType<PageType>[] = [
			fieldCreater("postcode", {
				fieldConfig: {
					scope: ["modal"],
				},
			}),
			fieldCreater("company"),
			fieldCreater("title"),
			fieldCreater("content"),
			fieldCreater("email", {
				fieldConfig: {
					formOptions: {
						rules: [
							{
								type: "email",
							},
						],
					},
				},
			}),
			fieldCreater("mobile"),
			fieldCreater("user_id", {
				fieldConfig: {
					inputType: "Select",
					options: () => {
						return userList.map((item) => {
							return {
								label: item.email,
								value: item.id,
								key: item.id,
							};
						});
					},
				},
			}),
			{
				title: "opportunity_id",
				dataIndex: "opportunity_id",
				key: "opportunity_id",
				fieldConfig: {
					inputType: "Select",
					options: () => {
						return opportunityList.map((item) => {
							return {
								label: item.title,
								value: item.id,
								key: item.id,
							};
						});
					},
					formOptions: {
						rules: [
							{
								required: true,
							},
						],
						label: "opportunity_id",
						name: "opportunity_id",
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
								setAddModalShowAct(true, record);
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
		return value;
	}, [opportunityList, userList]);
};

export default useConfig;
