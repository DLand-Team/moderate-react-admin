import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { globalStore } from "@/stores/index";
import { createRouteData, routeData } from "@/router/index";
import { observer } from "mobx-react";
import { getPermissions } from "./service";
import Login from "./pages/login";
import Center from "./pages/center";

export default observer(() => {
  const { setRouterData, setPermissions } = globalStore;
  const [routerData, setRouter] = useState<any>();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("ACCESS_TOKEN");
  const location = useLocation();
  let tokenFlag = token || globalStore.token;
  useEffect(() => {
    if (globalStore.token || token) {
      sessionStorage.setItem("ACCESS_TOKEN", globalStore.token || token);
      const toStart = (data) => {
        let temp = createRouteData(data);
        sessionStorage.setItem("PER", data);
        setRouter(temp);
        debugger;
        setRouterData(temp);
        setPermissions(data);
      };
      let per = JSON.parse(sessionStorage.getItem("PERMISSIONS"));
      if (!per) {
        getPermissions()
          .then((res) => {
            const { data } = res;
            sessionStorage.setItem("PERMISSIONS", JSON.stringify(data));
            toStart(data);
          })
          .finally(() => {
            navigate("/center/hello");
          });
      } else {
        toStart(per);
        // 如果当前是登陆页，那就直接跳转到中心页面
        if ((location.pathname = "/")) {
          navigate("/center/hello");
        }
      }
    } else {
      navigate("/");
      setRouter(routeData);
      setRouterData(routeData);
    }
  }, [tokenFlag]);

  const toRenderRoute = (item) => {
    const { children } = item;
    let arr = [];
    if (children) {
      arr = children.map((item) => {
        return toRenderRoute(item);
      });
    }
    return (
      <Route
        children={arr}
        key={item.path}
        path={item.path}
        element={item.element}
      ></Route>
    );
  };

  return (
    <>
      {routerData && (
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
          <Route
            path="/center"
            element={<Center></Center>}
            children={routerData?.[1]?.children?.map((item) => {
              return toRenderRoute(item);
            })}
          ></Route>
        </Routes>
      )}
    </>
  );
});
