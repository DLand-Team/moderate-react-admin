"use client";

import useActive from "@/src/common/hooks/useActive";
import { TableEazy } from "@/src/components/table-eazy";
import { useFlat } from "@/src/service";
import { MenuItem } from "@/src/service/stores/sysStore/model";
import { Button } from "@/src/shadcn/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

const MenuView = () => {
  const { getMenuListAct, menuTreeData } = useFlat("sysStore");
  useActive({
    onActive(isFirst) {
      if (isFirst) {
        console.log("首次显示");
        getMenuListAct();
      } else {
        console.log("再次显示");
      }
    },
  });

  const columns: ColumnDef<MenuItem>[] = [
    {
      header: "前端i18n",
      accessorKey: "name",
    },
    {
      accessorKey: "componentName",
      header: "路由名称",
      cell: ({ row }) => <div>{row.original.componentName}</div>,
    },
    {
      accessorKey: "permission",
      header: "权限标识",
      cell: ({ row }) => <div>{row.original.permission}</div>,
    },
    {
      accessorKey: "status",
      header: "状态",
      // cell: ({ row }) => <Switch checked={row.original.status === 0} />,
    },
    {
      id: "action",
      header: "操作",
      cell: ({ row }) => {
        const record = row.original;
        return (
          <div style={{ display: "flex", gap: "8px", width: "100px" }}>
            <Button
              variant={"outline"}
              onClick={async () => {
                //   dpChain("authStore").getMenuDataAct({ id: record.id });
                //   dpChain("authStore").setModalType("edit");
              }}
            >
              修改
            </Button>
            <Button
              variant={"outline"}
              onClick={() => {
                //   dpChain("authStore").setModalType("add");
                //   dpChain("authStore").setCurrentEditMenuData({
                //     parentId: record.id,
                //   });
              }}
            >
              新增
            </Button>
            <Button
              variant={"outline"}
              onClick={() => {
                //   Modal.confirm({
                //     title: "系统提示",
                //     content: "是否删除选中数据",
                //     onOk() {
                //       dpChain("authStore").deleteMenuAct({ id: record.id });
                //     },
                //   });
              }}
            >
              删除
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <TableEazy<MenuItem>
        columns={columns}
        data={menuTreeData || []}
        isShowExpand
        isShowSelection
        isTreeTable
      />
    </div>
  );
};

export default MenuView;
