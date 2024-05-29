import { Table } from "antd";
import { useEffect } from "react";
import { useColumnsConfig } from "src/common/hooks/useColumnsConfig";
import { useFlat } from "src/service";
import SearchForm from "./components/searchForm/searchForm";
import styles from "./style.module.scss";
import useConfig from "./useConfig";

const DealApprovalPage = () => {
	const { approvalPageData, setApprovalPageData, loading } =
		useFlat("dealStore");
	const { pageNum, pageSize, total, dataList } = approvalPageData;
	const config = useConfig();
	const columns = useColumnsConfig(config);
	useEffect(() => {
		handlePageChange(pageNum, pageSize);
	}, []);

	const handlePageChange = async (pageNum = 1, pageSize: number) => {
		setApprovalPageData({
			pageNum,
			pageSize,
		});
	};
	return (
		<div className={styles.content}>
			搜索栏目
			<SearchForm></SearchForm>
			{/* 表格 */}
			<Table
				loading={loading}
				rowKey={"id"}
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

export default DealApprovalPage;
