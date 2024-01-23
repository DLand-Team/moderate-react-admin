import { usePageConfig } from "@/common/hooks";
import { Descriptions, Modal, Space } from "antd";
import { useStore } from "./services/pageStore";
import { PageType } from "./services/pageStore/model";

// change the name of the prime to primary
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
				title: "id",
				dataIndex: "id",
				key: "id",
				fieldConfig: {
					isSearch: false,
					formOptions: {
						label: "id",
						name: "id",
						hidden: true,
						rules: [
							{
								required: true,
							},
						],
					},
				},
				render: (_, record) => (
					// FIXME: rewrite in modal form style
					<a
						onClick={() => {
							Modal.confirm({
								icon: null,
								content: (
									<Descriptions title="deal detail" column={1}>
										<Descriptions.Item label={"id"}>{record.id}</Descriptions.Item>
										<Descriptions.Item label={"content"}>{record.content}</Descriptions.Item>
									</Descriptions>
								),
							});
						}}
					>
						{record.id}
					</a>
				)
			},
			{
				title: "user_id",
				dataIndex: "user_id",
				key: "user_id",
				fieldConfig: {
					formOptions: {
						hidden: true,
						label: "user_id",
						name: "user_id",
						rules: [
							{
								required: true,
							},
						],
					},
				},
			},
			{
				title: "user_name",
				dataIndex: "user_name",
				key: "user_name",
			},
			{
				title: "deal_id",
				dataIndex: "deal_id",
				key: "deal_id",
				fieldConfig: {
					isSearch: true,
					formOptions: {
						label: "deal_id",
						name: "deal_id",
						hidden: true,
					},
				},
			},
			{
				title: "deal_name",
				dataIndex: "deal_name",
				key: "deal_name",
			},
			{
				title: "content",
				dataIndex: "content",
				key: "content",
				fieldConfig: {
					isSearch: false,
					formOptions: {
						label: "content",
						name: "content",
						rules: [
							{
								required: true,
							},
						],
					},
				},
				render: (_, record) => (
					<div style={{ maxWidth: 250, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{record.content}</div>
				)
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
