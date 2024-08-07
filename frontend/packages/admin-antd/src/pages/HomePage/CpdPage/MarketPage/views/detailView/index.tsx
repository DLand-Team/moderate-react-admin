import { Button, Card } from "antd";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import InfoCard from "src/components/infoCard";
import { ROUTE_ID } from "src/router";
import { appHelper, routerHelper } from "src/service";
import MarketItemsTable from "../../components/marketItemTable";
import styles from "./index.module.scss";
import useDetailConfig from "./useDetailConfig";

export interface DetailViewProps {
    branchName: string;
}

const DetailView = ({ branchName }: DetailViewProps) => {
    const { t: commonT } = useTranslation(["common"]);
    const items = useDetailConfig(branchName);
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    return (
        <div className={styles.container}>
            <div className={styles.btnTable}>
                <Button
                    onClick={async () => {
                        routerHelper.jumpTo(ROUTE_ID.MarketEditPage, {
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
                <Card
                    style={{
                        marginBottom: "12px",
                    }}
                >
                    <InfoCard items={items}></InfoCard>
                </Card>
                <Card
                    style={{
                        marginBottom: "30px",
                    }}
                >
                    <MarketItemsTable
                        branchName={branchName}
                    ></MarketItemsTable>
                </Card>
            </>
        </div>
    );
};

export default DetailView;
