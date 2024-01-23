import { useFlatInject, usePageConfig } from "@/common/hooks";
import { normalizeNum } from "@/common/utils";
import { Modal, Space } from "antd";
import { PageType } from "./services/pageStore/model";

let TYPE_LIST = ["member", "partner", "member_default"];
let ORGN_TYPE = [
	"NATURAL_ENTITY",
	"SOLE_TRADER",
	"COMPANY",
	"GOVERNMENT",
	"NONPROFIT",
	"RESEARCHER",
	"OTHER",
];
let COUNT_ENUM = ["1-10", "11-50", "51-100", "101-500", "501-1000", "1000+"];
let GEO_ENUM = ["LOCAL", "REGION", "STATE", "NATIONAL"];
let STATUS_ENUM = ["pending", "active", "suspended"];

const useConfig = () => {
	const {
		setAddModalShowAct,
		deleteAct,
		queryAct,
		setIsDetailAct,
		recordData,
		isShowAddModal,
	} = useFlatInject("companyPageStore")[0];

	return usePageConfig<PageType>(() => {
		return [
			{
				title: "name",
				dataIndex: "name",
				key: "name",
				fieldConfig: {
					formOptions: {
						label: "name",
						name: "name",
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
				title: "type",
				dataIndex: "type",
				key: "type",
				fieldConfig: {
					isSearch: true,
					inputType: "Select",
					options: TYPE_LIST,
					formOptions: {
						name: "type",
						label: "type",
						rules: [
							{
								required: true,
							},
						],
					},
				},
			},
			{
				title: "slug",
				dataIndex: "slug",
				key: "slug",
				fieldConfig: {
					isSearch: true,
					formOptions: {
						label: "slug",
						name: "slug",
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
				title: "abn",
				dataIndex: "abn",
				key: "abn",
				fieldConfig: {
					formOptions: {
						label: "abn",
						name: "abn",
						rules: [
							{
								required: true,
							},
							{
								type: "string",
								min: 4,
								max: 20,
							},
						],
					},
					isSearch: true,
				},
			},
			{
				title: "organization_type",
				dataIndex: "organization_type",
				key: "organization_type",
				fieldConfig: {
					formOptions: {
						label: "organization_type",
						name: "organization_type",
						rules: [
							{
								required: true,
							},
						],
					},
					inputType: "Select",
					options: ORGN_TYPE,
					isSearch: true,
				},
			},
			{
				title: "employee_count",
				dataIndex: "employee_count",
				key: "employee_count",
				fieldConfig: {
					formOptions: {
						name: "employee_count",
						label: "employee_count",
					},
					inputType: "Select",
					options: COUNT_ENUM,
					isSearch: true,
				},
			},
			{
				title: "banner",
				dataIndex: "banner",
				key: "banner",
				fieldConfig: {
					formOptions: {
						label: "banner",
						name: ["metadata", "banner"],
					},
				},
			},
			{
				title: "website",
				dataIndex: "website",
				key: "website",
				fieldConfig: {
					formOptions: {
						label: "website",
						name: ["metadata", "website"],
					},
				},
			},
			{
				title: "description",
				dataIndex: "description",
				key: "description",
				fieldConfig: {
					formOptions: {
						label: "description",
						name: ["metadata", "description"],
					},
				},
			},
			{
				title: "area",
				dataIndex: "area",
				key: "area",
				fieldConfig: {
					formOptions: {
						label: "area",
						name: ["metadata", "address", "area"],
					},
				},
			},
			{
				title: "state",
				dataIndex: "state",
				key: "state",
				fieldConfig: {
					formOptions: {
						label: "state",
						name: ["metadata", "address", "state"],
					},
				},
			},
			{
				title: "postcode",
				dataIndex: "postcode",
				key: "postcode",
				fieldConfig: {
					formOptions: {
						rules: [
							{
								type: "number",
							},
						],
						label: "postcode",
						name: ["metadata", "address", "postcode"],
						normalize: normalizeNum,
					},
				},
			},
			{
				title: "employee_count",
				dataIndex: "employee_count",
				key: "plan_employee_count",
				fieldConfig: {
					inputType: "Select",
					options: GEO_ENUM,
					formOptions: {
						label: "employee_count",
						name: ["plan", "employee_count"],
					},
					isSearch: true,
				},
			},
			{
				title: "geo_scope_detail",
				dataIndex: "geo_scope_detail",
				key: "geo_scope_detail",
				fieldConfig: {
					formOptions: {
						label: "geo_scope_detail",
						name: ["plan", "geo_scope_detail"],
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
						name: ["plan", "category_id"],
						rules: [
							{
								type: "number",
							},
						],
						normalize: normalizeNum,
					},
				},
			},
			{
				title: "sub_category_id",
				dataIndex: "sub_category_id",
				key: "sub_category_id",
				fieldConfig: {
					formOptions: {
						label: "sub_category_id",
						name: ["plan", "sub_category_id"],
						normalize: normalizeNum,
					},
				},
			},
			{
				title: "primary_user_id",
				dataIndex: "primary_user_id",
				key: "primary_user_id",
				fieldConfig: {
					formOptions: {
						rules: [
							{
								required: true,
							},
						],
						label: "primary_user_id",
						name: "primary_user_id",
						normalize: normalizeNum,
					},
				},
			},
			{
				title: "action",
				key: "action",
				fieldConfig: {
					scope: ["table"],
				},
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
	}, [recordData, isShowAddModal]);
};

export default useConfig;
