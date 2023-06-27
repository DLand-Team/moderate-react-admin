import KeepAlive from "@/common/hocs/keepAlive";
import themeProviderHoc from "@/common/hocs/themeProviderHoc/index";
import useLocationListen from "@/common/hooks/useLocationListen";
import routerManager from "@/router/routerManager";
import { RouteItem } from "@/router/types";
import { useInject } from "@/stores/index";
import { UserOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, Modal } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { observer } from "mobx-react";
import { createElement, useEffect, useState } from "react";
import { useLocation, useNavigate, type Location } from "react-router-dom";
import Breadcrumb from "./components/breadcrumb";
import Tabs from "./components/tabs";
import styles from "./index.module.scss";
import { updatePermissions } from "./service";

const { Header, Content, Sider } = Layout;
type MenuItem = ItemType &
  Partial<{
    key: string;
    children: MenuItem[];
  }>;

// 递归生成菜单数据
const generateMenuDataLoop = (data: RouteItem[], result: MenuItem[]) => {
  data.forEach((item) => {
    const temp: MenuItem = {
      key: item.id,
      icon: createElement(UserOutlined),
      label: item.meta.title,
    };
    result.push(temp);
    if (item?.children?.length) {
      temp.children = generateMenuDataLoop(item.children, []);
    }
  });
  return result;
};

const center = observer(() => {
  const [permissionsStore] = useInject("permissions");
  const {
    state: { routesData },
    actions: { addTabHistory, init },
  } = permissionsStore;
  const navigate = useNavigate();
  const [defaultOpenKeys, setDefaultOpenKeys] = useState([]);
  const [defaultSelectedKeys, setDefaultSelectedKeys] = useState([]);
  const [menuData, setMenuData] = useState<ItemType[]>([]);
  useLocationListen((location: Location) => {
    const { pathname } = location;
    const temp = pathname.split("/").filter((item) => {
      return item;
    });
    setDefaultSelectedKeys([temp.slice(-1)[0]]);
    const temp2 = temp.slice(1, temp.length - 1);
    if (temp2.length) {
      setDefaultOpenKeys(temp2);
    }
    addTabHistory(location);
  });

  // 路由监听
  const location = useLocation();
  useEffect(() => {}, [location]);
  useEffect(() => {
    if (routesData.length) {
      const memuDataTemp = generateMenuDataLoop(routesData[1].children, []);
      setMenuData(memuDataTemp);
    }
  }, [routesData]);
  return (
    <Layout className={styles.content}>
      <Header className="header">
        <div className={styles.logo}>Moderate admin React</div>
        <Button
          type="primary"
          onClick={() => {
            Modal.confirm({
              title: "确定么？",
              content: "更新权限之后，需要重新登陆",
              onOk: () => {
                {
                  updatePermissions([
                    "hello",
                    "center",
                    "sys",
                    "role",
                    "index:Add",
                    "index:EDIT",
                    "index:DELETE",
                    "index:IMPORT",
                    "index:EXPORT",
                    "user:Add",
                    "user:EDIT",
                    "user:DELETE",
                    "user:IMPORT",
                    "role:Add",
                    "role:EDIT",
                    "role:DELETE",
                    "role:IMPORT",
                    "role:EXPORT",
                    "user",
                    "role:ADD",
                    "user:EXPORT",
                  ]).then(() => {
                    sessionStorage.clear();
                    init();
                    navigate("/");
                  });
                }
              },
            });
          }}
          className={styles.resetBtn}
        >
          重置权限
        </Button>
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
                const path = routerManager.getRoutePathByKey(key);
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
              height: "100%",
              overflow: "auto",
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
