import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Table } from "antd";
import { memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useColumnsConfig } from "src/common/hooks/useColumnsConfig";
import { useFlat } from "src/service";
import ModalForm from "./components/modalForm/modalForm";
import SearchForm from "./components/searchForm/searchForm";
import styles from "./style.module.scss";
import useConfig from "./useConfig";
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
	const { t } = useTranslation();

	return (
		<div className={styles.container}>
			<Card>
				<SearchForm></SearchForm>
			</Card>
			<div className={styles.titleWapper}>
				<div>
					<Button
						className={styles.btn}
						type="primary"
						icon={<PlusOutlined />}
					>
						{t`pos:posPage.add`}
					</Button>
					<Button icon={<DeleteOutlined />}>
						{t`pos:posPage.delete`}
					</Button>
				</div>
			</div>
			<Card>
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
			</Card>
			{/* 表格 */}

			{/* modal */}
			<ModalForm />
		</div>
	);
};

export default memo(DealPage);
