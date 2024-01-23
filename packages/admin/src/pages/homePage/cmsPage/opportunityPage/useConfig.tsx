import { useFlatInject, usePageConfig } from "@/common/hooks";
import { MyColumnType } from "@/common/model/fieldsHooks";
import {
	fieldCreater,
	getInputNumerFormItemConfig,
} from "@/common/utils";
import { Modal, Space } from "antd";
import { useStore } from "./services/pageStore";
import { PageType } from "./services/pageStore/model";

let GEO_ENUM = ["LOCAL", "REGION", "STATE", "NATIONAL"];
let STATUS_ENUM = ["pending", "active", "suspended", "rejected"];

const useConfig = () => {
	const {
		setAddModalShowAct,
		deleteAct,
		queryAct,
		recordData,
		isShowAddModal,
	} = useStore()[0];
	const { dataList: categoryList } = useFlatInject("categoryPageStore")[0];
	const { dataList: companyList } = useFlatInject("companyPageStore")[0];
	return usePageConfig(() => {
		let value: MyColumnType<PageType>[] = [
			fieldCreater<PageType>("title"),
			{
				title: "status",
				dataIndex: "status",
				key: "status",
				fieldConfig: {
					isSearch: true,
					inputType: "Select",
					options: STATUS_ENUM,
					scope:
						(isShowAddModal && recordData) || !isShowAddModal
							? ["table", "modal", "search"]
							: ["table", "search"],
					formOptions: {
						label: "status",
						name: "status",
						rules: [
							{
								required: true,
							},
						],
					},
				},
			},
			{
				title: "value_driven",
				dataIndex: "value_driven",
				key: "value_driven",
				fieldConfig: {
					isSearch: true,
					inputType: "Switch",
					formOptions: {
						valuePropName: "checked",
						name: "value_driven",
						label: "value_driven",
						rules: [
							{
								required: true,
							},
						],
					},
				},
			},
			getInputNumerFormItemConfig<PageType>("priority"),
			getInputNumerFormItemConfig<PageType>("tier"),
			{
				title: "geo_scope",
				dataIndex: "geo_scope",
				key: "geo_scope",
				fieldConfig: {
					inputType: "Select",
					options: GEO_ENUM,
					formOptions: {
						label: "geo_scope",
						name: "geo_scope",
						rules: [{ required: true }],
					},
					inputOptions: {
						allowClear: true,
					},
					isSearch: true,
				},
			},
			fieldCreater<PageType>("postcode"),
			fieldCreater<PageType>("region"),
			fieldCreater<PageType>("state"),
			fieldCreater<PageType>("country"),
			getInputNumerFormItemConfig<PageType>("marketPrice"),
			getInputNumerFormItemConfig<PageType>("scalingPrice"),
			fieldCreater<PageType>("scalingPriceDesc"),
			getInputNumerFormItemConfig<PageType>("discount"),
			{
				title: "category_id",
				dataIndex: "category_id",
				key: "category_id",
				fieldConfig: {
					inputType: "Select",
					options: () => {
						return categoryList
							.filter((item) => {
								return item.parent_id;
							})
							.map((item) => {
								return {
									key: item.id,
									value: item.id,
									label: item.name,
								};
							});
					},
					formOptions: {
						rules: [{ required: true }],
						label: "category_id",
						name: "category_id",
					},
					inputOptions: {
						allowClear: true,
					},
					isSearch: true,
				},
			},
			{
				title: "company_id",
				dataIndex: "company_id",
				key: "company_id",
				fieldConfig: {
					inputType: "Select",
					options: () => {
						return companyList.map((item) => {
								return {
									key: item.id,
									value: item.id,
									label: item.name,
								};
							});
					},
					formOptions: {
						rules: [{ required: true }],
						label: "company_id",
						name: "company_id",
					},
					inputOptions: {
						allowClear: true,
					},
					isSearch: true,
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
	}, [recordData, isShowAddModal]);
};

export default useConfig;
