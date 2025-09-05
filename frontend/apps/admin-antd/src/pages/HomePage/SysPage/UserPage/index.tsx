import { Button, Card } from "antd";
import ModalForm from "./components/modalForm";
import RoleModalForm from "./components/roleModalForm";
import UserTable from "./components/userTable";
import UserTree from "./components/userTree";
import { dpChain } from "src/service";
import { ModalType } from "src/service/stores/sysStore/model";

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
					<Card
						style={{
							marginBottom: "25px",
						}}
					>
						<Button
							onClick={() => {
								dpChain("sysStore").setUserModalType(
									ModalType.ADD,
								);
							}}
						>
							新增用户
						</Button>
					</Card>
					<UserTable />
				</div>
			</div>
			<ModalForm />
			<RoleModalForm />
		</div>
	);
};
export default UserPage;
