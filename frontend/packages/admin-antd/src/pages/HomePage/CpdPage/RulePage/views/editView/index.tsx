import { Button, Card, Drawer, Form, message } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { appHelper, useFlat } from "src/service";
import { AddItemDrawerType } from "src/service/stores/ruleStore/model";
import MarketAddPage from "../../../MarketPage/MarketAddPage";
import MarketEditPage from "../../../MarketPage/MarketEditPage";
import PosAddPage from "../../../PosPage/PosAddPage";
import PosEditPage from "../../../PosPage/PosEditPage";

import BottomPart from "../../components/bottomPart";
import TopPart, { TopPartForm } from "../../components/topPart";
import styles from "./style.module.scss";
import FilterModalForm from "../../../FilterPage/FilterListPage/components/modalForm/modalForm";
import SortModalForm from "../../../SortPage/SortListPage/components/modalForm/modalForm";
import PosDetailPage from "../../../PosPage/PosDetailPage";
import MarketDetailPage from "../../../MarketPage/MarketDetailPage";
import { PropsWithChildren } from "react";

/* type */
export interface RuleEditViewPorps {
    branchName?: string;
}

const EditView = ({ branchName = "" }: RuleEditViewPorps) => {
    const [formRef] = Form.useForm<TopPartForm>();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    const { addRuleAct, updateRuleAct, itineraryList, currentData } = useFlat(
        ["ruleStore", branchName],
        {
            currentData: "IN",
            itineraryList: "IN",
        }
    );
    const { subId, setIsAddItemDrawerFlag, addItemType, isAddItemDrawerFlag } =
        useFlat("ruleStore", {
            subId: "IN",
            addItemType: "IN",
            isAddItemDrawerFlag: "IN",
        });
    const { t } = useTranslation(["rule"]);

    // 提交回调
    const handleSubmit = async () => {
        await formRef.validateFields();
        const values = formRef.getFieldsValue();
        values.status = values.status ? 1 : 0;
        values.backupResult = values.backupResult ? 1 : 0;
        values.effectStartDate = dayjs(values.effectDateData![0]).format(
            "YYYYMMDD"
        );
        values.effectEndDate = dayjs(values.effectDateData![1]).format(
            "YYYYMMDD"
        );
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
    const pageMap = {
        [AddItemDrawerType.pos_add]: {
            title: t("add_pos"),
            comp: PosAddPage,
        },
        [AddItemDrawerType.market_add]: {
            title: t("add_market"),
            comp: MarketAddPage,
        },
        [AddItemDrawerType.pos_edit]: {
            title: t("edit_pos"),
            comp: PosEditPage,
        },
        [AddItemDrawerType.market_edit]: {
            title: t("edit_market"),
            comp: MarketEditPage,
        },
        [AddItemDrawerType.pos_detail]: {
            title: t("rulePage_PosDetail"),
            comp: PosDetailPage,
        },
        [AddItemDrawerType.market_detail]: {
            title: t("rulePage_MarketDetail"),
            comp: MarketDetailPage,
        },
        [AddItemDrawerType.filter]: { title: "", comp: FilterModalForm },
        [AddItemDrawerType.sort]: { title: "", comp: SortModalForm },
    };
    const SubWrapper = isAddItemDrawerFlag
        ? Drawer
        : (props: PropsWithChildren) => <>{props.children}</>;
    const { comp: SubPage, title } =
        addItemType !== ""
            ? pageMap[addItemType]
            : {
                  title: "",
                  comp: (props: PropsWithChildren) => <>{props.children}</>,
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

            <SubWrapper
                width={"40%"}
                onClose={() => {
                    setIsAddItemDrawerFlag({
                        flag: false,
                        type: "",
                    });
                }}
                open={isAddItemDrawerFlag}
                title={title}
            >
                <SubPage
                    id={subId}
                    isSub={true}
                    handleCancel={() => {
                        setIsAddItemDrawerFlag({
                            flag: false,
                            type: "",
                        });
                    }}
                />
            </SubWrapper>
        </div>
    );
};
export default EditView;
