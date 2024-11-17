import { SxProps, Theme } from "@mui/material";
export interface TreeProps {
    currentId?: string;
    treeRoot: TreeItemProps;
    sx?: SxProps<Theme>;
    update?: () => void;
    onSwitch?: (id: string, record: any) => void;
    record?: { [key: string]: TreeItemProps };
}
import { FormConfig } from "src/common/hooks";
export interface TreeItemProps {
    isError?: boolean; // 是否显示错误
    formConfig?: FormConfig | null;
    formCreater?: () => TreeItemProps | null;
    id?: string;
    parentId?: string;
    uuid?: string;
    active: boolean;
    isCurrent?: boolean;
    depth: number;
    label: string;
    name?: string;
    sx?: SxProps<Theme>;
    isAdd?: boolean;
    type?: "array" | "object";
    onAdd?: (listArr: TreeItemProps[]) => void;
    onDelete?: (id: string, listArr: TreeItemProps[]) => void;
    children?: React.ReactNode | undefined;
    sections?: TreeItemProps[];
    judeShow?: () => boolean;
    onSwitch?: (id: string) => void;
}
