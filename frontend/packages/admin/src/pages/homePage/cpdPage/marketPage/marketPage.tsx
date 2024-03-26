import styles from "./style.module.scss";

import { Outlet } from "react-router-dom";

const MarketPage = () => {
	return (
		<div className={styles.content}>
			<Outlet />
		</div>
	);
};

export default MarketPage;
