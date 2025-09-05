import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Layout from "@theme/Layout";
import styles from "./index.module.scss";

function HomepageHeader() {
	return (
		<header className={styles.heroBanner}>
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
							一个可以被插件分解的管理后台
						</p>
						<p className={styles.title3}>
							React搬砖利器，对接若依，快速上手
						</p>
						<div className={styles.btnPart}>
							<Link className={styles.btn} to="/docs/intro">
								Get Started
							</Link>
							<Link
								className={`${styles.btn} ${styles.btn2}`}
								to="https://github.com/DLand-Team/redux-eazy"
							>
								View on GitHub
							</Link>
						</div>
					</div>
					<div className={styles.logoPart}>
						<div className={styles.image}>
							<div className={styles.imageContainer}>
								<div className={styles.imageBg}></div>
							</div>
							<img
								style={{
									position: "absolute",
								}}
								className={styles.imgLogo}
								src={
									require("@site/static/img/logo.png").default
								}
							/>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

export default function Home(): JSX.Element {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout
			title={`Hello from ${siteConfig.title}`}
			description="Description will go into a meta tag in <head />"
		>
			<HomepageHeader />
			<main>
				<HomepageFeatures />
			</main>
		</Layout>
	);
}
