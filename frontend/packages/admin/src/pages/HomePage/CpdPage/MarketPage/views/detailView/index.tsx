import { Button, Card, Form, message } from "antd";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import InfoCard from "src/components/infoCard";
import { appHelper, useFlat } from "src/service";
import type { Market } from "src/service/stores/marketStore/model";
import MarketItemsTable from "../../components/marketDetailTable";
import styles from "./index.module.scss";
import useDetailConfig from "./useDetailConfig";

export interface DetailViewProps {
    branchName?: string;
}

const DetailView = ({ branchName }: DetailViewProps) => {
    const [formRef] = Form.useForm<Market>();
    let [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const { addAct, updateAct, isEditing } = useFlat([
        "marketStore",
        branchName,
    ]);

    const { t } = useTranslation(["market"]);
    const { t: commonT } = useTranslation(["common"]);
    const items = useDetailConfig(branchName);

    return (
        <div className={styles.marketEditContent}>
            <div className={styles.btnTable}>
                <Button
                    onClick={async () => {
                        if (isEditing) {
                            message.warning({
                                content: commonT`blog.editing`,
                            });
                            return;
                        }
                        await formRef.validateFields();
                        await (!id ? addAct() : updateAct());
                        message.success({
                            content: t`marketPage.succeed`,
                        });
                        appHelper.closeTabByPath();
                    }}
                    style={{ marginRight: 10 }}
                    type="primary"
                >
                    {t`marketPage.edit`}
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
