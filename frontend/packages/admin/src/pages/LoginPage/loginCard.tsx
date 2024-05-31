import { Card, Typography } from "antd";
import type { ReactNode } from "react";
import pic from "src/assets/imgs/pic.png";
import styles from "./loginPage.module.scss";

const App = (props: { children: ReactNode }) => (
	<div className={styles.loginBox}>
		<div className={styles.loginTitle}>Moderate Admin</div>
		<div className={styles.loginCon}>
			<img src={pic}></img>
			<Card hoverable className={styles.loginCard}>
				<Typography
					style={{
						textAlign: "center",
						fontSize: "20px",
						fontWeight: "bold",
						marginBottom: "20px",
					}}
				>
					Moderate Admin
				</Typography>
				{props.children}
			</Card>
		</div>
	</div>
);

export default App;
