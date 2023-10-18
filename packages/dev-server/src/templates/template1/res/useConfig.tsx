import { usePageConfig } from "@/common/hooks";
import { Modal, Space } from "antd";
import { useStore } from "./services/pageStore";
import { PageType } from "./services/pageStore/model";

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
	}, [dataList, formVersion]);
};

export default useConfig;
