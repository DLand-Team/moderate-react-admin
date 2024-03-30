import { useGreatAsync } from "src/common/hooks";
import { Checkbox, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import ModalForm from "./components/modalForm/modalForm";
import styles from "./index.module.scss";
import { useFlat } from "src/reduxService";
import {
	AdcompanyPageParams,
	PageType,
} from "src/reduxService/stores/devStore/model";
import { useTranslation } from "react-i18next";

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
		render: () => (
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
	const { t } = useTranslation(["dev"]);
	const { loading: loading1, fn: createArticleListG } = useGreatAsync(
		fetchPageListAct,
		{
			auto: true,
			debounceTime: 1000,
		},
	);
	const handlePageChange = async () => {
		await createArticleListG();
	};

	const handleUpload = (values: AdcompanyPageParams) => {
		addPageListAct(values);
	};

	useEffect(() => {
		handlePageChange();
	}, []);

	return (
		<div className={styles.content}>
			<div className={styles.operate_board}>
				<ModalForm
					btnLabel={t`dev.addRouter`}
					handleUpload={handleUpload}
				/>
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
					onChange() {
						handlePageChange();
					},
				}}
				columns={columns}
				dataSource={pageList || []}
			/>
		</div>
	);
};

export default PageDevPage;
