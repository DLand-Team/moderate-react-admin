import { Button, Collapse } from "antd";
import { useTranslation } from "react-i18next";
import { EditTable } from "src/components/editTable";
import { useFlat } from "src/service";
import type { Segment } from "src/service/stores/ruleStore/model";
import { segmentItem } from "src/shapes";
import columnsCreater from "./columnCreater";
import { useState } from "react";

const { Panel } = Collapse;

const SegmentItem = (props: {
    data: Segment[];
    branchName: string;
    position: string;
}) => {
    const { data, position = "1", branchName } = props;
    const { isDetail, updateSegmentAct, addSegmentAct } = useFlat(
        ["ruleStore", branchName],
        {
            isDetail: "IN",
        }
    );
    const { t: commonT } = useTranslation("common");
    const { t } = useTranslation("rule");
    const [page, setPage] = useState(1);
    return (
        <Collapse
            style={{
                marginBottom: "12px",
            }}
        >
            <Panel header={`${t("rulePage_segment")} ${position}`} key="1">
                <EditTable
                    tableOptions={{
                        scroll: {
                            x: "100%",
                        },
                        pagination: {
                            current: page,
                            onChange(page) {
                                setPage(page);
                            },
                        },
                    }}
                    handleValuesChange={({ changedData }) => {
                        updateSegmentAct(changedData);
                    }}
                    values={data}
                    columnCreater={(props) => {
                        return columnsCreater(props, { branchName });
                    }}
                    Wrapper={({ children, edit }) => {
                        return (
                            <>
                                {children}
                                {!isDetail && (
                                    <Button
                                        onClick={() => {
                                            const newData = {
                                                ...segmentItem(),
                                                position,
                                            };
                                            addSegmentAct(newData);
                                            edit(newData);
                                            setPage(
                                                Math.ceil((data.length + 1) / 5)
                                            );
                                        }}
                                    >
                                        {commonT("add")}
                                    </Button>
                                )}
                            </>
                        );
                    }}
                />
            </Panel>
        </Collapse>
    );
};

export default SegmentItem;
