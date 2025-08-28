import DataModalForm from "./components/data-modal-form";
import MenuModalForm from "./components/menu-modal-form";
import ModalForm from "./components/modalForm";
import RoleTable from "./components/roleTable";

const UserPage = () => {
	return (
		<div
			style={{
				width: "100%",
			}}
		>
			<RoleTable />
			<ModalForm />
			<MenuModalForm />
			<DataModalForm />
		</div>
	);
};
export default UserPage;
