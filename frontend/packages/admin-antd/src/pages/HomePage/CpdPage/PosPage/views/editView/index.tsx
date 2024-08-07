import { Button, Card, Form, Skeleton, message } from "antd";
import { useTranslation } from "react-i18next";
import { ROUTE_ID } from "src/router";
import { appHelper, useFlat } from "src/service";
import TopForm, { DetailFormValue } from "../../components/detailForm";
import PosItemsTable from "../../components/posItemsTable";
import styles from "./style.module.scss";

/* type */
export interface PosEditViewProps {
    isSub?: boolean;
    handleCancel?: () => void;
    branchName?: string;
}

/* Main */
const PosEditView = ({ handleCancel, branchName = "" }: PosEditViewProps) => {
    // 第一步：通过路由信息判断是否是编辑
    const [formRef] = Form.useForm<DetailFormValue>();
    const { addPosAct, updatePosAct, currentData, isEditing } = useFlat([
        "posStore",
        branchName,
    ]);
    const { t } = useTranslation();
    const isAddPage = branchName == ROUTE_ID.PosAddPage;
    const isLoading = !currentData;
    return (
        <div className={styles.container}>
            <div className={styles.btnTable}>
                <Button
                    onClick={async () => {
                        if (isEditing) {
                            message.warning({
                                content: t`common:blog.editing`,
                            });
                            return;
                        }
                        await formRef.validateFields();
                        if (!currentData?.cpdPosItems.length) {
                            return message.error({
                                content: t`pos:posPage.addOne`,
                            });
                        }
                        await (isAddPage
                            ? addPosAct(null)
                            : updatePosAct(null));
                        message.success({
                            content: t`pos:posPage.addSave`,
                        });
                        if (handleCancel) {
                            handleCancel();
                        } else {
                            appHelper.closeTabByPath();
                        }
                    }}
                    style={{ marginRight: 10 }}
                    type="primary"
                >
                    {t`common:save`}
                </Button>
                <Button
                    onClick={() => {
                        if (handleCancel) {
                            handleCancel();
                        } else {
                            appHelper.closeTabByPath();
                        }
                    }}
                >
                    {t`common:cancel`}
                </Button>
            </div>
            {isLoading ? (
                <>
                    <Card className={styles.infoCard}>
                        <Skeleton active />
                    </Card>
                    <Card className={styles.posItemsTableCard}>
                        <Skeleton active />
                    </Card>
                </>
            ) : (
                <>
                    <Card className={styles.infoCard}>
                        <TopForm
                            branchName={branchName}
                            formRef={formRef}
                        ></TopForm>
                    </Card>
                    <Card className={styles.posItemsTableCard}>
                        <PosItemsTable branchName={branchName}></PosItemsTable>
                    </Card>
                </>
            )}
        </div>
    );
};
export default PosEditView;
