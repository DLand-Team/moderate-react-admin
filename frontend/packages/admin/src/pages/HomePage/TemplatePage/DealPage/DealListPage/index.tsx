import { Table } from "antd";
import { memo, useEffect } from "react";
import { useFlat } from "src/service";
import ModalForm from "./components/modalForm/modalForm";
import SearchForm from "./components/searchForm/searchForm";
import styles from "./style.module.scss";
import useConfig from "./useConfig";
import { useColumnsConfig } from "src/common/hooks/useColumnsConfig";

const DealPage = () => {
	const { loading, pageData, setPageData } = useFlat("dealStore");
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
			{/* modal */}
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

export default memo(DealPage);
