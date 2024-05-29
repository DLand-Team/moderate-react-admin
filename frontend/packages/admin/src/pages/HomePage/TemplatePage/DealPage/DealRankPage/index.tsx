import { Button, Col, Modal, Row, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { useColumnsConfig } from "src/common/hooks/useColumnsConfig";
import { useFlat } from "src/service";
import SearchForm from "./components/searchForm/searchForm";
import styles from "./style.module.scss";
import useConfig from "./useConfig";

const DealRankPage = () => {
	const {
		loading,
		searchList,
		rankListAct,
		querySearchListAct,
		rankPageData,
		setRankPageData,
	} = useFlat("dealStore");
	const { pageNum, pageSize, dataList, total } = rankPageData;
	const [selectedList, setSelectedList] = useState<string[]>([]);
	const [isShowSort, setIsShowSort] = useState(false);
	const config = useConfig();
	const columns = useColumnsConfig(config);
	useEffect(() => {
		querySearchListAct();
		handlePageChange(pageNum, pageSize);
	}, []);

	const handlePageChange = async (pageNum = 1, pageSize: number) => {
		setRankPageData({
			pageNum,
			pageSize,
		});
	};
	return (
		<div className={styles.container}>
			<Button
				onClick={() => {
					setIsShowSort(true);
				}}
				style={{
					marginBottom: "20px",
				}}
			>
				Sort
			</Button>
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

			<Modal
				onCancel={() => {
					setIsShowSort(false);
				}}
				destroyOnClose
				onOk={async () => {
					const arr: Promise<any>[] = [];
					selectedList.forEach((item, index) => {
						if (item) {
							arr.push(
								rankListAct({
									deal_id: Number(item),
									order: index,
								}),
							);
						}
					});
					await Promise.all(arr);
					handlePageChange(1, pageSize);
					setIsShowSort(false);
				}}
				open={isShowSort}
			>
				{Array.from(new Array(16)).map((_, index) => {
					return (
						<Row
							style={{
								marginBottom: "10px",
							}}
							key={index}
						>
							<Col span={12}>
								<Select
									placeholder="Deal"
									style={{
										width: "90%",
									}}
									filterOption={(inputValue, option) => {
										if (
											option?.label
												.toLowerCase()
												.includes(
													inputValue.toLowerCase(),
												)
										) {
											return true;
										}
										return false;
									}}
									onChange={(e) => {
										let temp = [...selectedList];
										temp[index] = e;
										setSelectedList(temp);
									}}
									showSearch
									options={searchList
										.filter((item) => {
											return !selectedList.some((a) => {
												return item.id == Number(a);
											});
										})
										.map((d) => ({
											value: d.id,
											label: d.title,
										}))}
								></Select>
							</Col>
							<Col span={12}>Rank {index + 1}</Col>
						</Row>
					);
				})}
			</Modal>
		</div>
	);
};

export default DealRankPage;
