"use client";

import useActive from "@/src/common/hooks/useActive";
import { TableEazy } from "@/src/components/table-eazy";
import { TreeEazy } from "@/src/components/tree-eazy";
import { appHelper, dpChain, useFlat } from "@/src/service";
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
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/src/shadcn/components/ui/sheet";
import { Menu } from "lucide-react";

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useActive({
    onFirstActive() {
      queryUserListAct();
      queryDeptListAct();
    },
  });

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "id",
      header: "编号",
      cell: ({ row }) => <div className="font-medium">{row.original.id}</div>,
      meta: {
        className: "w-16 sm:w-20",
      },
    },
    {
      accessorKey: "username",
      header: "用户名",
      cell: ({ row }) => (
        <div className="font-medium truncate max-w-24 sm:max-w-none">
          {row.original.username}
        </div>
      ),
    },
    {
      accessorKey: "nickname",
      header: "昵称",
      cell: ({ row }) => (
        <div className="truncate max-w-20 sm:max-w-none">
          {row.original.nickname}
        </div>
      ),
      meta: {
        className: "hidden sm:table-cell",
      },
    },
    {
      accessorKey: "mobile",
      header: "手机号",
      cell: ({ row }) => (
        <div className="truncate max-w-24 sm:max-w-none">
          {row.original.mobile}
        </div>
      ),
      meta: {
        className: "hidden md:table-cell",
      },
    },
    {
      accessorKey: "deptName",
      header: "部门",
      cell: ({ row }) => (
        <div className="truncate max-w-20 sm:max-w-none">
          {row.original.deptName}
        </div>
      ),
      meta: {
        className: "hidden lg:table-cell",
      },
    },
    {
      accessorKey: "status",
      header: "状态",
      cell: ({ row }) => (
        <div>
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              row.original.status === 0
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {row.original.status === 0 ? "启用" : "禁用"}
          </span>
        </div>
      ),
      meta: {
        className: "hidden sm:table-cell",
      },
    },
    {
      id: "action",
      header: "操作",
      cell: ({ row }) => {
        const record = row.original;

        return (
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2 text-xs sm:px-3 sm:text-sm"
              onClick={async () => {
                // await dpChain("sysStore").queryUserAct({
                //   id: record.id,
                // });
                appHelper.showModal({
                  Content: () => {
                    return <div>123123{record.username}</div>;
                  },
                  Header() {
                    return <div>修改用户</div>;
                  },
                  Footer({ closeModal }) {
                    return (
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={({}) => {
                            closeModal();
                          }}
                        >
                          取消
                        </Button>
                        <Button
                          onClick={() => {
                            closeModal();
                          }}
                        >
                          保存
                        </Button>
                      </div>
                    );
                  },
                })
                appHelper.showModal({
                  Content: () => {
                    return <div>修改用户 - {record.username}</div>;
                  },
                  Header() {
                    return <div>修改用户</div>;
                  },
                  Footer({ closeModal }) {
                    return (
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={({}) => {
                            closeModal();
                          }}
                        >
                          取消
                        </Button>
                        <Button
                          onClick={() => {
                            closeModal();
                          }}
                        >
                          保存
                        </Button>
                      </div>
                    );
                  },
                });

                // dpChain("sysStore").setUserModalType(ModalType.EDIT);
              }}
            >
              <span className="hidden sm:inline">修改</span>
              <span className="sm:hidden">改</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
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
      meta: {
        className: "w-20 sm:w-24",
      },
    },
  ];

  // 处理部门选择
  const handleDeptSelect = (deptId: number) => {
    setSelectedDeptId(deptId);
    setIsMobileMenuOpen(false); // 移动端选择后关闭菜单
    // 根据部门ID筛选用户
    // queryUserListAct({ deptId });
  };

  // 部门树组件
  const DeptTreeComponent = () => (
    <div className="h-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">部门结构</h3>
      </div>
      <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
        <TreeEazy treeData={deptList || []} />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row h-full gap-4 p-4">
      {/* 移动端部门菜单按钮 */}
      <div className="lg:hidden mb-4">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
            >
              <Menu className="h-4 w-4 mr-2" />
              选择部门
              {selectedDeptId && (
                <span className="ml-2 text-xs text-muted-foreground">
                  (已选择)
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-4">
            <DeptTreeComponent />
          </SheetContent>
        </Sheet>
      </div>

      {/* 桌面端左侧部门树 */}
      <div className="hidden lg:block w-80 border-r pr-4 flex-shrink-0">
        <DeptTreeComponent />
      </div>

      {/* 右侧用户列表 */}
      <div className="flex-1 min-w-0">
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
        <div className="overflow-x-auto">
          <TableEazy<User>
            columns={columns}
            data={userList || []}
            isShowSelection
          />
        </div>
      </div>
    </div>
  );
};

export default UserView;
