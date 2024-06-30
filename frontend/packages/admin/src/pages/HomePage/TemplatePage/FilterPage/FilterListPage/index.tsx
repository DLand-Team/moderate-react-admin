import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Table, message } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { dp, useFlat } from "src/service";
import ModalForm from "./components/modalForm/modalForm";
import SearchForm from "./components/searchForm/searchForm";
import styles from "./style.module.scss";
import useConfig from "./useConfig";

const ListPage = () => {
	const { columns } = useConfig();
	const {
		list,
		tablePagedata,
		setIsShowModal,
		setPageData,
		deleteAct,
		queryListAct,
		selectedRowKeys,
		setSelectedRowKeys,
	} = useFlat("filterStore");
	const { t } = useTranslation(["filter"]);
	const { t: commonT } = useTranslation(["common"]);
	useEffect(() => {
		setPageData({
			pageNum: 1,
		});
	}, []);
	const rowSelection = {
		onChange: (selectedRowKeys: any) => {
			setSelectedRowKeys(selectedRowKeys);
		},
	};
	const [messageApi] = message.useMessage();
	return (
		<div className={styles.content}>
			<Card>
				<SearchForm></SearchForm>
			</Card>
			{/* 按钮  */}
			<div className={styles.titleWapper}>
				<div>
					<Button
						type="primary"
						onClick={() => {
							setIsShowModal(true);
							dp("filterStore", "setCurrentData", null);
						}}
						style={{
							marginBottom: 12,
						}}
						icon={<PlusOutlined />}
					>
						{t`filterItem.add`}
					</Button>
					<Button
						onClick={() => {
							Modal.confirm({
								title: t`filterItem.DelTile`,
								content: t`filterItem.modalDeleteContent`,
								onOk: async () => {
									if (selectedRowKeys.length > 0) {
										await deleteAct({
											ids: selectedRowKeys.join(","),
										});
										queryListAct();
									} else {
										return messageApi.open({
											type: "warning",
											content: commonT`blog.warn_select`,
										});
									}
								},
								okText: t`filterItem.Yes`,
								cancelText: t`filterItem.No`,
							});
						}}
						style={{
							marginBottom: 12,
							marginLeft: 12,
						}}
					>
						{t`filterItem.delete`}
					</Button>
				</div>
			</div>

			<ModalForm />
			<Card title={t`filterItem.listTile`}>
				<Table
					rowKey={(record) => {
						return record.id;
					}}
					columns={columns}
					pagination={{
						pageSizeOptions: [5, 10, 15],
						showSizeChanger: true,
						pageSize: tablePagedata.pageSize,
						current: tablePagedata.pageNum,
						total: tablePagedata.total,
						onChange(page, pageSize) {
							// pageSize改变了
							if (tablePagedata.pageSize !== pageSize) {
								setPageData({
									pageNum: 1,
									pageSize: pageSize,
								});
							} else {
								setPageData({
									pageNum: page,
								});
							}
						},
					}}
					dataSource={list}
					rowSelection={{
						type: "checkbox",
						...rowSelection,
					}}
				/>
			</Card>
		</div>
	);
};

export default ListPage;
