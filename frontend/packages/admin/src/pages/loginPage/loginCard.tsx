import { Card, Typography, Collapse } from "antd";
import type { ReactNode } from "react";
import styles from "./loginPage.module.scss";
const { Panel } = Collapse;
import pic from "src/assets/imgs/pic.png";

const App = (props: { children: ReactNode }) => (
  <div className={styles.loginBox}>
    <div className={styles.loginTitle}>用户中心</div>
    <div className={styles.loginCon}>
      <img src={pic}></img>
      <Card hoverable className={styles.loginCard}>
        <Typography></Typography>
        {props.children}
        <Collapse defaultActiveKey={["1"]}>
          <Panel header={"安全声明"} key="1">
            <span>
              {
                "由于近期撞库攻击日益猖獗，敬请各位用户在本系统中不要使用与其他网站相同或相近的用户名口令，如因您的故意或疏忽过失，导致您在本系统的用户名口令泄露，对业务造成的影响由您自行承担，对本系统带来的安全危害，系统所有权人中国民航信息网络股份有限公司将保留进一步追究法律责任的权利。"
              }
            </span>
          </Panel>
        </Collapse>
      </Card>
    </div>
  </div>
);

export default App;
