import { Outlet } from "react-router-dom";
import styles from "./style.module.scss";

const SortPage = () => {
	return (
		<div className={styles.content}>
			<Outlet />
		</div>
	);
};

export default SortPage;
