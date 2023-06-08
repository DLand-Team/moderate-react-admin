import routerManager from "@/router/routerManager";
import { globalStore } from "@/stores/index";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Center from "./pages/center";
import Login from "./pages/login";
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

export default observer(() => {
  const { routesData, setRoutesData, setPermissions, token, isLoginChecking } = globalStore;
  const navigate = useNavigate();
  const location = useLocation();

  const toStart = (permissions: string[]) => {
    sessionStorage.setItem("PER", JSON.stringify(permissions));
    const routesDataTemp = routerManager.createRoutesConfigByPermissions(permissions);
    debugger
    setRoutesData(routesDataTemp);
    setPermissions(permissions);
  };

  // 上来判断一下是否存在token
  // isLoginChecking 是用来判断当前是否处于登陆状态检查中
  useEffect(() => {
    debugger
    let token = sessionStorage.getItem("ACCESS_TOKEN");
    if (token) {
      globalStore.setToken(token);
    }
    globalStore.setIsLoginChecking(false)
  }, [isLoginChecking])

  useEffect(() => {
    debugger
    if (isLoginChecking) return
    if (token) {
      let permissions: string[] = JSON.parse(sessionStorage.getItem("PERMISSIONS"));
      if (!permissions) {
        getPermissions()
          .then((res) => {
            const { data } = res;
            sessionStorage.setItem("PERMISSIONS", JSON.stringify(data));
            toStart(data);
          })
          .finally(() => {
            if ((location.pathname == "/")) {
              navigate("/center/hello");
            }
          });
      } else {
        toStart(permissions);
        // 如果当前是登陆页，那就直接跳转到中心页面
        if ((location.pathname == "/")) {
          navigate("/center/hello");
        }
      }
    } else {
      // 权限变了，那么就要重新创建路由，用默认的路由配置
      setRoutesData(routerManager.getRoutesDefalutData())
      navigate("/");
    }
  }, [token, isLoginChecking]);

  return (
    <>
      <Routes>
        {
          routesData.map((item) => {
            return toRenderRoute(item);
          })
        }
      </Routes>
    </>
  );
});
