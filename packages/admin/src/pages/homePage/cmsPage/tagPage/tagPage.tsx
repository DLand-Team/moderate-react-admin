import { Button, Select, Table } from "antd";
import { useEffect } from "react";
import ModalForm from "./components/modalForm";
import SearchForm from "./components/searchForm/searchForm";
import { useStore } from "./services/pageStore";
import styles from "./style.module.scss";
import useConfig, { TYPE_ENUM } from "./useConfig";

const TagPage = () => {
	const {
		pageNum,
		pageSize,
		loading,
		total,
		dataList,
		currentTypeId,
		setcurrentTypeId,
		queryAct,
		setAddModalShowAct,
	} = useStore()[0];

	const { columns } = useConfig();

	useEffect(() => {
		handlePageChange(pageNum, pageSize);
	}, [currentTypeId]);

	const handlePageChange = async (pageNum = 1, pageSize) => {
		await queryAct({
			page: pageNum,
			page_size: pageSize,
			type: TYPE_ENUM[currentTypeId],
		});
	};

	return (
		<div className={styles.content}>
			{/* 搜索栏目 */}
			<SearchForm></SearchForm>
			{/* 按钮  */}
			<div>
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
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "flex-end",
					marginBottom:10
				}}
			>
				<Select
					style={{
						width: 100,
					}}
					onChange={(e) => {
						setcurrentTypeId(e);
					}}
					defaultValue={TYPE_ENUM[currentTypeId]}
				>
					{TYPE_ENUM.map((item, index) => {
						return (
							<Select.Option key={item} value={index}>
								{item}
							</Select.Option>
						);
					})}
				</Select>
			</div>
			{/* modal */}
			<ModalForm />
			{/* 表格 */}
			<Table
				scroll={{ x: 1500, y: 300 }}
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

export default TagPage;
