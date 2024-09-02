import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Modal, Space, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { usePageConfig } from "src/common/hooks";
import { getTextWidth } from "src/common/utils";
import { ROUTE_ID } from "src/router";
import { useFlat } from "src/service";
import { routerHelper } from "src/service";
import type { Pos } from "src/service/stores/posStore/model";

const useTableConfig = (branchName?: string) => {
	const { deletePosAct, posList } = useFlat(["posStore", branchName], {
		posList: "IN",
	});
	const { t } = useTranslation("pos");
	return usePageConfig<Pos>(() => {
		return [
			{
				title: t`pos:posPage.NO`,
				dataIndex: "id",
				key: "id",
				align: "center",
				fieldConfig: {
					scope: ["table"],
					formOptions: {
						label: "id",
						name: "id",
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
				title: t`pos:posPage.posName`,
				dataIndex: "posName",
				key: "posName",
				align: "center",
				render: (item, record) => {
					return (
						<Link
							to={{
								pathname: routerHelper.getRoutePathByKey(
									ROUTE_ID.PosDetailPage,
								),
								search: "?id=" + record.id,
							}}
						>
							{item}
						</Link>
					);
				},
				fieldConfig: {
					formOptions: {
						label: t`pos:posPage.posName`,
						name: "posName",
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
						placeholder: t`posPage.placeholder_searchPosName`,
						maxLength: 30,
					},
				},
			},
			{
				title: t`pos:posPage.comment`,
				dataIndex: "comment",
				key: "comment",
				align: "center",
				ellipsis: {
					showTitle: false,
				},
				render: (value) => {
					const width = getTextWidth(value, "14");
					if (width > 150) {
						return (
							<Tooltip placement="topLeft" title={value}>
								{value}
							</Tooltip>
						);
					}
					return value;
				},
				fieldConfig: {
					scope: ["table"],
					formOptions: {
						label: t`pos:posPage.comment`,
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
				title: t`pos:posPage.action`,
				key: "action",
				align: "center",
				render: (_, record) => (
					<Space size="middle">
						<a
							onClick={() => {
								routerHelper.jumpTo(ROUTE_ID.PosEditPage, {
									search: {
										id: record.id,
									},
								});
							}}
						>
							<EditOutlined />
						</a>
						<a
							onClick={() => {
								Modal.confirm({
									title: t`common:blog.modalDeleteTitle`,
									content: t`common:blog.modalDeleteContent`,
									onOk: async () => {
										await deletePosAct({
											ids: record.id,
										});
									},
									okText: t`common:blog.Yes`,
									cancelText: t`common:blog.No`,
								});
							}}
						>
							<DeleteOutlined />
						</a>
					</Space>
				),
			},
		];
	}, [posList]);
};

export default useTableConfig;
