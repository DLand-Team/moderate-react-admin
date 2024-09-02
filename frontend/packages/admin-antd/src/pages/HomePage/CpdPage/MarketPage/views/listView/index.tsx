import {
    DeleteOutlined,
    PlusOutlined
} from "@ant-design/icons";
import { Card, message, Modal, Table } from "antd";
import { useTranslation } from "react-i18next";
import { TableCard } from "src/components";
import { ROUTE_ID } from "src/router";
import { routerHelper, useFlat } from "src/service";
import SearchForm from "../../components/searchForm/searchForm";
import styles from "./style.module.scss";
import useConfig from "./useConfig";

const ListView = () => {
	const { t } = useTranslation(["market"]);
	const { t: commonT } = useTranslation(["common"]);
	const { columns, searchList } = useConfig();
	const {
		marketList,
		marketTablePagedata,
		setMarketTablePageData,
		deleteAct,
		selectedRowKeys,
		setSelectedRowKeys,
	} = useFlat("marketStore");
	const { pageNum, pageSize, total } = marketTablePagedata;

	const rowSelection = {
		onChange: (selectedRowKeys: any) => {
			setSelectedRowKeys(selectedRowKeys);
		},
	};

	return (
		<div className={styles.content}>
			<Card>
				<SearchForm searchList={searchList}></SearchForm>
			</Card>

			{/* modal */}
			{/* 表格 */}
			<TableCard
				style={{
					marginTop: "12px",
				}}
				title={t`marketPage.listTile`}
				desc={t`marketPage.listTileTips`}
				buttonList={[
					{
						title: t`marketPage.add`,
						icon: <PlusOutlined />,
						handleClick: () => {
							routerHelper.jumpTo(ROUTE_ID.MarketAddPage);
						},
					},
					{
						title: t`marketPage.delete`,
						icon: <DeleteOutlined />,
						option: {
							type: "default",
						},
						handleClick: () => {
							if (selectedRowKeys.length == 0) {
								return message.warning(
									commonT`blog.warn_select`,
								);
							}
							Modal.confirm({
								title: commonT`blog.modalDeleteTitle`,
								content: commonT`blog.modalDeleteContent`,
								onOk: async () => {
									await deleteAct({
										ids: selectedRowKeys.join(","),
									});
								},
								okText: commonT`blog.Yes`,
								cancelText: commonT`blog.No`,
							});
						},
					},
				]}
			>
				<Table
					rowKey={(record) => {
						return record.id || record.marketName;
					}}
					pagination={{
						pageSizeOptions: [5, 10, 15],
						showSizeChanger: true,
						pageSize,
						current: pageNum,
						total,
						// showTotal: (total) => `Total ${total} items`,
						onChange(pageNum, pageSize) {
							setMarketTablePageData({
								pageNum,
								pageSize,
							});
						},
					}}
					columns={columns}
					dataSource={marketList}
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
