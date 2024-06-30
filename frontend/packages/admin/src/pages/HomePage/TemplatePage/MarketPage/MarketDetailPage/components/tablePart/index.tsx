import { Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { useFlat } from "src/service";

const MarketItemsTable = () => {
    const { currentData } = useFlat("marketStore", { currentData: "IN" });
    const { t } = useTranslation(["market"]);
    const columns: ColumnsType = [
        {
            title: t("marketPage.locationType"),
            dataIndex: "locationType",
            key: "locationType",
            align: "center",
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
