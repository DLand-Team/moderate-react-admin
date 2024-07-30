import { useActive } from "src/common/hooks";
import { useFlat } from "src/service";
import EditView, { EditViewProps } from "../views/editView";

const MarketAddPage = (props: EditViewProps) => {
    const { initCurrentDetailAct, setCurrentMarketData, getLocationListAct } =
        useFlat("marketStore");

    useActive({
        onFirstActive() {
            initCurrentDetailAct();
            getLocationListAct();
        },
        onLastLeave() {
            setCurrentMarketData(null);
        },
    });

    return <EditView {...props} />;
};
export default MarketAddPage;
