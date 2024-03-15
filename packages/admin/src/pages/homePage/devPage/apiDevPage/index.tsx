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
		title: "name",
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

const ApiDevPage = () => {
	const { pageNum, pageSize, addApiAct, total, apiList, fetchApiListAct } =
		useFlat("devStore");

	const { loading: loading1, run: createApiListG } = useGreatAsync(
		fetchApiListAct,
		{
			auto: true,
			debounceTime: 1000,
		},
	);

	const handlePageChange = async (pageNum = 1, pageSize) => {
		await createApiListG();
	};
	const handleUpload = (values: any) => {
		addApiAct(values);
	};

	useEffect(() => {
		handlePageChange(pageNum, pageSize);
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
				dataSource={apiList}
			/>
		</div>
	);
};

export default ApiDevPage;
