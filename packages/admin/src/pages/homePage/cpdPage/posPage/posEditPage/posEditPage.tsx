import { Button, theme } from "antd";
import styles from "./style.module.scss";
import { RouterHelper, useFlat } from "src/reduxService";
import { ROUTE_ID } from "src/config/routerConfig";

const PosEditPage = () => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
	const { deleteTabHistoryAct } = useFlat("appStore");
	return (
		<div className={styles.container}>
			<div
				style={{
					padding: 24,
					textAlign: "center",
					background: colorBgContainer,
					borderRadius: borderRadiusLG,
					marginBottom: "100px",
				}}
			>
				编辑页面区域
			</div>
			<div
				style={{
					padding: 24,
					textAlign: "center",
					background: colorBgContainer,
					borderRadius: borderRadiusLG,
				}}
			>
				<Button
					onClick={() => {
						deleteTabHistoryAct({
							pathName: location.pathname,
						});
						RouterHelper.jumpTo(ROUTE_ID.posPage);
					}}
				>
					提交
				</Button>
			</div>
		</div>
	);
};

export default PosEditPage;
