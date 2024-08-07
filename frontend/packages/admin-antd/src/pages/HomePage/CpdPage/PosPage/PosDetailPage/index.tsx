import { useSearchParams } from "react-router-dom";
import { useActive } from "src/common/hooks";
import { ROUTE_ID } from "src/router";
import { useFlat } from "src/service";
import DetailView from "../views/detailView";
import { PosEditViewProps } from "../views/editView";

const PosDetailPage = (props: PosEditViewProps) => {
    const branchName = ROUTE_ID.PosDetailPage;
    let [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const { getCurrentDetailAct, setCurrentDetail } = useFlat([
        "posStore",
        branchName,
    ]);
    useActive({
        onActive() {
            getCurrentDetailAct({
                id,
            });
        },
        onLeave() {
            setCurrentDetail(null);
        },
    });

    return <DetailView branchName={branchName} {...props} />;
};

export default PosDetailPage;
