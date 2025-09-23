"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/src/components/modal/alert-dialog";
import { Button } from "@/src/shadcn/components/ui/button";
import { useFlat } from "@/src/service";
import { ModalType } from "@/src/service/stores/sysStore/model";
import { UserForm } from "./index";

export function UserFormModal() {
  const { userModalType, setUserModalType } = useFlat("sysStore");

  const isOpen = userModalType !== ModalType.NONE;

  const handleClose = () => {
    setUserModalType(ModalType.NONE);
  };

  const getTitle = () => {
    switch (userModalType) {
      case ModalType.ADD:
        return "添加用户";
      case ModalType.EDIT:
        return "编辑用户";
      default:
        return "用户管理";
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>{getTitle()}</AlertDialogTitle>
        </AlertDialogHeader>
        <UserForm onCancel={handleClose} />
      </AlertDialogContent>
    </AlertDialog>
  );
}

// 使用示例组件
export function UserFormExample() {
  const { setUserModalType, setCurrentUser } = useFlat("sysStore");

  const handleAddUser = () => {
    setCurrentUser(null);
    setUserModalType(ModalType.ADD);
  };

  const handleEditUser = () => {
    // 假设有当前用户数据
    const mockUser = {
      id: 1,
      nickname: "测试用户",
      mobile: "13800138000",
      email: "test@example.com",
      sex: 1,
      deptId: 1,
      postIds: [1, 2],
      remark: "测试备注",
      avatar: "",
      createTime: Date.now(),
      deptName: "技术部",
      loginDate: Date.now(),
      loginIp: "127.0.0.1",
      status: 1,
      username: "testuser",
    };
    setCurrentUser(mockUser);
    setUserModalType(ModalType.EDIT);
  };

  return (
    <div className="space-x-2">
      <Button onClick={handleAddUser}>添加用户</Button>
      <Button variant="outline" onClick={handleEditUser}>
        编辑用户
      </Button>
      <UserFormModal />
    </div>
  );
}