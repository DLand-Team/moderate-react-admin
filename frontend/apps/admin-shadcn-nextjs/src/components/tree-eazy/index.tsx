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

function getTreeData(
  treeRef: React.RefObject<Tree<DataNode> | null>,
): DataNode[] {
  // big-data: generateData(1000, 3, 2)
  return [
    {
      key: "0",
      title: "node 0",
      children: [
        { key: "0-0", title: "node 0-0" },
        { key: "0-1", title: "node 0-1" },
        {
          key: "0-2",
          title: "node 0-2",
          children: [
            { key: "0-2-0", title: "node 0-2-0", isLeaf: true },
            { key: "0-2-1", title: "node 0-2-1", isLeaf: true },
            { key: "0-2-2", title: "node 0-2-2", isLeaf: true },
          ],
        },
        { key: "0-3", title: "node 0-3", isLeaf: true },
        { key: "0-4", title: "node 0-4", isLeaf: true },
        { key: "0-5", title: "node 0-5", isLeaf: true },
        { key: "0-6", title: "node 0-6", isLeaf: true },
        { key: "0-7", title: "node 0-7", isLeaf: true },
        { key: "0-8", title: "node 0-8", isLeaf: true },
        {
          key: "0-9",
          title: "node 0-9",
          children: [
            { key: "0-9-0", title: "node 0-9-0", isLeaf: true },
            {
              key: "0-9-1",
              title: "node 0-9-1",
              children: [
                {
                  key: "0-9-1-0",
                  title: "node 0-9-1-0",
                  isLeaf: true,
                },
                {
                  key: "0-9-1-1",
                  title: "node 0-9-1-1",
                  isLeaf: true,
                },
                {
                  key: "0-9-1-2",
                  title: "node 0-9-1-2",
                  isLeaf: true,
                },
                {
                  key: "0-9-1-3",
                  title: "node 0-9-1-3",
                  isLeaf: true,
                },
                {
                  key: "0-9-1-4",
                  title: "node 0-9-1-4",
                  isLeaf: true,
                },
              ],
            },
            {
              key: "0-9-2",
              title: "node 0-9-2",
              children: [
                {
                  key: "0-9-2-0",
                  title: "node 0-9-2-0",
                  isLeaf: true,
                },
                {
                  key: "0-9-2-1",
                  title: "node 0-9-2-1",
                  isLeaf: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: "1",
      title: "node 1",
      // children: new Array(1000)
      //   .fill(null)
      //   .map((_, index) => ({ title: `auto ${index}`, key: `auto-${index}` })),
      children: [
        {
          key: "1-0",
          title: "node 1-0",
          children: [
            { key: "1-0-0", title: "node 1-0-0" },
            {
              key: "1-0-1",
              title: "node 1-0-1",
              children: [
                { key: "1-0-1-0", title: "node 1-0-1-0" },
                { key: "1-0-1-1", title: "node 1-0-1-1" },
              ],
            },
            { key: "1-0-2", title: "node 1-0-2" },
          ],
        },
      ],
    },
  ];
}
export const TreeEazy = ({ treeData }: { treeData: any }) => {
  const treeRef = React.useRef<Tree>(null);
  const [enableMotion, setEnableMotion] = React.useState(true);

  // 转换数据格式
  const transformedTreeData = React.useMemo(() => {
    // 如果是 Dept 类型的数组，进行转换
    if (treeData && Array.isArray(treeData) && treeData.length > 0) {
      // 检查是否是 Dept 类型（有 id, name, parentId 属性）
      const firstItem = treeData[0];
      if (
        firstItem &&
        typeof firstItem === "object" &&
        "id" in firstItem &&
        "name" in firstItem &&
        "parentId" in firstItem
      ) {
        return transformDeptToTreeData(treeData as Dept[]);
      }
    }

    // 如果已经是正确的格式或者为空，直接返回
    return treeData;
  }, [treeData]);

  setTimeout(() => {
    if (treeRef.current) {
      treeRef.current.scrollTo({ key: "0-9-2" });
    }
  }, 100);
  const ref = useRef<Tree<DataNode>>(null);
  return (
    <Provider motion={enableMotion}>
      <React.StrictMode>
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
                    key,
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
      </React.StrictMode>
    </Provider>
  );
};
