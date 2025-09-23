"use client";
/* eslint no-console:0, react/no-danger: 0 */
import { useSidebar } from "@/src/shadcn/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/shadcn/components/ui/tooltip";
import { cn } from "@/src/shadcn/lib/utils";
import { Provider } from "@rc-component/motion";
import Tree from "@rc-component/tree";
import "@rc-component/tree/assets/index.css";
import { DataNode, IconType } from "@rc-component/tree/lib/interface";
import { IconFileCode, IconFolder } from "@tabler/icons-react";
import { cva, VariantProps } from "class-variance-authority";
import React, { useRef } from "react";
import { Iconify } from "src/components/iconify";
import "./animation.scss";
import { Checkbox } from "./check-box";

export interface Dept {
  id: number;
  name: string;
  parentId: number;
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-border data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function SidebarMenuNode({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const { isMobile, state } = useSidebar();

  const button = (
    <div
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  );
}

const STYLE = `
.rc-tree-child-tree {
  display: block;
}

.node-motion {
  transition: all .3s;
  overflow-y: hidden;
}
`;

const defaultExpandedKeys = ["0", "0-2", "0-9-2"];

const motion = {
  motionName: "node-motion",
  motionAppear: false,
  onAppearStart: () => ({ height: 0 }),
  onAppearActive: (node: any) => ({ height: node.scrollHeight }),
  onLeaveStart: (node: any) => ({ height: node.offsetHeight }),
  onLeaveActive: () => ({ height: 0 }),
};

const IconRender: IconType = ({ isLeaf }) => {
  return (
    <>
      {isLeaf ? (
        <IconFileCode className="w-4 h-4" />
      ) : (
        <IconFolder className="w-4 h-4" />
      )}
    </>
  );
};

const TitleRender = ({
  treeRef,
  menuKey,
  isLeaf,
  title,
  key,
}: DataNode & {
  treeRef: React.RefObject<Tree<DataNode> | null>;
  menuKey: string;
}) => {
  if (typeof title === "string") {
    return (
      <SidebarMenuNode
        isActive={treeRef.current?.state?.selectedKeys.includes(menuKey)}
      >
        <Checkbox
          halfChecked={
            treeRef.current?.state?.halfCheckedKeys?.includes(menuKey) || false
          }
          checked={
            treeRef.current?.state?.checkedKeys?.includes(menuKey) ||
            treeRef.current?.state?.halfCheckedKeys?.includes(menuKey) ||
            false
          }
        />
        <IconRender isLeaf={isLeaf} />
        {title}
      </SidebarMenuNode>
    );
  } else if (typeof title === "function") {
    title = title({ key, isLeaf } as DataNode);
  }
  return "";
};

// 将部门数据转换为树形结构
function transformDeptToTreeData(deptList: Dept[]): DataNode[] {
  if (!deptList || deptList.length === 0) {
    return [];
  }

  // 创建一个映射来快速查找部门
  const deptMap = new Map<number, DataNode & { children: DataNode[] }>();

  // 首先创建所有节点
  deptList.forEach((dept) => {
    deptMap.set(dept.id, {
      key: dept.id.toString(),
      title: dept.name,
      children: [],
      isLeaf: false, // 先假设都不是叶子节点
    });
  });

  // 构建树形结构
  const rootNodes: DataNode[] = [];

  deptList.forEach((dept) => {
    const node = deptMap.get(dept.id);
    if (node) {
      if (
        dept.parentId === 0 ||
        dept.parentId === null ||
        !deptMap.has(dept.parentId)
      ) {
        // 根节点
        rootNodes.push(node);
      } else {
        // 子节点
        const parentNode = deptMap.get(dept.parentId);
        if (parentNode) {
          parentNode.children.push(node);
        }
      }
    }
  });

  // 设置叶子节点标识
  function setLeafStatus(nodes: DataNode[]) {
    nodes.forEach((node) => {
      const nodeWithChildren = node as DataNode & { children: DataNode[] };
      if (nodeWithChildren.children && nodeWithChildren.children.length > 0) {
        nodeWithChildren.isLeaf = false;
        setLeafStatus(nodeWithChildren.children);
      } else {
        nodeWithChildren.isLeaf = true;
      }
    });
  }

  setLeafStatus(rootNodes);

  return rootNodes;
}

export interface TreeEazyFieldNames {
  id: string;
  parentId: string;
  name: string;
  children?: string;
}

function isFlatArray(
  data: any[],
  fieldNames: TreeEazyFieldNames = {
    id: "id",
    parentId: "parentId",
    name: "name",
  },
) {
  // 判断是否为扁平数组（没有children字段或children都为空/不存在）
  const childrenKey = fieldNames.children || "children";
  return data.every(
    (item) =>
      !item[childrenKey] ||
      !Array.isArray(item[childrenKey]) ||
      item[childrenKey].length === 0,
  );
}

function flatToTreeData(
  data: any[],
  fieldNames: TreeEazyFieldNames = {
    id: "id",
    parentId: "parentId",
    name: "name",
  },
): DataNode[] {
  // 通用扁平转tree，支持字段映射
  const idKey = fieldNames.id;
  const parentIdKey = fieldNames.parentId;
  const nameKey = fieldNames.name;
  const nodeMap = new Map<any, any>();
  data.forEach((item) => {
    nodeMap.set(item[idKey], {
      key: String(item[idKey]),
      title: item[nameKey],
      children: [],
      isLeaf: false,
      raw: item,
    });
  });
  const roots: DataNode[] = [];
  data.forEach((item) => {
    const node = nodeMap.get(item[idKey]);
    const parentId = item[parentIdKey];
    if (parentId === 0 || parentId === null || !nodeMap.has(parentId)) {
      roots.push(node);
    } else {
      const parent = nodeMap.get(parentId);
      if (parent) {
        parent.children.push(node);
      }
    }
  });
  // 设置isLeaf
  function setLeaf(nodes: DataNode[]) {
    nodes.forEach((node) => {
      if (node.children && node.children.length > 0) {
        node.isLeaf = false;
        setLeaf(node.children);
      } else {
        node.isLeaf = true;
      }
    });
  }
  setLeaf(roots);
  return roots;
}

function treeDataWithMapping(
  data: any[],
  fieldNames: TreeEazyFieldNames,
): DataNode[] {
  // 已经是树结构，递归映射字段
  const idKey = fieldNames.id;
  const nameKey = fieldNames.name;
  const childrenKey = fieldNames.children || "children";
  return data.map((item) => {
    const children = Array.isArray(item[childrenKey])
      ? treeDataWithMapping(item[childrenKey], fieldNames)
      : undefined;
    return {
      key: String(item[idKey]),
      title: item[nameKey],
      children,
      isLeaf: !children || children.length === 0,
      raw: item,
    };
  });
}

interface TreeEazyProps {
  treeData: any;
  fieldNames?: TreeEazyFieldNames;
}

export const TreeEazy = ({
  treeData,
  fieldNames = {
    id: "id",
    parentId: "parentId",
    name: "name",
  },
}: TreeEazyProps) => {
  const [enableMotion, setEnableMotion] = React.useState(true);

  const transformedTreeData = React.useMemo(() => {
    if (!treeData || !Array.isArray(treeData) || treeData.length === 0)
      return [];
    // 判断是否为扁平数组
    if (isFlatArray(treeData, fieldNames)) {
      return flatToTreeData(treeData, fieldNames);
    } else {
      return treeDataWithMapping(treeData, fieldNames);
    }
  }, [treeData, fieldNames]);

  const ref = useRef<Tree<DataNode>>(null);
  return (
    <Provider motion={enableMotion}>
      <div className="animation">
        <style dangerouslySetInnerHTML={{ __html: STYLE }} />
        <div style={{ display: "flex" }}>
          <div style={{ flex: "1 1 50%" }}>
            <Tree
              switcherIcon={({ expanded, isLeaf }) => {
                if (isLeaf) {
                  return <></>;
                }
                return (
                  <Iconify
                    icon={
                      expanded
                        ? "ic:round-keyboard-arrow-down"
                        : "ic:round-keyboard-arrow-right"
                    }
                  />
                );
              }}
              ref={(e) => {
                ref.current = e;
              }}
              showIcon={false}
              checkable={true}
              defaultExpandAll={false}
              defaultExpandedKeys={defaultExpandedKeys}
              motion={motion}
              treeData={transformedTreeData}
              titleRender={(props) => {
                const { key, ...rest } = props;
                let data = {
                  ...rest,
                  menuKey: key as string,
                };

                return (
                  <TitleRender {...(data as any)} treeRef={ref}></TitleRender>
                );
              }}
            />
          </div>
        </div>
      </div>
    </Provider>
  );
};
