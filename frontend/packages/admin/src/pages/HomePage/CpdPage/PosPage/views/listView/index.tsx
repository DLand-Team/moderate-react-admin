import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Table, message } from "antd";
import { useTranslation } from "react-i18next";
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
		queryPostListAct,
		posList,
		posTablePagedata,
		setPosTablePageData,
		selectedRowKeys,
		setSelectedRowKeys,
		deleteAct,
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

			<div className={styles.titleWapper}>
				<div>
					<Button
						type="primary"
						onClick={() => {
							routerHelper.jumpTo(ROUTE_ID.PosAdd);
						}}
						icon={<PlusOutlined />}
						className={styles.btn}
					>
						{t`pos:posPage.add`}
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
									await deleteAct({
										ids: selectedRowKeys.join(","),
									});
									queryPostListAct();
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

			{/* 表格 */}
			<Card title={t`pos:posPage.listTile`}>
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
			</Card>
		</div>
	);
};

export default PosListView;
