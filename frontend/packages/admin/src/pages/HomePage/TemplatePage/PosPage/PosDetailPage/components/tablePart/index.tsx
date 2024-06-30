import { Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import { useFlat } from "src/service";

const PosItemsTable = () => {
    const { currentData } = useFlat("posStore", {
        currentData: "IN",
    });
    const { t } = useTranslation(["pos"]);
    const columns: ColumnsType = [
        {
            title: t("posPage.posType"),
            dataIndex: "posType",
            key: "posType",
            align: "center",
        },
        {
            title: t("posPage.posInfo"),
            dataIndex: "posInfo",
            key: "posInfo",
            align: "center",
        },
        {
            title: t("posPage.exclude"),
            dataIndex: "exclude",
            key: "exclude",
            align: "center",
        },
        {
            title: t("posPage.weight"),
            dataIndex: "weight",
            key: "weight",
            align: "center",
        },
    ];
    ;
    return (
        <>
            <Typography
                style={{
                    fontSize: "16px",
                    marginBottom: "30px",
                }}
            >
                {t("posPage.itemListTitle")}
            </Typography>
            <Table
                loading={!currentData}
                columns={columns}
                dataSource={currentData?.cpdPosItems || []}
            />
        </>
    );
};

export default PosItemsTable;
