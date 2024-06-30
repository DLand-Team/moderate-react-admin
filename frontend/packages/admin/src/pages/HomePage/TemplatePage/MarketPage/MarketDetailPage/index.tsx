import { Button, Card, DescriptionsProps, Form, Skeleton, message } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { AppHelper, useFlat } from "src/service";
import MarketItemsTable from "./components/tablePart";
import "./index.scss";
import InfoCard, { TopPartForm } from "src/components/infoCard";

const MarketEditPage = () => {
    // 第一步：通过路由信息判断是否是编辑
    const [formRef] = Form.useForm<TopPartForm>();
    let [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const {
        currentData,
        addAct,
        updateAct,
        getCurrentDetailAct,
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
    let optionArr = {
        [0]: t`marketPage.NORMAL`,
        [1]: t`marketPage.CONNECITON`,
    };
    const items: DescriptionsProps["items"] = [
        {
            label: t`marketPage.marketName`,
            children: currentData?.marketName || (
                <Skeleton.Input block={true} active={true} />
            ),
            span: { xl: 2, xxl: 2 },
        },
        {
            label: t`marketPage.marketType`,
            children: currentData ? (
                optionArr[currentData?.marketType as keyof typeof optionArr]
            ) : (
                <Skeleton.Input block={true} active={true} />
            ),
            span: { xl: 2, xxl: 2 },
        },
        {
            label: t`marketPage.comment`,
            span: 12,
            children: currentData ? (
                currentData?.comment
            ) : (
                <Skeleton.Input block={true} active={true} />
            ),
        },
    ];

    return (
        <div className="marketEditContent">
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
                        AppHelper.closeTabByPath();
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
                    <MarketItemsTable></MarketItemsTable>
                </Card>
            </>
        </div>
    );
};
export default MarketEditPage;
