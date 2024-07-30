// 用处： 详情，编辑和添加页面下方的table部分
import { PlusOutlined } from "@ant-design/icons";
import { Button, Typography, message } from "antd";
import { useTranslation } from "react-i18next";
import { EditTable, Wrapper } from "src/components/editTable";
import { UUID } from "src/common/utils";
import { useFlat } from "src/service";
import type { PosItem } from "src/service/stores/posStore/model";
import columnsCreater from "./columnsCreater";

const WrapperComp: Wrapper<PosItem> = ({
    children,
    editingKey,
    setDataList,
    dataList,
    edit,
}) => {
    const { t } = useTranslation(["pos"]);
    const { t: commonT } = useTranslation(["common"]);
    const { currentData, setCurrentDetail } = useFlat("posStore");
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
                    const newItem = {
                        uid: UUID(),
                    } as PosItem;
                    const nweList = [...dataList, newItem];
                    setDataList(nweList);
                    edit(newItem);
                    setCurrentDetail({
                        ...currentData!,
                        cpdPosItems: nweList,
                    });
                }}
                icon={<PlusOutlined />}
                type="dashed"
            >
                {t`posPage.addLine`}
            </Button>{" "}
        </>
    );
};

const PosItemsTable = ({ branchName }: { branchName: string }) => {
    const { currentData, setCurrentDetail } = useFlat(
        ["posStore", branchName],
        {
            currentData: "IN",
        }
    );
    const { t } = useTranslation(["pos"]);
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
            <EditTable<PosItem>
                columnCreater={(props) => {
                    return columnsCreater(props, { branchName });
                }}
                values={currentData?.cpdPosItems || []}
                Wrapper={WrapperComp}
                handleValuesChange={({ allData }) => {
                    setCurrentDetail({
                        ...currentData!,
                        cpdPosItems: allData,
                    });
                }}
            />
        </>
    );
};

export default PosItemsTable;
