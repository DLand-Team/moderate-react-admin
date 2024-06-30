import styles from "./style.module.scss";
import { Outlet } from "react-router-dom";

const RulePage = () => {
	return (
		<div className={styles.content}>
			<Outlet />
		</div>
	);
};

export default RulePage;
