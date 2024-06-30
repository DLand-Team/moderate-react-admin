import { Button, Card, Form, message } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { AppHelper, useFlat } from "src/service";
import MarketItemsTable from "./components/tablePart";
import TopForm, { TopPartForm } from "./components/topForm";
import "./index.scss";

const MarketEditPage = ({
    handleCancel,
}: {
    isSub?: boolean;
    handleCancel?: () => void;
}) => {
    // 第一步：通过路由信息判断是否是编辑
    const [formRef] = Form.useForm<TopPartForm>();
    let [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const {
        addAct,
        updateAct,
        getCurrentDetailAct,
        currentData,
        setCurrentMarketData,
        getLocationListAct,
        isEditing,
    } = useFlat("marketStore");
    useEffect(() => {
        getCurrentDetailAct({
            id,
        });
        getLocationListAct();
        return () => {
            setCurrentMarketData(null);
        };
    }, []);
    const { t } = useTranslation(["market"]);
    const { t: commonT } = useTranslation(["common"]);

    return (
        <div className="marketEditContent">
            {/* 无id，则为添加，直接显示 */}
            {/* 有id，则为修改，为了回显ok，保证数据获得再显示 */}
            {(!id || (id && currentData)) && (
                <>
                    <Card
                        style={{
                            marginBottom: "12px",
                        }}
                    >
                        <TopForm formRef={formRef}></TopForm>
                    </Card>
                    <Card
                        style={{
                            marginBottom: "30px",
                        }}
                    >
                        <MarketItemsTable></MarketItemsTable>
                    </Card>
                </>
            )}
            <div className="btnTable">
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
                        if (handleCancel) {
                            handleCancel();
                        } else {
                            AppHelper.closeTabByPath();
                        }
                    }}
                    style={{ marginRight: 10 }}
                    type="primary"
                >
                    {t`marketPage.save`}
                </Button>
                <Button
                    onClick={() => {
                        if (handleCancel) {
                            handleCancel();
                        } else {
                            AppHelper.closeTabByPath();
                        }
                    }}
                >
                    {t`marketPage.cancel`}
                </Button>
            </div>
        </div>
    );
};
export default MarketEditPage;
