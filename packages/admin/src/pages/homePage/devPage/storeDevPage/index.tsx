import { useGreatAsync } from "src/common/hooks";
import { useFlat } from "src/reduxService";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import ModalForm from "./components/modalForm/modalForm";
import styles from "./index.module.scss";
import { CommonType } from "src/reduxService/stores/devStore/model";

const columns: ColumnsType<CommonType> = [
	{
		title: "状态仓库名称",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "操作",
		key: "action",
		render: (_, record) => (
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

	const { loading: loading1, run: createStoreListG } = useGreatAsync(
		fetchStoreListAct,
		{
			auto: true,
			debounceTime: 1000,
		},
	);

	const handlePageChange = async (pageNum = 1, pageSize) => {
		await createStoreListG();
	};
	const handleUpload = (values: any) => {
		addStoreAct(values);
	};
	useEffect(() => {
		handlePageChange(pageNum, pageSize);
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
				loading={loading1}
				pagination={{
					pageSize,
					current: pageNum,
					total,
					onChange(page, pageSize) {
						console.log(page, pageSize);
						handlePageChange(page, pageSize);
					},
				}}
				columns={columns}
				dataSource={storeList}
			/>
		</div>
	);
};

export default StoreDevPage;
