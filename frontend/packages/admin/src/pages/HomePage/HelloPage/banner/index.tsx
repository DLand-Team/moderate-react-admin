import { Typography } from "antd";
import { useIsMobile } from "src/common/hooks";
import styles from "./index.module.scss";
const { Link } = Typography;
export function Banner() {
	const isMobile = useIsMobile();
	// const {
	// 	token: { colorTextBase },
	// } = theme.useToken();
	return (
		<div
			className={styles.bannerContent}
			style={{
				height: isMobile ? "auto" : "100%",
				borderRadius: isMobile ? "0px" : "32px",
				paddingTop: isMobile ? "32px" : "0px",
			}}
		>
			{!isMobile && (
				<iframe
					style={{
						border: "none",
						height: "100%",
						width: "150%",
						position: "absolute",
						pointerEvents: "none",
						top: 0,
					}}
					src="https://my.spline.design/dunes-7ca97654d1f72bd2c09471e9e424c50b/"
				></iframe>
			)}
			<div className={styles.header}>
				<div className={styles.infoPart}>
					<div className={styles.title}>中用</div>
					<div
						className={
							isMobile ? styles.title2Mobile : styles.title2
						}
					>
						一个能被插件分解的轻量管理后台
					</div>
					<div className={styles.title3}>
						Dland生态 + React & Redux & Vite & Antd & Ts
					</div>
					<div className={styles.btnPart}>
						<Link
							href="https://dland-core.github.io/mui-eazy/"
							className={styles.btn}
							style={{
								marginRight: "32px",
							}}
						>
							Get Started
						</Link>
						<Link
							href="https://github.com/DLand-Team/moderate-react-admin"
							className={`${styles.btn} ${styles.btn2}`}
						>
							View on GitHub
						</Link>
					</div>
				</div>
				<div className={styles.logoPart}>
					<div className={styles.image}>
						<div className={styles.imageContainer}>
							<div className={styles.imageBg}></div>
							<img
								className={styles.logoImg}
								style={{
									width: isMobile ? "220px" : "320px",
								}}
								src="/logoBig.png"
							></img>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
