import useLocationListen from "@/common/hooks/useLocationListen";
import routerManager from "@/router/routerManager";
import { useInject } from "@/stores/index";
import { Tabs } from "antd";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";


export default observer(() => {
  const [activeKey, setActiveKey] = useState("");
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [permissionsStore] = useInject("permissions");
  const {
    state: { tabsHistory },
    actions: { deleteTabHistory },
  } = permissionsStore;
  useEffect(() => {
    const tabsHistoryArr = Object.values(tabsHistory);
    setItems(
      tabsHistoryArr.map((item:any) => {
        const { pathname } = item;
        const id = pathname.split("/").slice(-1)[0];
        return { label: routerManager.getRouteTitleByKey(id), key: pathname };
      })
    );
  }, [tabsHistory]);
  useLocationListen((location) => {
    setActiveKey(location.pathname);
  });
  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
    navigate(newActiveKey);
  };

  return (
    <Tabs
      className={styles.content}
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      items={items}
      hideAdd={true}
      onEdit={(e, action) => {
        if (action == "remove") {
          deleteTabHistory(e as string);
        }
      }}
    />
  );
});
