"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/shadcn/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { routerHelper } from "@/src/service";
import React from "react";

// 可根据实际项目维护路径中文映射
const pathNameMap: Record<string, string> = {
  components: "组件",
  ui: "界面",
  "button.tsx": "按钮",
  dashboard: "dashboard",
  sys: "sys",
  user: "user",
  // ...补充其他映射
};

function prettify(name: string) {
  // 如果有中文映射就用，没有就原样
  return pathNameMap[name] || name;
}

export default function DynamicBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    // 根路径时不显示面包屑
    return null;
  }

  let path = "";
  const breadcrumbs = segments.map((segment, idx) => {
    path += "/" + segment;
    return {
      name: prettify(segment),
      href: path,
      isLast: idx === segments.length - 1,
    };
  });

  const handleClick =
    (href: string, isLast: boolean) => (e: React.MouseEvent) => {
      e.preventDefault();
      if (!isLast) {
        routerHelper.push(href);
      }
    };

  return (
    <Breadcrumb>
      <BreadcrumbList className="flex items-center space-x-1">
        {breadcrumbs.map((item, i) => (
          <React.Fragment key={item.href}>
            <BreadcrumbItem className="flex items-center">
              {item.isLast ? (
                <BreadcrumbPage className="font-semibold text-neutral-900">
                  {item.name}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  onClick={handleClick(item.href, item.isLast)}
                  className="text-neutral-500 hover:text-neutral-700 transition-colors cursor-pointer"
                >
                  {item.name}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {i < breadcrumbs.length - 1 && (
              <BreadcrumbSeparator className="mx-1 text-neutral-300 text-base flex items-center" />
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
