"use client";

import useActive from "@/src/common/hooks/useActive";
import { TableEazy } from "@/src/components/table-eazy";
import { dpChain, useFlat } from "@/src/service";
import { Role, RoleModalType } from "@/src/service/stores/sysStore/model";
import { Badge } from "@/src/shadcn/components/ui/badge";
import { Button } from "@/src/shadcn/components/ui/button";
import { Checkbox } from "@/src/shadcn/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/shadcn/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { MoreHorizontal } from "lucide-react";

const RoleView = () => {
  const { roleList, rolePagination, queryRoleListAct, setRolePagination } =
    useFlat("sysStore", {
      roleList: "IN",
      rolePagination: "IN",
    });

  useActive({
    onFirstActive() {
      queryRoleListAct();
    },
  });

  const columns: ColumnDef<Role>[] = [
    {
      accessorKey: "id",
      header: "角色编号",
      cell: ({ row }) => <div>{row.original.id}</div>,
    },
    {
      accessorKey: "name",
      header: "角色名称",
      cell: ({ row }) => <div>{row.original.name}</div>,
    },
    {
      accessorKey: "type",
      header: "角色类型",
      cell: ({ row }) => {
        const type = row.original.type;
        return (
          <Badge variant={type === 1 ? "default" : "secondary"}>
            {type === 1 ? "内置" : "自定义"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "code",
      header: "角色标识",
      cell: ({ row }) => <div>{row.original.code}</div>,
    },
    {
      accessorKey: "sort",
      header: "显示顺序",
      cell: ({ row }) => <div>{row.original.sort}</div>,
    },
    {
      accessorKey: "remark",
      header: "备注",
      cell: ({ row }) => <div>{row.original.remark}</div>,
    },
    {
      accessorKey: "status",
      header: "状态",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <div className="flex items-center gap-2">
            <Checkbox checked={status === 0} />
            <span>{status === 0 ? "开启" : "关闭"}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "createTime",
      header: "创建时间",
      cell: ({ row }) => {
        const createTime = row.original.createTime;
        return <div>{dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")}</div>;
      },
    },
    {
      id: "action",
      header: "操作",
      cell: ({ row }) => {
        const record = row.original;

        const handleClick = (type: RoleModalType) => {
          dpChain("sysStore").queryRoleAct({
            id: record.id,
          });
          dpChain("sysStore").setRoleModalType(type);
          if (type === RoleModalType.NONE) {
            dpChain("sysStore").setCurrentRole(null);
          }
        };

        return (
          <div style={{ display: "flex", gap: "8px" }}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleClick(RoleModalType.EDIT)}
            >
              编辑
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
                  onClick={() => handleClick(RoleModalType.MENU)}
                >
                  菜单权限
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleClick(RoleModalType.DATA)}
                >
                  数据权限
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
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
  return (
    <div>
      <TableEazy<Role>
        columns={columns}
        data={roleList || []}
        isShowSelection
      />
    </div>
  );
};

export default RoleView;
