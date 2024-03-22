import { Modal, Space } from "antd";
import { Link } from "react-router-dom";
import { usePageConfig } from "src/common/hooks";
import { useFlat } from "src/reduxService";
import { PageType } from "../services/model";

// change the name of the prime to primary

const useConfig = () => {
	const { setAddModalShowAct, deleteAct, queryAct, dataList, formVersion } =
		useFlat("categoryStore");
	const intlData = {};
	return usePageConfig<PageType>(() => {
		return [
			{
				title: "NO",
				dataIndex: "no",
				key: "no",
				config: {
					scope: ["search", "table"],
					formOptions: {
						label: "no",
						name: "no",
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
				title: "posName",
				dataIndex: "pos_name",
				key: "pos_name",
				render: (item, record) => {
					const { posId } = record;
					return (
						<Link
							to={{
								pathname: "/userCenter/pos/detail",
								search: `?title=posTitle&posId=${posId}`,
							}}
						>
							{item}
						</Link>
					);
				},
				config: {
					formOptions: {
						label: "pos_name",
						name: "pos_name",
						rules: [
							{
								required: true,
								message: `${intlData["posPage.placeholder_input"]} ${intlData["posPage.POSName"]}`,
							},
							{
								max: 30,
								message: intlData["posPage.rule_posName_1"],
							},
							{
								pattern: /^[0-9a-zA-z_-]+$/,
								message:
									intlData["posPage.placeholder_posName"],
							},
						],
					},
					inputOptions: {
						placeholder: intlData["posPage.placeholder_posName"],
						maxLength: 30,
						size: "small",
					},
				},
			},
			{
				title: "comment",
				dataIndex: "comment",
				key: "comment",
				render: (item, record) => {
					const { posId } = record;
					return (
						<Link
							to={{
								pathname: "/userCenter/pos/detail",
								search: `?title=posTitle&posId=${posId}`,
							}}
						>
							{item}
						</Link>
					);
				},
				config: {
					formOptions: {
						label: "comment",
						name: "comment",
						rules: [
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
				title: "action",
				key: "action",
				render: (_, record) => (
					<Space size="middle">
						<a
							onClick={() => {
								setAddModalShowAct({
									isShowAddModal: true,
									recordData: record,
								});
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
