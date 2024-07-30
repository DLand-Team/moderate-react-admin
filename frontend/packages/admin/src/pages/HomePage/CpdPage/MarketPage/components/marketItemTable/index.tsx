import { PlusOutlined } from "@ant-design/icons";
import { Button, Typography, message } from "antd";
import { useTranslation } from "react-i18next";
import { EditTable, Wrapper } from "src/components/editTable";
import { UUID } from "src/common/utils";
import { useFlat } from "src/service";
import type { MarketItem } from "src/service/stores/marketStore/model";
import columnsCreater from "./columnsCreater";

const WrapperComp: Wrapper<MarketItem> = ({
    children,
    editingKey,
    setDataList,
    dataList,
    edit,
}) => {
    const { t } = useTranslation(["market"]);
    const { t: commonT } = useTranslation(["common"]);
    const { currentData, setCurrentMarketData, setIsDisabledMarketType } =
        useFlat("marketStore");
    return (
        <>
            {children}
            <Button
                style={{
                    marginTop: "30px",
                }}
                onClick={() => {
                    if (editingKey) {
                        message.warning({
                            content: commonT`blog.editing`,
                        });
                        return;
                    }
                    const newData = {
                        uid: UUID(),
                    } as MarketItem;
                    const neList = [...dataList, newData];
                    edit(newData);
                    setDataList(neList);
                    setCurrentMarketData({
                        ...currentData!,
                        cpdMarketItems: neList,
                    });
                    setIsDisabledMarketType(true);
                }}
                icon={<PlusOutlined />}
                type="dashed"
            >
                {t`marketPage.addLine`}
            </Button>
        </>
    );
};

const MarketItemsTable = ({ branchName }: { branchName: string }) => {
    const { currentData, setCurrentMarketData } = useFlat([
        "marketStore",
        branchName,
    ]);
    const { t } = useTranslation(["market"]);

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
            <EditTable<MarketItem>
                columnCreater={(props) => {
                    return columnsCreater(props, { branchName });
                }}
                values={currentData?.cpdMarketItems || []}
                Wrapper={WrapperComp}
                handleValuesChange={({ allData }) => {
                    setCurrentMarketData({
                        ...currentData!,
                        cpdMarketItems: allData,
                    });
                }}
            />
        </>
    );
};

export default MarketItemsTable;
