import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Modal, Table, message } from "antd";
import { useTranslation } from "react-i18next";
import { TableCard } from "src/components";
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

			<TableCard
				style={{
					marginTop: "12px",
				}}
				title={t("rulePage_ruleList")}
				desc={t("rulePage_ruleListTips")}
				buttonList={[
					{
						title: t("rulePage_add"),
						icon: <PlusOutlined />,
						handleClick: () => {
							routerHelper.jumpTo(ROUTE_ID.RuleAddPage);
						},
					},
					{
						title: t`pos:posPage.delete`,
						icon: <DeleteOutlined />,
						option: {
							type: "default",
						},
						handleClick: () => {
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
						},
					},
				]}
			>
				<Table
					rowKey={(record) => {
						return record.id!;
					}}
					scroll={{ x: 1300 }}
					pagination={{
						pageSizeOptions: [5, 10, 15],
						showSizeChanger: true,
						pageSize,
						current: pageNum,
						total,
						// showTotal: (total) => `Total ${total} items`,
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
			</TableCard>
		</div>
	);
};

export default ListView;
