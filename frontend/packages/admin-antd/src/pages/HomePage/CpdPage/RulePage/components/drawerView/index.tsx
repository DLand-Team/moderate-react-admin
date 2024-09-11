import { AddItemDrawerType } from "src/service/stores/ruleStore/model";
import PosAddPage from "../../../PosPage/PosAddPage";
import MarketAddPage from "../../../MarketPage/MarketAddPage";
import PosEditPage from "../../../PosPage/PosEditPage";
import MarketEditPage from "../../../MarketPage/MarketEditPage";
import PosDetailPage from "../../../PosPage/PosDetailPage";
import MarketDetailPage from "../../../MarketPage/MarketDetailPage";
import FilterModalForm from "../../../FilterPage/FilterListPage/components/modalForm/modalForm";
import SortModalForm from "../../../SortPage/SortListPage/components/modalForm/modalForm";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { dpChain, useFlat } from "src/service";
import { Drawer } from "antd";

const DrawerView = ({ branchName }: { branchName: string }) => {
    const { subId, setIsAddItemDrawerFlag, addItemType, isAddItemDrawerFlag } =
        useFlat(["ruleStore", branchName], {
            subId: "IN",
            addItemType: "IN",
            isAddItemDrawerFlag: "IN",
        });
    const { t } = useTranslation(["rule"]);
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
        [AddItemDrawerType.filter_add]: { title: "", comp: FilterModalForm },
        [AddItemDrawerType.sort_add]: { title: "", comp: SortModalForm },
        [AddItemDrawerType.filter_detail]: { title: "", comp: FilterModalForm },
        [AddItemDrawerType.sort_detail]: { title: "", comp: SortModalForm },
        [AddItemDrawerType.filter_edit]: { title: "", comp: FilterModalForm },
        [AddItemDrawerType.sort_edit]: { title: "", comp: SortModalForm },
    };
    let flag = false;
    if (addItemType == AddItemDrawerType.filter_detail) {
        dpChain("filterStore").getDetailAct({ id: subId });
        dpChain("filterStore").setIsDetail(true);
        dpChain("filterStore").setIsShowModal(true);
    } else if (addItemType == AddItemDrawerType.sort_detail) {
        dpChain("sortStore").setIsDetail(true);
        dpChain("sortStore").getDetailAct({ id: subId });
        dpChain("sortStore").setIsShowModal(true);
    } else if (addItemType == AddItemDrawerType.filter_edit) {
        dpChain("filterStore").getDetailAct({ id: subId });
        dpChain("filterStore").setIsShowModal(true);
    } else if (addItemType == AddItemDrawerType.sort_edit) {
        dpChain("sortStore").getDetailAct({ id: subId });
        dpChain("sortStore").setIsShowModal(true);
    } else if (addItemType == AddItemDrawerType.sort_add) {
        dpChain("sortStore").setCurrentData(null);
        dpChain("sortStore").setIsShowModal(true);
    } else if (addItemType == AddItemDrawerType.filter_add) {
        dpChain("filterStore").setCurrentData(null);
        dpChain("filterStore").setIsShowModal(true);
    } else {
        flag = isAddItemDrawerFlag;
    }
    const SubWrapper = flag
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
    );
};

export default DrawerView;
