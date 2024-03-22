/*
 * @Author: Do not edit
 * @Date: 2024-03-18 11:51:26
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-03-19 11:35:29
 * @Description: Do not edit
 */
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useFlat } from "src/reduxService";
import styles from "./style.module.scss";

const PosPage = () => {
	const { queryAct } = useFlat("posStore");
	useEffect(() => {
		queryAct();
	}, []);

	return (
		<div className={styles.content}>
			<Outlet />
		</div>
	);
};

export default PosPage;
