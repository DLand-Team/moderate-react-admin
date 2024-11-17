import { IconButton, Table, TableBody, Tooltip } from "@mui/material";
import { Scrollbar } from "../scrollbar";
import { TableSelectedAction } from "./table-selected-action";
import { useTable } from "./use-table";
import { Iconify } from "../iconify";
import { TableHeadCustom } from "./table-head-custom";
import { OrderTableRow } from "./table-row";
import { TableEmptyRows } from "./table-empty-rows";
import { cloneDeep, cumulativeSum, emptyRows } from "@/common/utils";
import {
    PropsWithChildren,
    ReactElement,
    useEffect,
    useRef,
    useState,
} from "react";
import FormProvider from "./form-provider";
import { useFieldsPro } from "@/common/hooks/useFieldsPro";
import { FormConfigItem } from "@/common/hooks/useGetField";

export interface ColumnItem<T> {
    title?: string;
    dataIndex?: keyof T;
    width?: number;
    align?: "center" | "left" | "right";
    minWidth?: number;
    fixed?: "left" | "right";
    _offect?: number;
    _isEdge?: boolean;
    renderEdit?: (props: {
        value: any;
        record: T;
        index: number;
        api: any;
    }) => ReactElement;
    render?: (props: {
        value: any;
        record: T;
        index: number;
        api: any;
    }) => ReactElement;
    formConfig?: FormConfigItem;
}
type CustomTableProps<T> = {
    dataSource: T[];
    columns: ColumnItem<T>[];
    scroll?: {
        width: number;
    };
    variant: "common" | "edit_row";
};

const Wrapper = <T,>(
    props: PropsWithChildren<{ isForm: boolean; methods: any }>
) => {
    const { isForm, methods, children } = props;
    if (isForm) {
        return <FormProvider formRef={methods}>{children}</FormProvider>;
    } else {
        return <>{children}</>;
    }
};

