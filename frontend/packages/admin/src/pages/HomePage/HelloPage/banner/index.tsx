import { Typography } from "antd";
import styles from "./index.module.scss";
const { Link } = Typography;
function HomepageHeader() {
	return (
		<div className={styles.heroBanner}>
			<div
				className="container"
				style={{
					display: "flex",
					justifyContent: "center",
				}}
			>
				<div className={styles.header}>
					<div className={styles.infoPart}>
						<p className={styles.title}>中用</p>
						<p className={styles.title2}>
							一个能被插件分解的轻量管理后台
						</p>
						<p className={styles.title3}>
							Dland生态 + React & Redux & Vite & Antd & Ts
						</p>
						<div className={styles.btnPart}>
							<Link
								href="https://dland-core.github.io/mui-eazy/"
								className={styles.btn}
								style={{
									color: "white",
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
									style={{
										position: "absolute",
										width: "100%",
									}}
									src="/logoBig.png"
								></img>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function Home(): JSX.Element {
	return <HomepageHeader />;
}
