import AnimateText from "@/common/components/animateText/animateText";
import styles from "./loginPage.module.scss";
import LoginCard from "./loginCard";
import LoginForm from "./loginForm";
import Svg from "./ic-eva_cloud-upload-fill.svg";

const LoginPage = () => {
	return (
		<div className={styles.content}>
			{/* <img src={"src" in (Svg as any) ? Svg["src"] : Svg} /> */}
			<div className={styles.moderate}>
				<AnimateText
					texts={[
						"Moderate React Admin",
						"基于React18+AntdDesign5+Mobx+Vite+Ts开发",
					]}
				></AnimateText>
			</div>
			<div className={styles.loginPanel}>
				<LoginCard>
					<LoginForm />
				</LoginCard>
			</div>
		</div>
	);
};

export default LoginPage;
