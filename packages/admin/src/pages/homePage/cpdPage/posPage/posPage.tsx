/*
 * @Author: Do not edit
 * @Date: 2024-03-18 11:51:26
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-03-19 11:35:29
 * @Description: Do not edit
 */
import { useFlat } from "src/reduxService";
import { Button, Table } from "antd";
import ModalForm from "./components/modalForm/modalForm";
import SearchForm from "./components/searchForm/searchForm";
import styles from "./style.module.scss";
import useConfig from "./useConfig";
import { useEffect } from "react";

const CategoryPage = () => {
	const { columns } = useConfig();

	const { setAddModalShowAct, queryAct } = useFlat("posStore");
	useEffect(() => {
		queryAct();
	}, []);

	return (
		<div className={styles.content}>
			{/* 搜索栏目 */}
			<SearchForm></SearchForm>
			{/* 按钮  */}
			<Button
				type="primary"
				onClick={() => {
					setAddModalShowAct({ isShowAddModal: true });
				}}
				style={{
					marginBottom: 12,
				}}
			>
				+ add
			</Button>
			{/* modal */}
			<ModalForm />
			{/* 表格 */}
			<Table
				rowKey={(record) => {
					return record.id;
				}}
				// loading={loading}
				// pagination={{
				// 	pageSize,
				// 	current: pageNum,
				// 	total,
				// 	onChange(page, pageSize) {
				// 		console.log(page, pageSize);
				// 		handlePageChange(page, pageSize);
				// 	},
				// }}
				columns={columns}
				// dataSource={dataList}
			/>
		</div>
	);
};

export default CategoryPage;
