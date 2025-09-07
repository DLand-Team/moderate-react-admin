import { Typography, theme } from "antd";
import type { ReactNode } from "react";
import styles from "./loginPage.module.scss";
import { useIsMobile } from "src/common/hooks";
import { useFlat } from "src/service";

const LoginCard = (props: { children: ReactNode }) => {
	const isMobile = useIsMobile();
	const { settingData } = useFlat("appStore");
	const { projectName } = settingData;
	const {
		token: { colorBgBase, colorTextBase },
	} = theme.useToken();
	return (
		<div
			className={styles.loginCard}
			style={{
				padding: isMobile ? "0px 36px" : "0px 80px",
				width: isMobile ? "100%" : "360px",
				background: colorBgBase,
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					paddingBottom: "80px",
					paddingTop: "50px",
					position: "relative",
					left: "-20px",
					width: "100%",
					whiteSpace: "nowrap",
				}}
			>
				<img width={"55px"} src="/logo.png" />
				<Typography
					style={{
						fontSize: "38px",
						fontWeight: "bold",
						color: "#3a6bc4",
						paddingLeft: "12px",
					}}
				>
					{projectName}
				</Typography>
			</div>
			<div>
				<div
					style={{
						paddingBottom: "80px",
					}}
				>
					<Typography
						style={{
							fontSize: "32px",
							fontWeight: "bold",
							color: colorTextBase,
							paddingBottom: "20px",
						}}
					>
						Login
					</Typography>
					<Typography>
						Don’t have an account?{" "}
						<Typography.Link>Get Started</Typography.Link>
					</Typography>
				</div>

				{props.children}
			</div>
		</div>
	);
};

export default LoginCard;
