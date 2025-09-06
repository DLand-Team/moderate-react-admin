"use client";
import { ChevronRight } from "lucide-react";
import * as React from "react";

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/src/shadcn/components/ui/collapsible";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarRail,
} from "@/src/shadcn/components/ui/sidebar";
import { IconListDetails } from "@tabler/icons-react";
import { routerHelper, useFlat } from "src/service";
import { MenuPermissionItem } from "src/service/stores/authStore/model";
import { cn } from "../lib/utils";
import { SearchForm } from "./search-form";
import { VersionSwitcher } from "./version-switcher";

export function isMenuExpanded(
	menu: MenuPermissionItem,
	selectedIds: Set<any>,
): boolean {
	// 递归终止条件：没有子菜单
	if (!menu.children || menu.children.length === 0) {
		return false;
	}

	// 如果有任何一个子菜单被选中或需要展开，则当前菜单需要展开
	for (const child of menu.children) {
		if (
			selectedIds.has(
				child.componentName?.replace(/Page$/, "").toLowerCase(),
			) ||
			isMenuExpanded(child, selectedIds)
		) {
			return true;
		}
	}

	return false;
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { menuPermissions } = useFlat("authStore");

	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<VersionSwitcher
					versions={["租户1", "租户2", "租户3"]}
					defaultVersion={"1.0.1"}
				/>
				<SearchForm />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{menuPermissions!?.map((item, index) => (
								<Tree key={index} item={item} />
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	);
}

function Tree({ item }: { item: MenuPermissionItem }) {
	const { currentRouteUrl } = useFlat("appStore");
	const { name, children } = item;

	if (!children?.length) {
		return (
			<SidebarMenuButton
				isActive={
					routerHelper.getRouteConfigByUrl(currentRouteUrl)?.id ==
					item.componentName?.replace(/Page$/, "").toLowerCase()
				}
				className={cn(
					"data-[active=true]:bg-transparent",
					"data-[active=true]:bg-blue-100",
				)}
				onClick={() => {
					const { componentName } = item;
					// componentName转换为路由id，小写并且去掉末尾的Page
					const routeId = componentName
						.replace(/Page$/, "")
						.toLowerCase();
					routerHelper.junpTo(routeId);
				}}
			>
				{name}
			</SidebarMenuButton>
		);
	}
	const [isOpen, setIsOpen] = React.useState(false);
	React.useEffect(() => {
		setIsOpen(
			isMenuExpanded(
				item,
				new Set([
					routerHelper.getRouteConfigByUrl(currentRouteUrl)?.id,
				]),
			),
		);
	}, [currentRouteUrl]);

	return (
		<SidebarMenuItem>
			<Collapsible
				className="group/collapsible"
				open={isOpen}
				onOpenChange={() => {
					setIsOpen(!isOpen);
				}}
			>
				<CollapsibleTrigger asChild>
					<SidebarMenuButton tooltip={name}>
						<IconListDetails />
						{/* {item.icon ? <item.icon /> : <Folder />} */}
						<span>{name}</span>
						<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
					</SidebarMenuButton>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<SidebarMenuSub>
						{children.map((subItem, index) => (
							<Tree key={index} item={subItem} />
						))}
					</SidebarMenuSub>
				</CollapsibleContent>
			</Collapsible>
		</SidebarMenuItem>
	);
}
