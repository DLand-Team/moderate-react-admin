import { Table } from "antd";
import { memo, useEffect } from "react";
import { useColumnsConfig } from "src/common/hooks/useColumnsConfig";
import { useFlat } from "src/service";
import SearchForm from "./components/searchForm/searchForm";
import styles from "./style.module.scss";
import useConfig from "./useConfig";
import ModalForm from "./components/modalForm/modalForm";

const UserPage = () => {
	const { loading, pageData, setPageData } = useFlat("userStore");
	const { pageNum, pageSize, total, dataList } = pageData;
	const config = useConfig();
	const columns = useColumnsConfig(config);
	useEffect(() => {
		handlePageChange(pageNum, pageSize);
	}, []);

	const handlePageChange = async (pageNum = 1, pageSize: number) => {
		setPageData({
			pageNum,
			pageSize,
		});
	};

	return (
		<div className={styles.content}>
			搜索栏目
			<SearchForm></SearchForm>
			<ModalForm />
			{/* 表格 */}
			<Table
				loading={loading}
				rowKey={(record) => {
					return record.id;
				}}
				pagination={{
					pageSize,
					current: pageNum,
					total,
					onChange(page, pageSize) {
						handlePageChange(page, pageSize);
					},
				}}
				columns={columns}
				dataSource={dataList}
				scroll={{
					x: "1000px",
				}}
			/>
		</div>
	);
};

export default memo(UserPage);
