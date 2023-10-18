import { useFlatInject } from "@/common/hooks";
import { Button, Table } from "antd";
import { useEffect } from "react";
import ModalForm from "./components/modalForm/modalForm";
import SearchForm from "./components/searchForm/searchForm";
import styles from "./style.module.scss";
import useConfig from "./useConfig";

const CompanyPage = () => {
	const {
		pageNum,
		pageSize,
		loading,
		total,
		dataList,
		queryAct,
		setAddModalShowAct,
	} = useFlatInject("sectsPageStore")[0];

	const { columns } = useConfig();

	useEffect(() => {
		handlePageChange(pageNum, pageSize);
	}, []);

	const handlePageChange = async (pageNum = 1, pageSize) => {
		await queryAct({ page: pageNum, page_size: pageSize });
	};

	return (
		<div className={styles.content}>
			{/* 搜索栏目 */}
			<SearchForm></SearchForm>
			{/* 按钮  */}
			<Button
				type="primary"
				onClick={() => {
					setAddModalShowAct(true);
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
				loading={loading}
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
				dataSource={dataList}
			/>
		</div>
	);
};

export default CompanyPage;
