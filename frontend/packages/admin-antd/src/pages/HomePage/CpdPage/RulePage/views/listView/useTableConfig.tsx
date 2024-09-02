import { CopyOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Tooltip } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { usePageConfig } from "src/common/hooks";
import { ROUTE_ID } from "src/router";
import { routerHelper, useFlat } from "src/service";
import type { Rule } from "src/service/stores/ruleStore/model";

const useConfig = () => {
	const { deleteRuleAct, activeRuleAct, ruleList } = useFlat("ruleStore");
	const { t } = useTranslation(["rule"]);
	return usePageConfig<Rule>(() => {
		return [
			{
				title: t("rulePage_NO"),
				dataIndex: "id",
				key: "id",
				align: "center",
				fixed: "left",
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
				title: t`rulePage_ruleName`,
				dataIndex: "ruleName",
				key: "ruleName",
				align: "center",
				fixed: "left",
				render: (item, record) => {
					const { id } = record;
					return (
						<Link
							to={{
								pathname: routerHelper.getRoutePathByKey(
									ROUTE_ID.RuleDetailPage,
								),
								search: `?id=${id}`,
							}}
						>
							{item}
						</Link>
					);
				},
				fieldConfig: {
					formOptions: {
						label: t`rulePage_ruleName`,
						name: "ruleName",
					},
					inputAttrConfig: {
						placeholder: t`placeholder_input`,
						maxLength: 30,
					},
				},
			},
			{
				title: t`rulePage_applyProduct`,
				dataIndex: "applyProduct",
				key: "applyProduct",
				align: "center",
				fieldConfig: {
					type: "Select",
					formOptions: {
						label: t`rulePage_applyProduct`,
						name: "applyProduct",
					},
					options: [
						{
							key: 1,
							value: 1,
							label: "ISHOP",
						},
						{
							key: 2,
							value: 2,
							label: "DSHOP",
						},
					],
				},
				render: (item) => {
					return {
						1: "ISHOP",
						2: "DSHOP",
					}[item * 1];
				},
			},
			{
				title: t`rulePage_status`,
				dataIndex: "status",
				key: "ruleType",
				align: "center",
				render: (item) => {
					return item ? t("rulePage_actived") : t("rulePage_saved");
				},
				fieldConfig: {
					type: "Select",
					options: [
						{
							key: 1,
							value: 1,
							label: t("rulePage_actived"),
						},
						{
							key: 0,
							value: 0,
							label: t("rulePage_saved"),
						},
					],
					formOptions: {
						label: t`rulePage_status`,
						name: "status",
					},
				},
			},
			{
				title: t("rulePage_sequenceNo"),
				dataIndex: "sequenceNo",
				key: "sequenceNo",
				align: "center",
				width: 100,
			},
			{
				title: t`rulePage.comment`,
				dataIndex: "comment",
				key: "comment",
				align: "center",
				width: "300px",
				render(value) {
					return (
						<div
							style={{
								textAlign: "center",
								width: "100%",
								overflow: "hidden",
								textOverflow: "ellipsis",
								whiteSpace: "nowrap",
							}}
						>
							{/* {value} */}
							<Tooltip placement="topLeft" title={value}>
								{value}
							</Tooltip>
						</div>
					);
				},
			},
			{
				title: t("rulePage_effectDateRange"),
				key: "Effect Date Range",
				width: 200,
				render: (_, record) => {
					const { effectStartDate, effectEndDate } = record;
					return `${
						effectStartDate
							? dayjs(effectStartDate).format("YYYY-MM-DD")
							: ""
					}~${
						effectEndDate
							? dayjs(effectEndDate).format("YYYY-MM-DD")
							: ""
					}`;
				},
			},
			{
				title: t`rulePage_action`,
				key: "action",
				align: "center",
				fixed: "right",
				width: "200px",
				render: (_, record) => (
					<Space size="middle">
						<a
							onClick={() => {
								routerHelper.jumpTo(ROUTE_ID.RuleAddPage, {
									search: {
										copyId: record.id,
									},
								});
							}}
						>
							<CopyOutlined />
						</a>
						<a
							onClick={() => {
								routerHelper.jumpTo(ROUTE_ID.RuleEditPage, {
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
										await deleteRuleAct({
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
						<Button
							onClick={() => {
								activeRuleAct({
									...record,
									status: record.status ? 0 : 1,
								});
							}}
							type={!record.status ? `primary` : "default"}
						>
							{!record.status
								? t("rulePage_active")
								: t("rulePage_inactive")}
						</Button>
					</Space>
				),
			},
		];
	}, [ruleList, t]);
};

export default useConfig;
