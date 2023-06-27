import routerManager from "@/router/routerManager";
import { useInject } from "@/stores/index";
import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { RouteItem } from "./router/types";
import { getPermissions } from "./service";
// 递归创建路由组件 配合动态权限
const toRenderRoute = (item: RouteItem) => {
  const { children } = item;
  let routeChildren = [];
  if (children) {
    routeChildren = children.map((item) => {
      return toRenderRoute(item);
    });
  }
  return (
    <Route
      children={routeChildren}
      key={item.path}
      path={item.path}
      element={item.element}
    ></Route>
  );
};

export default () => {
  // natur
  const [countStore] = useInject("permissions");
  const {
    state: { routesData, token },
    actions: { setPermissions, setRoutesData },
  } = countStore;

  const navigate = useNavigate();
  const location = useLocation();

  const toStart = (permissions: string[]) => {
    sessionStorage.setItem("PER", JSON.stringify(permissions));
    // 根据后台返回的权限，创建路由
    const routesDataTemp =
      routerManager.createRoutesConfigByPermissions(permissions);
    // natur 替换mobx
    setRoutesData(routesDataTemp);
    setPermissions(permissions);
  };

  useEffect(() => {
    if (token) {
      let permissions: string[] = JSON.parse(
        sessionStorage.getItem("PERMISSIONS")
      );
      if (!permissions) {
        getPermissions()
          .then((res) => {
            const { data } = res;
            sessionStorage.setItem("PERMISSIONS", JSON.stringify(data));
            toStart(data);
          })
          .finally(() => {
            if (location.pathname == "/") {
              navigate("/center/hello");
            }
          });
      } else {
        toStart(permissions);
        // 如果当前是登陆页，那就直接跳转到中心页面
        if (location.pathname == "/") {
          navigate("/center/hello");
        }
      }
    } else {
      // 权限变了，那么就要重新创建路由，用默认的路由配置
      setRoutesData(routerManager.getRoutesDefalutData());
      navigate("/");
    }
  }, [token]);

  return (
    <>
      <Routes>
        {routesData?.map((item) => {
          return toRenderRoute(item);
        })}
      </Routes>
    </>
  );
};