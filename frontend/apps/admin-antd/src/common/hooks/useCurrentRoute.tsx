import { useLocation } from "react-router-dom";
import { routerHelper } from "src/service";

const useCurrentRoute = () => {
    const { pathname } = useLocation();
    const routeData = routerHelper.getRoutItemConfigByPath(pathname);
    return routeData;
};

export default useCurrentRoute;
