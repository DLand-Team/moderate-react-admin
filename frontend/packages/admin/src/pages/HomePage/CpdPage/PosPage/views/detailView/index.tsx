import { Button, Card, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { useTranslation } from "react-i18next";
import InfoCard from "src/components/infoCard";
import { appHelper, useFlat } from "src/service";
import styles from "./style.module.scss";
import useDetailConfig from "./useDetailConfig";

/* type */
export interface PosDetailViewProps {
    isSub?: boolean;
    handleCancel?: () => void;
    branchName?: string;
}

/* Main */
const DetailView = ({ handleCancel, branchName = "" }: PosDetailViewProps) => {
    const { t } = useTranslation("pos");
    const detailConfig = useDetailConfig(branchName);
    const { currentData } = useFlat(["posStore", branchName], {
        currentData: "IN",
    });
    const columns: ColumnsType = [
        {
            title: t("posPage.posType"),
            dataIndex: "posType",
            key: "posType",
            align: "center",
            render(value) {
                let data = {
                    I: t("posPage.IATANUM"),
                    T: t("posPage.PCC"),
                };
                return value in data ? data[value as keyof typeof data] : "";
            },
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
    return (
        <div className={styles.container}>
            <>
                <Card className={styles.infoCard}>
                    <InfoCard items={detailConfig}></InfoCard>
                </Card>
                <Card className={styles.posItemsTableCard}>
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
                </Card>
            </>
            <div className={styles.btnTable}>
                <Button
                    onClick={() => {
                        if (handleCancel) {
                            handleCancel();
                        } else {
                            appHelper.closeTabByPath();
                        }
                    }}
                >
                    {t`common:edit`}
                </Button>
            </div>
        </div>
    );
};

export default DetailView;
