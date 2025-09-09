import { Layout, Menu } from "antd";
import { useMemo } from "react";
import { type Location } from "react-router-dom";
import { useLocationListen } from "src/common/hooks";
import { removeDuplicatesInArray } from "src/common/utils";
import { ROUTE_ID_KEY } from "src/router";
import { appHelper, routerHelper, useFlat } from "src/service";

const { Sider } = Layout;

const SliderMenu = ({ isMobile }: { isMobile?: boolean }) => {
  const {
    menuData,
    menuDefaultOpenKeys,
    menuDefaultSelectedKeys,
    setMenuDefaultOpenKeys,
    setMenuDefaultSelectedKeys,
    isCollapsedMenu,
    language,
  } = useFlat("appStore");
  const { menuTreeData } = useFlat("authStore");
  const MenuItems = useMemo(() => {
    return appHelper.transMenuForAntdLoop(menuData);
  }, [menuData, language]);

  useLocationListen(
    (location: Location) => {
      const { pathname } = location;
      const { selectedKeys, openKeys } = appHelper.getMenuConfigByPathNameEx(
        pathname,
        menuTreeData || [],
      );
      setMenuDefaultSelectedKeys(selectedKeys);
      setMenuDefaultOpenKeys(removeDuplicatesInArray(openKeys));
    },
    [menuData, menuTreeData],
  );
  const menuNode = (
    <div
      style={{
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {menuData.length > 0 &&
        menuDefaultOpenKeys &&
        menuDefaultSelectedKeys && (
          <Menu
            triggerSubMenuAction="click"
            mode="inline"
            selectedKeys={menuDefaultSelectedKeys}
            openKeys={isCollapsedMenu ? undefined : menuDefaultOpenKeys!}
            onOpenChange={(e) => {
              setMenuDefaultOpenKeys(e);
            }}
            style={{
              height: "100%",
              borderRight: 0,
              overflow: "auto",
            }}
            items={MenuItems as any}
            onClick={({ key }) => {
              routerHelper.jumpToIndexChild(key as ROUTE_ID_KEY);
            }}
          />
        )}
    </div>
  );
  if (isMobile) {
    return menuNode;
  }
  return (
    <Sider
      theme={"light"}
      trigger={null}
      collapsible
      collapsed={isCollapsedMenu}
      width={260}
    >
      {menuNode}
    </Sider>
  );
};

export default SliderMenu;
