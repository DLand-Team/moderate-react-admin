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
import { useFlat } from "src/service";
import { MenuPermissionItem } from "src/service/stores/authStore/model";
import { IconListDetails } from "@tabler/icons-react";
import { SearchForm } from "./search-form";
import { VersionSwitcher } from "./version-switcher";

// This is sample data.
const data = {
	tree: [
		[
			"app",
			[
				"api",
				["hello", ["route.ts"]],
				"page.tsx",
				"layout.tsx",
				["blog", ["page.tsx"]],
			],
		],
		[
			"components",
			["ui", "button.tsx", "card.tsx"],
			"header.tsx",
			"footer.tsx",
		],
		["lib", ["util.ts"]],
		["public", "favicon.ico", "vercel.svg"],
		".eslintrc.json",
		".gitignore",
		"next.config.js",
		"tailwind.config.js",
		"package.json",
		"README.md",
	],
};

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
	const { name, children } = item;

	if (!children?.length) {
		return (
			<SidebarMenuButton
				isActive={name === "button.tsx"}
				className="data-[active=true]:bg-transparent"
			>
				{name}
			</SidebarMenuButton>
		);
	}

	return (
		<SidebarMenuItem>
			<Collapsible
				className="group/collapsible"
				defaultOpen={name === "components" || name === "ui"}
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
