import { Button, Segmented } from "antd";
import { dpChain, useFlat } from "src/service";
import { FilterType } from "src/service/stores/sysStore/model";
import MenuTable from "./components/menuTable";
import styles from "./style.module.scss";
import ModalForm from "./components/modalForm";

const MenuPage = () => {
	const { filterType } = useFlat("sysStore");
	return (
		<div className={styles.content}>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					marginBottom: "35px",
				}}
			>
				<Segmented<string>
					options={[FilterType.ALL, FilterType.ACTIVED]}
					onChange={(value) => {
						dpChain("sysStore").setFilterType(value as FilterType);
					}}
					value={filterType}
				/>
				<Button
					type="primary"
					onClick={() => {
						dpChain("authStore").setModalType("add");
					}}
				>
					Add
				</Button>
			</div>
			<ModalForm />
			<MenuTable />
		</div>
	);
};

export default MenuPage;
