import { createElement } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import styles from "./index.module.scss";
import { globalStore } from "@/stores/index";
import {
  Outlet,
  useNavigate,
  useLocation,
  type Location,
} from "react-router-dom";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useState } from "react";
import themeProviderHoc from "@/common/hocs/themeProviderHoc/index";
import Tabs from "./components/tabs";
import Breadcrumb from "./components/breadcrumb";
import useLocationListen from "@/common/hooks/useLocationListen";
import KeepAlive from "@/common/hocs/keepAlive";
import routerConfig from "@/router/config";

const { Header, Content, Sider } = Layout;

const processRoute = (data, result: any) => {
  data.forEach((item) => {
    let temp: any = {
      key: item.routeId,
      icon: createElement(UserOutlined),
      label: item.meta.title,
    };
    result.push(temp);
    if (item?.children?.length) {
      temp.children = [];
      processRoute(item.children, temp.children);
    }
  });
};

const center = observer(() => {
  const navigate = useNavigate();
  const [defaultOpenKeys, setDefaultOpenKeys] = useState([]);
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState([]);
  const [menuData, setMenuData] = useState([]);
  useLocationListen((location: Location) => {
    const { pathname } = location;
    let temp = pathname.split("/").filter((item) => {
      return item;
    });
    setDefaultSelectedKeys([temp.at(-1)]);
    let temp2 = temp.slice(1, temp.length - 1);
    if (temp2.length) {
      setDefaultOpenKeys(temp2);
    }
    globalStore.addTabHistory(location);
  });
  const { routerData = [] } = globalStore;
  // 路由监听
  let location = useLocation();
  useEffect(() => {}, [location]);
  useEffect(() => {
    if (routerData.length) {
      let result = [];
      processRoute(routerData[1].children, result);
      setMenuData(result);
    }
  }, [routerData]);
  return (
    <Layout className={styles.content}>
      <Header className="header">
        <div className={styles.logo}>Moderate admin React</div>
      </Header>
      <Layout>
        <Sider width={260} className="site-layout-background">
          {menuData.length > 0 && (
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={defaultSelectedKeys}
              defaultOpenKeys={defaultOpenKeys}
              style={{ height: "100%", borderRight: 0 }}
              items={menuData}
              onClick={({ key }) => {
                const path = routerConfig[key]?.path;
                if (path) {
                  navigate(path);
                }
              }}
            />
          )}
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb />
          <Content
            className="site-layout-background"
            style={{
              margin: 0,
              minHeight: 280,
            }}
          >
            <Tabs></Tabs>
            <div
              style={{
                padding: 32,
                background: "white",
              }}
            >
              <KeepAlive
                include={["/center/sys/user", "/center/sys/role"]}
                keys={[]}
              ></KeepAlive>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
});

export default themeProviderHoc(center, {
  components: {
    Menu: {
      colorPrimary: "blue",
    },
  },
});
