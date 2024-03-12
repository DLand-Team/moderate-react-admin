import { useGreatAsync } from "@/common/hooks";
import { Checkbox, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import ModalForm from "./components/modalForm/modalForm";
import styles from "./index.module.scss";
import { useFlat } from "@/reduxService";
import {
	AdcompanyPageParams,
	PageType,
} from "@/reduxService/stores/devStore/model";

const columns: ColumnsType<PageType> = [
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
		render: (_, record) => (
			<Space size="middle">
				<a>修改</a>
			</Space>
		),
	},
];

const PageDevPage = () => {
	const {
		pageNum,
		pageSize,
		total,
		pageList,
		fetchPageListAct,
		addPageListAct,
	} = useFlat("devStore");

	const { loading: loading1, run: createArticleListG } = useGreatAsync(
		fetchPageListAct,
		{
			auto: true,
			debounceTime: 1000,
		},
	);

	const handlePageChange = async (pageNum = 1, pageSize) => {
		await createArticleListG();
	};

	const handleUpload = (values: AdcompanyPageParams) => {
		addPageListAct(values);
	};

	useEffect(() => {
		handlePageChange(pageNum, pageSize);
	}, []);

	return (
		<div className={styles.content}>
			<div className={styles.operate_board}>
				<ModalForm btnLabel={"添加路由"} handleUpload={handleUpload} />
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
						handlePageChange(page, pageSize);
					},
				}}
				columns={columns}
				dataSource={pageList}
			/>
		</div>
	);
};

export default PageDevPage;
