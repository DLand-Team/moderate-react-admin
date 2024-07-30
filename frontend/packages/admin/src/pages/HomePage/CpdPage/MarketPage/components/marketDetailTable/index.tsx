import { Switch, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { useFlat } from "src/service";

const MarketItemsTable = ({ branchName }: { branchName?: string }) => {
    const { currentData } = useFlat(["marketStore", branchName], {
        currentData: "IN",
    });
    const { t } = useTranslation(["market"]);
    const columns: ColumnsType = [
        {
            title: t("marketPage.locationType"),
            dataIndex: "locationType",
            key: "locationType",
            align: "center",
            render(value) {
                return (
                    {
                        P: t`marketPage.AIRPORT`,
                        C: t`marketPage.CITY`,
                        S: t`marketPage.STATE`,
                        N: t`marketPage.COUNTRY`,
                        Z: t`marketPage.ATPCO`,
                        A: t`marketPage.TC`,
                        W: t`marketPage.WORLD`,
                    } as any
                )[value];
            },
        },
        {
            title: t("marketPage.location"),
            dataIndex: "locationInfo",
            key: "locationInfo",
            align: "center",
        },
        {
            title: t("marketPage.EXCLUDE"),
            dataIndex: "exclude",
            key: "exclude",
            align: "center",
            render(e) {
                return <Switch checked={e}></Switch>;
            },
        },
        {
            title: t("marketPage.weight"),
            dataIndex: "weight",
            key: "weight",
            align: "center",
        },
    ];
    return (
        <>
            <Typography
                style={{
                    fontSize: "16px",
                    marginBottom: "30px",
                }}
            >
                {t("marketPage.itemlistTile")}
            </Typography>
            <Table
                loading={!currentData}
                columns={columns}
                dataSource={currentData?.cpdMarketItems || []}
            />
        </>
    );
};

export default MarketItemsTable;
