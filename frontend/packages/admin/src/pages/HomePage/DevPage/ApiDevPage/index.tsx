import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { useFlat } from "src/service";
import { CommonType } from "src/service/stores/devStore/model";
import ModalForm from "./components/modalForm/modalForm";
import styles from "./index.module.scss";

const columns: ColumnsType<CommonType> = [
	{
		title: "name",
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

const ApiDevPage = () => {
	const { pageNum, pageSize, addApiAct, total, apiList, fetchApiListAct } =
		useFlat("devStore");

	const handlePageChange = async () => {
		await fetchApiListAct();
	};
	const handleUpload = (values: any) => {
		addApiAct(values);
	};

	useEffect(() => {
		handlePageChange();
	}, []);

	return (
		<div className={styles.content}>
			<div className={styles.operate_board}>
				<ModalForm btnLabel="添加api" handleUpload={handleUpload} />
			</div>
			<Table
				rowKey={(record) => {
					return record.id;
				}}
				pagination={{
					pageSize,
					current: pageNum,
					total,
					onChange(page, pageSize) {
						console.log(page, pageSize);
						handlePageChange();
					},
				}}
				columns={columns}
				dataSource={apiList!}
			/>
		</div>
	);
};

export default ApiDevPage;
