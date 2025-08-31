"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

export function VersionSwitcher({
	versions,
	defaultVersion,
}: {
	versions: string[];
	defaultVersion: string;
}) {
	const [selectedVersion, setSelectedVersion] = React.useState("租户1");

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
								<img
									style={{
										width: "26px",
										height: "26px",
									}}
									src={"/logo.png"}
								></img>
							</div>
							<div className="flex flex-col gap-0.5 leading-none">
								<span className="font-medium">Dland</span>
								<span className="">v1.0.1</span>
							</div>
							<ChevronsUpDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width)"
						align="start"
					>
						{versions.map((version) => (
							<DropdownMenuItem
								key={version}
								onSelect={() => setSelectedVersion(version)}
							>
								{version}{" "}
								{version === selectedVersion && (
									<Check className="ml-auto" />
								)}
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
