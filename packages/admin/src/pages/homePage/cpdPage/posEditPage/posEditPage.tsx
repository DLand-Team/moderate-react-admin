import { theme } from "antd";
import styles from "./style.module.scss";

const PosEditPage = () => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();
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
				123
			</div>
			<div
				style={{
					padding: 24,
					textAlign: "center",
					background: colorBgContainer,
					borderRadius: borderRadiusLG,
				}}
			>
				123
			</div>
		</div>
	);
};

export default PosEditPage;
