// import { useCurrentRoute } from "src/common/hooks";
// import NavBack from "../navBack";

const MainContainer = ({ children }: React.PropsWithChildren) => {
    // const currentRouteData = useCurrentRoute();
    // const { depends, index, isTab = true } = currentRouteData;
    // const isShowNavBack = !isTab && depends?.length! > 0 && !index;
    return (
        <div
            style={{
                flex: 1,
                overflow: "auto",
                height: "100%",
            }}
        >
            {/* {isShowNavBack && <NavBack />} */}
            {children}
        </div>
    );
};

export default MainContainer;
