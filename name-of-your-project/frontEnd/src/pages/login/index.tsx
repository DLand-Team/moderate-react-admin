import "react";
import AnimateText from "@/common/components/animateText";
import styles from "./index.module.scss";
import LoginCard from "./loginCard";
import LoginForm from "./loginForm";

export default (props) => {
  return (
    <div className={styles.content}>
      <div className={styles.moderate}>
        <AnimateText
          texts={[
            " Moderate admin react",
            "基于React18+AntdDesign5+Mobx+Vite+Ts开发",
          ]}
        ></AnimateText>
      </div>
      <div className={styles.loginPanel}>
        {/* @ts-ignore */}
        <LoginCard>
          <LoginForm />
        </LoginCard>
      </div>
    </div>
  );
};
