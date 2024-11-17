import { Box, Collapse, IconButton } from "@mui/material";
import { useRef, useState } from "react";
import { Iconify } from "../iconify";
import { uuidv4 } from "src/common/utils/uuidv4";
import { TreeItem } from "./tree-item";
import { TreeItemProps, TreeProps } from "./types";

const RenderTreeItemLoop = (
    props: TreeItemProps & {
        update?: () => void;
        record: { [key: string]: TreeItemProps };
        parentSections?: TreeItemProps[] | null;
        currentId?: string;
    }
) => {
    const {
        isAdd,
        formConfig,
        parentSections,
        isCurrent,
        record,
        sections,
        update,
        onDelete,
        onAdd,
        judeShow,
        ...rest
    } = props;

    const [isOpen, setIsOpen] = useState(true);
    if (judeShow && !judeShow()) {
        return <></>;
    }
    return (
        <>
            <TreeItem
                onClick={() => {
                    if (props.formConfig) {
                        for (let i in record) {
                            record[i].active = false;
                            record[i].isCurrent = false;
                        }
                        record[props.id!].active = true;
                        record[props.id!].isCurrent = true;
                        let idStrs = props.id?.split("_").slice(0, -1) || [];
                        if (idStrs?.length! > 1) {
                            idStrs.forEach((_, index) => {
                                let idTemp = props.id
                                    ?.split("_")
                                    .slice(0, index + 1)
                                    .join("_");
                                idTemp &&
                                    idTemp != "0" &&
                                    (record[idTemp!].active = true);
                            });
                        }
                        update!?.();
                    } else {
                        if (props.onSwitch) {
                            for (let i in record) {
                                record[i].active = false;
                                record[i].isCurrent = false;
                            }
                            record[props.id!].active = true;
                            record[props.id!].isCurrent = true;
                            props.onSwitch(props.id!);
                        }
                    }

                    if (props.id == "0") {
                        setIsOpen(true);
                    } else {
                        !!sections && setIsOpen(!isOpen);
                    }
                }}
                {...rest}>
                {isAdd && (
                    <IconButton
                        style={{
                            zIndex: 10,
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!props.active) {
                                setIsOpen(true);
                            }
                            sections && onAdd!(sections);
                            update!?.();
                        }}
                        sx={{ position: "absolute", right: "40px" }}>
                        <Iconify width={16} icon={"icon-park-outline:add"} />
                    </IconButton>
                )}
                {record[props.id?.split("_").slice(0, -1).join("_")!]?.type ==
                    "array" && (
                    <IconButton
                        style={{
                            zIndex: 10,
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (record[props.id!].active) {
                                for (let i in record) {
                                    record[i].active = false;
                                }
                                record[0].active = true;
                            }
                            onDelete!(props.id!, parentSections!);
                            update!?.();
                        }}
                        sx={{ position: "absolute", right: "40px" }}>
                        <Iconify width={16} icon={"icon-park-outline:delete"} />
                    </IconButton>
                )}
                {!!sections && props.id !== "0" && (
                    <Iconify
                        width={16}
                        icon={
                            isOpen
                                ? "eva:arrow-ios-downward-fill"
                                : "eva:arrow-ios-forward-fill"
                        }
                        sx={{ position: "absolute", right: "20px" }}
                    />
                )}
            </TreeItem>
            {!!sections && (
                <Collapse in={isOpen}>
                    {sections?.map((item, index) => {
                        const { label, parentId, onDelete, ...rest } = item;
                        return (
                            <div key={item.id}>
                                <RenderTreeItemLoop
                                    onSwitch={props.onSwitch}
                                    onDelete={onDelete}
                                    parentSections={onDelete ? sections : null}
                                    update={update}
                                    record={record}
                                    {...rest}
                                    label={
                                        record[parentId!]?.type == "array"
                                            ? `${label}-${index}`
                                            : label
                                    }></RenderTreeItemLoop>
                            </div>
                        );
                    })}
                </Collapse>
            )}
        </>
    );
};

export const processRecordLoop = (
    data: TreeItemProps,
    id: string,
    record: { [key: string]: TreeItemProps }
) => {
    if (!id) {
        id = uuidv4();
    }
    if (id == "0") {
        record[id] = data;
    }
    data.id = id;
    const { sections } = data;
    if (!!sections) {
        sections.map((item) => {
            item.parentId = id;
            let uuid = item.id || `${id}_${uuidv4()}`;
            processRecordLoop(item, uuid, record);
            record[uuid] = item;
        });
    }
};

export const Tree = (props: TreeProps) => {
    const { treeRoot, update, record, onSwitch, ...rest } = props;
    let temp = treeRoot;
    let recordTemp = record;
    let ref = useRef({});
    const [_, setFreshFlag] = useState(Date.now());
    if (!record) {
        recordTemp = ref.current;
        processRecordLoop(temp, "0", recordTemp);
    }

    return (
        <Box {...rest}>
            <RenderTreeItemLoop
                onSwitch={(id) => {
                    onSwitch?.(id, recordTemp);
                    setFreshFlag(Date.now());
                }}
                update={update}
                record={recordTemp!}
                {...temp}></RenderTreeItemLoop>
        </Box>
    );
};
