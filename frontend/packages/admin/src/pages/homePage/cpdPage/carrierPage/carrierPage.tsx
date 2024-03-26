import styles from "./style.module.scss";

import { Outlet } from "react-router-dom";

const CarrierPage = () => {
	return (
		<div className={styles.content}>
			<Outlet />
		</div>
	);
};

export default CarrierPage;
