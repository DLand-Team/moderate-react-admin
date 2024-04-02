import LoginCard from "./loginCard";
import LoginForm from "./loginForm";
import styles from "./loginPage.module.scss";

const LoginPage = () => {
  return (
    <div className={styles.content}>
      <div className={styles.loginPanel}>
        <LoginCard>
          <LoginForm />
        </LoginCard>
      </div>
    </div>
  );
};

export default LoginPage;
