import { useSearchParams } from "react-router-dom";
import { useActive } from "src/common/hooks";
import { ROUTE_ID } from "src/router";
import { useFlat } from "src/service";
import DetailView from "../views/detailView";

const MarketDetailPage = () => {
    const branchName = ROUTE_ID.MarketDetailPage;
    let [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const { getCurrentDetailAct, setCurrentMarketData, getLocationListAct } =
        useFlat(["marketStore", branchName]);
    useActive({
        onActive() {
            getCurrentDetailAct({
                id,
            });
            getLocationListAct();
        },
        onLeave() {
            setCurrentMarketData(null);
        },
    });
    return <DetailView branchName={branchName} />;
};
export default MarketDetailPage;
