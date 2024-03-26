/*
 * @Author: Do not edit
 * @Date: 2024-03-18 11:51:26
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-03-19 11:35:29
 * @Description: Do not edit
 */
import { RouterHelper, useFlat } from "src/reduxService";
import { Button, Table } from "antd";
import SearchForm from "./components/searchForm/searchForm";
import styles from "./style.module.scss";
import { useEffect } from "react";
import { ROUTE_ID } from "src/config/routerConfig";
import useConfig from "./useConfig";

const CategoryPage = () => {
	const { columns } = useConfig();
	const { queryPostListAct } = useFlat("posStore");
	useEffect(() => {
		queryPostListAct();
	}, []);

	return (
		<div className={styles.content}>
			{/* 搜索栏目 */}
			<SearchForm></SearchForm>
			{/* 按钮  */}
			<Button
				type="primary"
				onClick={() => {
					RouterHelper.jumpTo(ROUTE_ID.posEditPage);
				}}
				style={{
					marginBottom: 12,
				}}
			>
				+ 添加
			</Button>
			{/* modal */}
			{/* <ModalForm /> */}
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
