import { usePageConfig } from "@/common/hooks";
import { normalizeNum } from "@/common/utils";
import { Modal, Space } from "antd";
import { useStore } from "./services/pageStore";
import { PageType } from "./services/pageStore/model";
export const TYPE_ENUM = ["user", "company", "category", "opportunity", "empty"];

const useConfig = () => {
	const {
		setAddModalShowAct,
		deleteAct,
		queryAct,
		setIsDetailAct,
		recordData,
	} = useStore()[0];
	return usePageConfig<PageType>(() => {
		return [
			{
				title: "name",
				dataIndex: "name",
				key: "name",
				fieldConfig: {
					isSearch: true,
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
					options: TYPE_ENUM,
					inputType: "Select",
					formOptions: {
						rules: [{ required: true }],
						label: "type",
						name: "type",
					},
				},
			},
			{
				title: "target_id",
				dataIndex: "target_id",
				key: "target_id",
				fieldConfig: {
					isSearch: true,
					formOptions: {
						rules: [
							{
								type: "number",
							},
						],
						label: "target_id",
						name: "target_id",
						normalize: normalizeNum,
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
	}, [recordData]);
};

export default useConfig;
