import { useSearchParams } from "react-router-dom";
import { useActive } from "src/common/hooks";
import { ROUTE_ID } from "src/router";
import { dpChain } from "src/service";
import EditView from "../views/editView";

const RuleEditPage = () => {
    const branchName = ROUTE_ID.RuleEdit;
    let [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    useActive(
        {
            async onFirstActive() {
                dpChain("ruleStore").initRuleAct(null);
                dpChain(["ruleStore", branchName])
                    .getCurrentDetailAct({
                        id,
                    })
                    .catch(() => {});
            },
        },
        [id]
    );
    return <EditView branchName={branchName} />;
};

export default RuleEditPage;
