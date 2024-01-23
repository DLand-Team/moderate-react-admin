import { usePageConfig } from "@/common/hooks";
import { MyColumnType } from "@/common/model/fieldsHooks";
import { normalizeNum } from "@/common/utils";
import { Modal, Space } from "antd";
import { useStore } from "./services/pageStore";
import { PageType } from "./services/pageStore/model";

const useConfig = () => {
	const {
		setAddModalShowAct,
		deleteAct,
		queryAct,
		setIsDetailAct,
	} = useStore()[0];
	return usePageConfig(() => {
		let value: MyColumnType<PageType>[] = [
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
				title: "parent_id",
				dataIndex: "parent_id",
				key: "parent_id",
				fieldConfig: {
					isSearch: true,
					formOptions: {
						rules: [
							{
								type: "number",
							},
						],
						label: "parent_id",
						name: "parent_id",
						normalize: normalizeNum,
					},
				},
			},
			{
				title: "prime_id",
				dataIndex: "prime_id",
				key: "prime_id",
				fieldConfig: {
					isSearch: true,
					formOptions: {
						rules: [
							{
								type: "number",
							},
						],
						label: "prime_id",
						name: "prime_id",
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
		return value;
	}, []);
};

export default useConfig;