export const CustomTable = <T extends { id: string }>(
    props: CustomTableProps<T>
) => {
    const { columns, dataSource, scroll: scrollBase, variant } = props;
    let colNew = cloneDeep(columns);
    let dataNew = cloneDeep(dataSource);
    let scroll = cloneDeep(scrollBase);
    if (scroll?.width) {
        let left = {
            col: [],
            data: [],
        };
        let center = {
            col: [],
            data: [],
        };
        let right = {
            col: [],
            data: [],
        };
        let leftOffect = 48;
        let rightOffect = 0;
        let rightOffectList = [];
        let centerWidth = 0;
        columns.forEach((item, index) => {
            if (item.fixed == "left") {
                item._offect = leftOffect;
                left.col.push(item);
                leftOffect = leftOffect + item.width || 100;
                left.data.push(dataSource[index]);
            } else if (item.fixed == "right") {
                rightOffectList.push(item.width);
                right.col.push(item);
                right.data.push(dataSource[index]);
            } else {
                if (!item.width) {
                    centerWidth = -1;
                } else {
                    centerWidth = centerWidth + item!?.width! || 0;
                }
                center.col.push(item);
                center.data.push(dataSource[index]);
            }
        });
        rightOffectList = rightOffectList.reverse();
        rightOffectList.unshift(8);
        rightOffectList = cumulativeSum(rightOffectList).reverse().slice(1);
        right.col.forEach((item, index) => {
            item._offect = rightOffectList[index];
        });
        let leftEdgeId = left.col.length - 1;
        if (leftEdgeId > -1) {
            left.col[leftEdgeId]._isEdge = true;
        }
        if (right.col.length) {
            right.col[0]._isEdge = true;
        }
        // 判断一下，是否实现fixed
        if (
            centerWidth == -1 ||
            scroll.width - leftOffect - rightOffect >= centerWidth
        ) {
            let maxWidth =
                scroll.width - leftOffect - rightOffect - centerWidth;
            center.col.forEach((item) => {
                item.width += maxWidth / center.col.length;
            });

            colNew = [...left.col, ...center.col, ...right.col];
            dataNew = [...left.data, ...center.data, ...right.data];
        } else {
            scroll.width = undefined;
        }
    }

    const table = useTable({ defaultOrderBy: "orderNumber" });
    const ref = useRef<HTMLDivElement>(null);
    const [isScroll, setIsScroll] = useState(false);
    useEffect(() => {
        const handleClick = (e: any) => {
            if (e!?.target!?.scrollLeft > 0) {
                !isScroll && setIsScroll(true);
            } else {
                setIsScroll(false);
            }
        };
        const element = ref.current;
        element!?.addEventListener("scroll", handleClick);
        return () => {
            element!?.removeEventListener("scroll", handleClick);
        };
    }, []);
    // 功能点：多选之后显示头部工具栏
    const isForm = variant == "edit_row" ? true : false;
    let formConfigList: { [key in keyof T]: FormConfigItem } = {} as {
        [key in keyof T]: FormConfigItem;
    };
    columns.forEach((item) => {
        if (item.dataIndex) {
            formConfigList[item.dataIndex] = item.formConfig || {
                name: item.dataIndex as string,
            };
        }
    });
    const { methods, fileds } = useFieldsPro(formConfigList);
    return (
        <Scrollbar
            ref={ref}
            topPart={
                <TableSelectedAction
                    dense={table.dense}
                    numSelected={table.selected.length}
                    rowCount={dataSource.length}
                    onSelectAllRows={(checked) =>
                        table.onSelectAllRows(
                            checked,
                            dataSource.map((row) => row.id)
                        )
                    }
                    action={
                        <Tooltip title="Delete">
                            <IconButton color="primary" onClick={() => {}}>
                                <Iconify icon="solar:trash-bin-trash-bold" />
                            </IconButton>
                        </Tooltip>
                    }
                />
            }>
            <Wrapper methods={methods} isForm={isForm}>
                <Table
                    size={table.dense ? "small" : "medium"}
                    sx={{
                        position: "relative",
                        tableLayout: "fixed",
                        width: !scroll!?.width ? "100%" : scroll!?.width,
                    }}>
                    <colgroup>
                        <col></col>
                        {colNew.map((row, index) => {
                            return (
                                <col
                                    key={index}
                                    style={
                                        row.width
                                            ? {
                                                  width: row.width,
                                              }
                                            : {}
                                    }></col>
                            );
                        })}
                    </colgroup>
                    <TableHeadCustom<T>
                        isScroll={isScroll}
                        order={table.order}
                        orderBy={table.orderBy}
                        columns={colNew}
                        rowCount={dataSource.length}
                        numSelected={table.selected.length}
                        onSort={table.onSort}
                        onSelectAllRows={(checked) =>
                            table.onSelectAllRows(
                                checked,
                                dataSource.map((row) => row.id)
                            )
                        }
                        sx={{
                            position: "sticky",
                            top: 0,
                            zIndex: 1,
                            background: "#F4F6F8",
                        }}
                    />

                    <TableBody
                        sx={{
                            width: "100%",
                            height: "200px",
                            overflowY: "auto",
                        }}>
                        {dataNew.map((row, index) => {
                            return (
                                <OrderTableRow<T>
                                    fileds={fileds}
                                    table={table}
                                    index={index}
                                    isScroll={isScroll}
                                    row={row}
                                    columns={colNew}
                                    key={row.id || index}
                                    selected={table.selected.includes(row.id)}
                                    onSelectRow={(r) => table.onSelectRow(r.id)}
                                    methods={methods}
                                />
                            );
                        })}

                        <TableEmptyRows
                            height={table.dense ? 56 : 56 + 20}
                            emptyRows={emptyRows(
                                table.page,
                                table.rowsPerPage,
                                dataNew.length
                            )}
                        />
                    </TableBody>
                </Table>
            </Wrapper>
        </Scrollbar>
    );
};
