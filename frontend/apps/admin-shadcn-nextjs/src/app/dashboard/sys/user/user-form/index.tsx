"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { useFlat } from "@/src/service";
import { ModalType } from "@/src/service/stores/sysStore/model";
import { Button } from "@/src/shadcn/components/ui/button";
import { Checkbox } from "@/src/shadcn/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/shadcn/components/ui/form";
import { Input } from "@/src/shadcn/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/shadcn/components/ui/select";

// Zod 验证模式
const userFormSchema = z.object({
  nickname: z.string().min(1, "请输入用户昵称"),
  deptId: z.number().nullable().optional(),
  mobile: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^1[3-9]\d{9}$/.test(val),
      "请输入正确的11位手机号码",
    ),
  email: z
    .string()
    .optional()
    .refine(
      (val) => !val || z.string().email().safeParse(val).success,
      "请输入正确的邮箱",
    ),
  sex: z.number().optional(),
  postIds: z.array(z.number()).optional(),
  remark: z.string().optional(),
});

type UserFormValues = z.infer<typeof userFormSchema>;

interface UserFormProps {
  onSubmit?: (data: UserFormValues) => void;
  onCancel?: () => void;
}

export function UserForm({ onSubmit, onCancel }: UserFormProps) {
  const {
    userModalType,
    setUserModalType,
    setCurrentUser,
    currentUser,
    postList,
    updateUserAct,
    createUserAct,
    queryPostListAct,
  } = useFlat("sysStore");

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      nickname: "",
      deptId: null,
      mobile: "",
      email: "",
      sex: undefined,
      postIds: [],
      remark: "",
    },
  });

  // 获取岗位列表
  useEffect(() => {
    queryPostListAct();
  }, [queryPostListAct]);

  // 设置表单初始值
  useEffect(() => {
    if (currentUser) {
      form.reset({
        nickname: currentUser.nickname || "",
        deptId: currentUser.deptId,
        mobile: currentUser.mobile || "",
        email: currentUser.email || "",
        sex: currentUser.sex,
        postIds: currentUser.postIds || [],
        remark: currentUser.remark || "",
      });
    }
  }, [currentUser, form]);

  const handleSubmit = async (values: UserFormValues) => {
    try {
      if (userModalType === ModalType.EDIT && currentUser) {
        // 编辑用户
        await updateUserAct({ ...currentUser, ...values });
        toast.success("用户更新成功");
      } else {
        // 创建用户
        await createUserAct(values as any);
        toast.success("用户创建成功");
      }

      handleClose();
      onSubmit?.(values);
    } catch (error) {
      toast.error("操作失败，请重试");
    }
  };

  const handleClose = () => {
    setUserModalType(ModalType.NONE);
    form.reset();
    if (userModalType === ModalType.EDIT) {
      setCurrentUser(null);
    }
    onCancel?.();
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* 用户昵称 */}
          <FormField
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>用户昵称</FormLabel>
                <FormControl>
                  <Input placeholder="请输入用户昵称" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 用户电话 */}
          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>用户电话</FormLabel>
                <FormControl>
                  <Input placeholder="请输入11位手机号码" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 邮箱 */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>邮箱</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="请输入邮箱地址" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 用户性别 */}
          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>用户性别</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="请选择性别" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">男</SelectItem>
                    <SelectItem value="0">女</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 岗位 */}
          <FormField
            control={form.control}
            name="postIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>岗位</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {postList.map((post) => (
                      <div
                        key={post.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          checked={field.value?.includes(post.id) || false}
                          onCheckedChange={(checked) => {
                            const currentValue = field.value || [];
                            if (checked) {
                              field.onChange([...currentValue, post.id]);
                            } else {
                              field.onChange(
                                currentValue.filter((id) => id !== post.id),
                              );
                            }
                          }}
                        />
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {post.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 用户备注 */}
          <FormField
            control={form.control}
            name="remark"
            render={({ field }) => (
              <FormItem>
                <FormLabel>用户备注</FormLabel>
                <FormControl>
                  <Input placeholder="请输入用户备注" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 表单按钮 */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              取消
            </Button>
            <Button type="submit">
              {userModalType === ModalType.EDIT ? "更新" : "创建"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default UserForm;
