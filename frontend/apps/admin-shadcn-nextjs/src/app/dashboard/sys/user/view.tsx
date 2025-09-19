"use client";

import useActive from "@/src/common/hooks/useActive";
import { TableEazy } from "@/src/components/table-eazy";
import { TreeEazy } from "@/src/components/tree-eazy";
import { dpChain, useFlat } from "@/src/service";
import { User } from "@/src/service/stores/sysStore/model";
import { Button } from "@/src/shadcn/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/shadcn/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

const UserView = () => {
  const { userList, userPagination, queryUserListAct, setUserPagination } =
    useFlat("sysStore", {
      userList: "IN",
      userPagination: "IN",
    });

  const { queryDeptListAct, deptList, setCurrentDeptId } = useFlat("sysStore", {
    deptList: "IN",
  });

  const [selectedDeptId, setSelectedDeptId] = useState<number | null>(null);

  useActive({
    onFirstActive() {
      queryUserListAct();
      queryDeptListAct();
    },
  });

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "用户编号",
      cell: ({ row }) => <div>{row.original.id}</div>,
    },
    {
      accessorKey: "username",
      header: "用户名称",
      cell: ({ row }) => <div>{row.original.username}</div>,
    },
    {
      accessorKey: "nickname",
      header: "用户昵称",
      cell: ({ row }) => <div>{row.original.nickname}</div>,
    },
    {
      accessorKey: "mobile",
      header: "手机号码",
      cell: ({ row }) => <div>{row.original.mobile}</div>,
    },
    {
      accessorKey: "deptName",
      header: "部门",
      cell: ({ row }) => <div>{row.original.deptName}</div>,
    },
    {
      accessorKey: "status",
      header: "状态",
      cell: ({ row }) => {
        // 假设有 Switch 组件，如果没有可以用 checkbox 或其他组件替代
        return <div>{row.original.status === 0 ? "启用" : "禁用"}</div>;
      },
    },
    {
      id: "action",
      header: "操作",
      cell: ({ row }) => {
        const record = row.original;
        let newPassword = "";

        return (
          <div style={{ display: "flex", gap: "8px" }}>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                await dpChain("sysStore").queryUserAct({
                  id: record.id,
                });
                // dpChain("sysStore").setUserModalType(ModalType.EDIT);
              }}
            >
              修改
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                  更多
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    dpChain("sysStore").queryUserAct({
                      id: record.id,
                    });
                    // dpChain("sysStore").setUserModalType(ModalType.ROLE);
                  }}
                >
                  分配角色
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    // 重置密码逻辑
                    // Modal.confirm 的替代实现可以用 AlertDialog
                  }}
                >
                  重置密码
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    // 删除逻辑
                    // Modal.confirm 的替代实现可以用 AlertDialog
                    dpChain("sysStore").deleteUserAct({
                      id: record.id,
                    });
                  }}
                >
                  删除
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  // 处理部门选择
  const handleDeptSelect = (deptId: number) => {
    setSelectedDeptId(deptId);
    // 根据部门ID筛选用户
    // queryUserListAct({ deptId });
  };

  return (
    <div className="flex h-full gap-4">
      {/* 左侧部门树 */}
      <div className="w-80 border-r pr-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">部门结构</h3>
        </div>
        <TreeEazy treeData={deptList || []} />
      </div>

      {/* 右侧用户列表 */}
      <div className="flex-1">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">
            用户列表
            {selectedDeptId && (
              <span className="text-sm text-muted-foreground ml-2">
                (部门ID: {selectedDeptId})
              </span>
            )}
          </h3>
        </div>
        <TableEazy<User>
          columns={columns}
          data={userList || []}
          isShowSelection
        />
      </div>
    </div>
  );
};

export default UserView;
