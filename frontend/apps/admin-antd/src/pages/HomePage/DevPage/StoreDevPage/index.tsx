import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { useFlat } from "src/service";
import type { CommonType } from "src/service/stores/devStore/model";
import ModalForm from "./components/modalForm/modalForm";
import styles from "./index.module.scss";

const columns: ColumnsType<CommonType> = [
	{
		title: "状态仓库名称",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "操作",
		key: "action",
		render: () => (
			<Space size="middle">
				<a>修改</a>
			</Space>
		),
	},
];

const StoreDevPage = () => {
	const {
		pageNum,
		pageSize,
		total,
		storeList,
		addStoreAct,
		fetchStoreListAct,
	} = useFlat("devStore");

	const handlePageChange = async () => {
		await fetchStoreListAct();
	};
	const handleUpload = (values: any) => {
		addStoreAct(values);
	};
	useEffect(() => {
		handlePageChange();
	}, []);
	return (
		<div className={styles.content}>
			<div className={styles.operate_board}>
				<ModalForm
					btnLabel="添加状态仓库"
					handleUpload={handleUpload}
				/>
			</div>
			<Table
				rowKey={(record) => {
					return record.id;
				}}
				pagination={{
					pageSize,
					current: pageNum,
					total,
					onChange() {
						handlePageChange();
					},
				}}
				columns={columns}
				dataSource={storeList!}
			/>
		</div>
	);
};

export default StoreDevPage;
