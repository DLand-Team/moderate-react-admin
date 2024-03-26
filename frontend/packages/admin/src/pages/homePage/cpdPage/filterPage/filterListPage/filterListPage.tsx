import { RouterHelper, useFlat } from "src/reduxService";
import { Button, Table } from "antd";
import styles from "./style.module.scss";
import { useEffect } from "react";
import { ROUTE_ID } from "src/config/routerConfig";
import useConfig from "./useConfig";

const ListPage = () => {
	const { columns } = useConfig();
	const { queryPostListAct } = useFlat("posStore");
	useEffect(() => {
		queryPostListAct();
	}, []);

	return (
		<div className={styles.content}>
			{/* 按钮  */}
			<Button
				type="primary"
				onClick={() => {
					RouterHelper.jumpTo(ROUTE_ID.marketEditPage);
				}}
				style={{
					marginBottom: 12,
				}}
			>
				+ 添加
			</Button>
			<Table
				rowKey={(record) => {
					return record.id;
				}}
				columns={columns}
			/>
		</div>
	);
};

export default ListPage;
