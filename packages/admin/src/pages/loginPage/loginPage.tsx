import AnimateText from "src/common/components/animateText/animateText";
import LoginCard from "./loginCard";
import LoginForm from "./loginForm";
import styles from "./loginPage.module.scss";

const LoginPage = () => {
	return (
		<div className={styles.content}>
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
