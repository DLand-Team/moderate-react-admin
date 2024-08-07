import { useActive } from "src/common/hooks";
import { useFlat } from "src/service";
import EditView, { EditViewProps } from "../views/editView";
import { ROUTE_ID } from "src/router";

const MarketAddPage = (props: EditViewProps) => {
    const branchName = ROUTE_ID.MarketAddPage;
    const { initCurrentDetailAct, setCurrentMarketData, getLocationListAct } =
        useFlat(["marketStore", branchName]);

    useActive({
        onFirstActive() {
            initCurrentDetailAct();
            getLocationListAct();
        },
        onLastLeave() {
            setCurrentMarketData(null);
        },
    });

    return <EditView branchName={branchName} {...props} />;
};
export default MarketAddPage;
