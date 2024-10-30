import { useActive } from "src/common/hooks";
import { useFlat } from "src/service";
import PosListView from "../views/listView";

const PosListPage = () => {
    const { queryPostListAct } = useFlat("posStore");
    useActive({
        onActive() {
            queryPostListAct();
        },
    });

    return <PosListView />;
};

export default PosListPage;
