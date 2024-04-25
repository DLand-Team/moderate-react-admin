import { Button, Checkbox, Pagination, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useGreatAsync } from "src/common/hooks";
import { useFlat } from "src/service";
import {
	AdcompanyPageParams,
	PageType,
} from "src/service/stores/devStore/model";
import ModalForm from "./components/modalForm/modalForm";
import styles from "./index.module.scss";

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
	const { addWinBox } = useFlat("appStore");
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
			<Button
				onClick={() => {
					addWinBox({
						content: (
							<div
								style={{
									background: "#e9ecf0",
									width: "100%",
									height: "100%",
									color: "black",
								}}
							>
								Test
							</div>
						),
					});
				}}
			>
				show
			</Button>
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
				pagination={false}
				loading={loading1}
				columns={columns}
				dataSource={pageList || []}
				footer={() => (
					<div
						style={{
							display: "flex",
							justifyContent: "flex-end",
						}}
					>
						<Pagination
							{...{
								pageSize,
								current: pageNum,
								total,
							}}
						></Pagination>
					</div>
				)}
			/>
		</div>
	);
};

export default PageDevPage;
