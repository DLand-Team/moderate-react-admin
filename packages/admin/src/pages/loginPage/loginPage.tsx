import AnimateText from "@/common/components/animateText/animateText";
import styles from "./loginPage.module.scss";
import LoginCard from "./loginCard";
import LoginForm from "./loginForm";

const LoginPage = () => {
	return (
		<div className={styles.content}>
			<div className={styles.moderate}>
				<AnimateText
					texts={[
						"Moderate Admin",
						"基于React18+AntdDesign5+Natur+webpack+Ts开发",
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
