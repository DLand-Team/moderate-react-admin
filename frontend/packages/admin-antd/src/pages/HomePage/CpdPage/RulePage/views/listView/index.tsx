import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Table, Tooltip, message } from "antd";
import { useTranslation } from "react-i18next";
import { ROUTE_ID } from "src/router";
import { routerHelper, useFlat } from "src/service";
import SearchForm from "../../components/searchForm/searchForm";
import styles from "./style.module.scss";
import useConfig from "./useTableConfig";

export interface ListViewProps {
	branchName?: string;
}
const ListView = ({ branchName }: ListViewProps) => {
	const { columns } = useConfig();
	const {
		ruleList,
		ruleTablePagedata,
		setRuleTablePageData,
		selectedRowKeys,
		setSelectedRowKeys,
		deleteRuleAct,
	} = useFlat(["ruleStore", branchName]);
	const { t } = useTranslation("rule");
	const { pageNum, pageSize, total } = ruleTablePagedata;

	const rowSelection = {
		onChange: (selectedRowKeys: any) => {
			setSelectedRowKeys(selectedRowKeys);
		},
	};
	return (
		<div className={styles.container}>
			<Card>
				<SearchForm></SearchForm>
			</Card>

			<div className={styles.titleWapper}>
				<div>
					<Button
						className={styles.btn}
						type="primary"
						onClick={() => {
							routerHelper.jumpTo(ROUTE_ID.RuleAddPage);
						}}
						style={{
							marginBottom: 12,
						}}
					>
						+ {t("rulePage_add")}
					</Button>
					<Button
						onClick={() => {
							if (selectedRowKeys.length == 0) {
								return message.warning(
									t`common:blog.warn_select`,
								);
							}
							Modal.confirm({
								title: t`common:blog.modalDeleteTitle`,
								content: t`common:blog.modalDeleteContent`,
								onOk: async () => {
									await deleteRuleAct({
										ids: selectedRowKeys.join(","),
									});
								},
								okText: t`common:blog.Yes`,
								cancelText: t`common:blog.No`,
							});
						}}
						icon={<DeleteOutlined />}
					>
						{t`pos:posPage.delete`}
					</Button>
				</div>
			</div>
			<Card
				title={
					<div>
						{t("rulePage_ruleList")}
						<Tooltip
							title={t("rulePage_ruleListTips")}
							placement="rightTop"
						>
							<QuestionCircleOutlined style={{ marginLeft: 8 }} />
						</Tooltip>
					</div>
				}
			>
				<Table
					rowKey={(record) => {
						return record.id;
					}}
					scroll={{ x: 1300 }}
					pagination={{
						pageSizeOptions: [5, 10, 15],
						showSizeChanger: true,
						pageSize,
						current: pageNum,
						total,
						onChange(pageNum, pageSize) {
							setRuleTablePageData({
								pageNum,
								pageSize,
							});
						},
					}}
					columns={columns}
					dataSource={ruleList}
					rowSelection={{
						type: "checkbox",
						...rowSelection,
					}}
				/>
			</Card>
		</div>
	);
};

export default ListView;
