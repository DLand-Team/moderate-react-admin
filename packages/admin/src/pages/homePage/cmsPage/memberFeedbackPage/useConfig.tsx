import { useFlatInject, usePageConfig } from "@/common/hooks";
import { MyColumnType } from "@/common/model/fieldsHooks";
import { fieldCreater, getInputNumerFormItemConfig } from "@/common/utils";
import { Modal, Space } from "antd";
import { useStore } from "./services/pageStore";
import { PageType } from "./services/pageStore/model";
import { useEffect } from "react";
const TYPE_ENUM = ["connected", "finished"];
const useConfig = () => {
	const {
		setAddModalShowAct,
		deleteAct,
		queryAct,
		setIsDetailAct,
	} = useStore()[0];

	const { dataList: enquiryList, queryAct: queryEnquiryListAct } =
		useFlatInject("enquiryPageStore")[0];

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
		if(!enquiryList?.length){
			queryEnquiryListAct();
		}
	}, []);
	return usePageConfig(() => {
		let value: MyColumnType<PageType>[] = [
			{
				title: "content",
				dataIndex: "content",
				key: "content",
				fieldConfig: {
					isSearch: true,
					formOptions: {
						label: "content",
						name: "content",
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
				render(value, record) {
					return (
						<a
							onClick={() => {
								setIsDetailAct(true);
								setAddModalShowAct(true, record);
							}}
						>
							{value}
						</a>
					);
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
						label: "type",
						name: "type",
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
			getInputNumerFormItemConfig("quanlity"),
			getInputNumerFormItemConfig("time"),
			getInputNumerFormItemConfig("communication"),
			getInputNumerFormItemConfig("service"),
			getInputNumerFormItemConfig("general"),
			getInputNumerFormItemConfig("id", { scope: ["table", "search"] }),
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
			fieldCreater("opportunity_id", {
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
				},
			}),
			fieldCreater("enquiry_id", {
				fieldConfig: {
					inputType: "Select",
					options: () => {
						return enquiryList.map((item) => {
							return {
								label: item.title,
								value: item.id,
								key: item.id,
							};
						});
					},
				},
			}),
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
	}, [enquiryList,opportunityList,userList]);
};

export default useConfig;
