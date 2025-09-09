import styles from "./style.module.scss";

import { Outlet } from "react-router-dom";

const PluginsPage = () => {
  return (
    <div className={styles.content}>
      <Outlet />
    </div>
  );
};

export default PluginsPage;
