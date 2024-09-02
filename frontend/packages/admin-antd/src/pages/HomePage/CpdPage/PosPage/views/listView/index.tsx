import {
    DeleteOutlined,
    PlusOutlined
} from "@ant-design/icons";
import { Card, message, Modal, Table } from "antd";
import { useTranslation } from "react-i18next";
import { TableCard } from "src/components";
import { ROUTE_ID } from "src/router";
import { routerHelper, useFlat } from "src/service";
import SearchForm from "../../components/searchForm";
import styles from "./style.module.scss";
import useTableConfig from "./useTableConfig";

/* type */
export interface PosListViewProps {
	isSub?: boolean;
	handleCancel?: () => void;
	branchName?: string;
}

/* Main */
const PosListView = ({ branchName }: PosListViewProps) => {
	const { t } = useTranslation();
	const { columns, searchList } = useTableConfig(branchName);
	const {
		posList,
		posTablePagedata,
		setPosTablePageData,
		selectedRowKeys,
		setSelectedRowKeys,
		deletePosAct,
	} = useFlat(["posStore", branchName]);
	const { pageNum, pageSize, total } = posTablePagedata;

	const rowSelection = {
		onChange: (selectedRowKeys: any) => {
			setSelectedRowKeys(selectedRowKeys);
		},
	};

	return (
		<div className={styles.container}>
			<Card>
				<SearchForm searchList={searchList}></SearchForm>
			</Card>

			{/* 表格 */}
			<TableCard
				style={{
					marginTop: "12px",
				}}
				title={t`pos:posPage.listTitle`}
				desc={t`pos:posPage.listTileTips`}
				buttonList={[
					{
						title: t`pos:posPage.add`,
						icon: <PlusOutlined />,
						handleClick: () => {
							routerHelper.jumpTo(ROUTE_ID.PosAddPage);
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
									await deletePosAct({
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
					scroll={{
						x: "100%",
					}}
					rowKey={(record) => {
						return record.id!;
					}}
					pagination={{
						pageSizeOptions: [5, 10, 15],
						showSizeChanger: true,
						pageSize,
						current: pageNum,
						total,
						onChange(pageNum, pageSize) {
							setPosTablePageData({
								pageNum,
								pageSize,
							});
						},
					}}
					columns={columns}
					dataSource={posList}
					rowSelection={{
						type: "checkbox",
						...rowSelection,
					}}
				/>
			</TableCard>
		</div>
	);
};

export default PosListView;
