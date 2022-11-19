import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
  Routes,
  Route,
} from "react-router-dom";
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

  useEffect(() => {
    debugger
    if (globalStore.token || token) {
      sessionStorage.setItem("ACCESS_TOKEN", globalStore.token || token);
      getPermissions()
        .then((res) => {
          const { data } = res;
          let temp = createRouteData(data);
          sessionStorage.setItem("PER", data);
          setRouter(temp);
          setRouterData(temp);
          setPermissions(data);
        })
        .finally(() => {
          navigate("/center/hello");
        });
    } else {
      navigate("/");
      setRouter(routeData);
      setRouterData(routeData);
    }
  }, [token, globalStore.token]);

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
