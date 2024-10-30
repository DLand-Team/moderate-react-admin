import { useActive } from "src/common/hooks";
import { useFlat } from "src/service";
import ListView from "../views/listView";

const Page = () => {
    const { queryMarkettListAct } = useFlat("marketStore");
    useActive({
        onActive() {
            queryMarkettListAct();
        },
    });

    return <ListView />;
};

export default Page;
