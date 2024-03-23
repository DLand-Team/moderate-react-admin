import { Modal, Space } from "antd";
import { Link } from "react-router-dom";
import { usePageConfig } from "src/common/hooks";
import { useFlat } from "src/reduxService";
import { useTranslation } from "react-i18next";
import { PageType } from "src/reduxService/stores/posStore/model";

const useConfig = () => {
	const { setAddModalShowAct, deleteAct, queryAct, dataList } =
		useFlat("posStore");
	const { t } = useTranslation(["pos"]);
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
				title: t`posPage.posName`,
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
								message: `${t`posPage.placeholder_input`} ${t`posPage.POSName`}`,
							},
							{
								max: 30,
								message: t`posPage.rule_posName_1`,
							},
							{
								pattern: /^[0-9a-zA-z_-]+$/,
								message: t`posPage.placeholder_posName`,
							},
						],
					},
					inputAttrConfig: {
						placeholder: t`posPage.placeholder_posName`,
						maxLength: 30,
						size: "small",
					},
				},
			},
			{
				title: t`posPage.comment`,
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
						label: t`posPage.comment`,
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
				title: t`posPage.action`,
				key: "action",
				render: (_, record) => (
					<Space size="middle">
						<a
							onClick={() => {
								setAddModalShowAct({
									isShowAddModal: true,
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
	}, [dataList]);
};

export default useConfig;
