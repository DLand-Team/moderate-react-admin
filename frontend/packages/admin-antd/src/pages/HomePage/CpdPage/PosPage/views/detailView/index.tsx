import { Button, Card } from "antd";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import InfoCard from "src/components/infoCard";
import { ROUTE_ID } from "src/router";
import { appHelper, routerHelper } from "src/service";
import PosItemsTable from "../../components/posItemsTable";
import styles from "./style.module.scss";
import useDetailConfig from "./useDetailConfig";

/* type */
export interface PosDetailViewProps {
    isSub?: boolean;
    branchName?: string;
}

/* Main */
const DetailView = ({ branchName = "" }: PosDetailViewProps) => {
    const { t: commonT } = useTranslation("common");
    const detailConfig = useDetailConfig(branchName);
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    return (
        <div className={styles.container}>
            <div className={styles.btnTable}>
                <Button
                    onClick={async () => {
                        routerHelper.jumpTo(ROUTE_ID.PosEditPage, {
                            search: {
                                id,
                            },
                        });
                    }}
                    style={{ marginRight: 10 }}
                    type="primary"
                >
                    {commonT`edit`}
                </Button>
                <Button
                    onClick={() => {
                        appHelper.closeTabByPath();
                    }}
                >
                    {commonT`cancel`}
                </Button>
            </div>
            <>
                <Card className={styles.infoCard}>
                    <InfoCard items={detailConfig}></InfoCard>
                </Card>
                <Card className={styles.posItemsTableCard}>
                    <PosItemsTable branchName={branchName}/>
                </Card>
            </>
        </div>
    );
};

export default DetailView;
