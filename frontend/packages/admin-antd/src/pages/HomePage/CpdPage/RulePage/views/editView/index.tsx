import { Button, Card, Drawer, Form, message } from "antd";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { appHelper, useFlat } from "src/service";
import { AddItemDrawerType } from "src/service/stores/ruleStore/model";
import PosEditPage from "../../../PosPage/PosEditPage";
import BottomPart from "../../components/bottomPart";
import TopPart, { TopPartForm } from "../../components/topPart";
import styles from "./style.module.scss";

/* type */
export interface RuleEditViewPorps {
    branchName?: string;
}

const EditView = ({ branchName = "" }: RuleEditViewPorps) => {
    const [formRef] = Form.useForm<TopPartForm>();

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    const {
        addRuleAct,
        updateRuleAct,
        itineraryList,
        currentData,
        isAddItemDrawerFlag,
        setIsAddItemDrawerFlag,
        addItemType,
    } = useFlat(["ruleStore", branchName]);
    const { t } = useTranslation(["rule"]);

    // 提交回调
    const handleSubmit = async () => {
        await formRef.validateFields();
        const values = formRef.getFieldsValue();
        values.status = values.status ? 1 : 0;
        values.backupResult = values.backupResult ? 1 : 0;
        values.effectStartDate = values.effectDateData![0].toString();
        values.effectEndDate = values.effectDateData![1].toString();
        delete values.effectDateData;
        const newData = {
            ...values,
            cpdRuleItinerarys: itineraryList,
        };
        // 转换生效日期范围
        await (!id
            ? addRuleAct(newData)
            : updateRuleAct({ ...currentData, ...newData }));
        message.success({
            content: t`rulePage_succeed`,
        });
        appHelper.closeTabByPath();
    };

    return (
        <div className={styles.container}>
            <div className={styles.btnTable}>
                <Button
                    onClick={handleSubmit}
                    style={{ marginRight: 10 }}
                    type="primary"
                >
                    {t`rulePage_save`}
                </Button>
                <Button
                    onClick={() => {
                        appHelper.closeTabByPath();
                    }}
                >
                    {t`rulePage_cancel`}
                </Button>
            </div>
            {/* 无id，则为添加，直接显示 */}
            {/* 有id，则为修改，为了回显ok，保证数据获得再显示 */}
            <>
                <Card
                    style={{
                        marginBottom: "12px",
                    }}
                >
                    <TopPart
                        branchName={branchName}
                        formRef={formRef}
                    ></TopPart>
                </Card>
                <Card
                    style={{
                        minHeight: "300px",
                        marginBottom: "30px",
                    }}
                >
                    <BottomPart branchName={branchName}></BottomPart>
                </Card>
            </>

            <Drawer
                width={"40%"}
                onClose={() => {
                    setIsAddItemDrawerFlag({
                        flag: false,
                        type: "",
                    });
                }}
                open={isAddItemDrawerFlag}
                title={
                    addItemType == AddItemDrawerType.market
                        ? t("add_market")
                        : t("add_pos")
                }
            >
                {AddItemDrawerType.pos === addItemType && (
                    <PosEditPage
                        handleCancel={() => {
                            setIsAddItemDrawerFlag({
                                flag: false,
                                type: "",
                            });
                        }}
                    />
                )}
            </Drawer>
        </div>
    );
};
export default EditView;
