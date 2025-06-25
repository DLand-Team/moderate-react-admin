import MenuTable from "./components/menuTable";
import styles from "./style.module.scss";

const MenuPage = () => {
	return (
		<div className={styles.content}>
			<MenuTable />
		</div>
	);
};

export default MenuPage;
