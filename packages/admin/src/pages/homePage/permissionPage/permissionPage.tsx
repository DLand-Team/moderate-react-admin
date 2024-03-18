import { Checkbox, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import ModalForm from "./components/modalForm/modalForm";
import styles from "./permissionPage.module.scss";
import { useFlat } from "src/reduxService";
import { useGreatAsync } from "src/common/hooks";

const columns: ColumnsType<any> = [
	{
		title: "页面名称",
		dataIndex: "name",
		key: "name",
	},
	{
		title: "路径",
		dataIndex: "path",
		key: "path",
	},
	{
		title: "可用",
		dataIndex: "active",
		key: "active",
		render: (_, record) => <Checkbox checked={record.active}></Checkbox>,
	},
	{
		title: "操作",
		key: "action",
		render: (_) => (
			<Space size="middle">
				<a>修改</a>
			</Space>
		),
	},
];

const PermissionPage = () => {
	const { pageNum, pageSize, total, pageList, fetchPageListAct } =
		useFlat("devStore");
	const { loading: loading1, run: createArticleListG } = useGreatAsync(
		fetchPageListAct,
		{
			auto: true,
			debounceTime: 1000,
		},
	);

	const handlePageChange = async () => {
		await createArticleListG();
	};
	const handleUpload = () => {};
	useEffect(() => {
		handlePageChange();
	}, []);
	return (
		<div className={styles.content}>
			<div className={styles.operate_board}>
				<ModalForm handleUpload={handleUpload} />
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
						handlePageChange();
					},
				}}
				columns={columns}
				dataSource={pageList!}
			/>
		</div>
	);
};

export default PermissionPage;
