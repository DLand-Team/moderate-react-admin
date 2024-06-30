import { useFlat } from "src/service";
import DetailStateCom from "./detailStateCom";
import EditableStateCom from "./editableStateCom";
import "./index.scss";
export default (props: any) => {
    const { isDetail } = useFlat("ruleStore", {
        isDetail: "IN",
    });
    return isDetail ? (
        <DetailStateCom {...props} />
    ) : (
        <EditableStateCom {...props} />
    );
};
