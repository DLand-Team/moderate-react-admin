import ModalForm from "./components/modalForm";
import UserTable from "./components/userTable";
import UserTree from "./components/userTree";

const UserPage = () => {
	return (
		<div
			style={{
				width: "100%",
			}}
		>
			<div
				style={{
					width: "100%",
					display: "flex",
					gap: "25px",
				}}
			>
				<div
					style={{
						flex: 1,
					}}
				>
					<UserTree></UserTree>
				</div>
				<div
					style={{
						flex: 3,
						overflow: "hidden",
					}}
				>
					<UserTable />
				</div>
			</div>
			<ModalForm />
		</div>
	);
};
export default UserPage;
