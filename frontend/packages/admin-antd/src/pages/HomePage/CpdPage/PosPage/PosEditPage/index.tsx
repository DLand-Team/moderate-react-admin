import { useSearchParams } from "react-router-dom";
import { useActive } from "src/common/hooks";
import { ROUTE_ID } from "src/router";
import { useFlat } from "src/service";
import PosEditView, { PosEditViewProps } from "../views/editView";

const PosEditPage = (props: PosEditViewProps) => {
    const branchName = ROUTE_ID.PosEditPage;
    const [searchParams] = useSearchParams();
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

    return <PosEditView branchName={branchName} {...props} />;
};

export default PosEditPage;
