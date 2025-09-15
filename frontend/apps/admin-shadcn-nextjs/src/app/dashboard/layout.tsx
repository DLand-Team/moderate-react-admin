import DynamicBreadcrumb from "@/src/components/bread";
import { AppSidebar } from "@/src/shadcn/components/app-sidebar";
import { Separator } from "@/src/shadcn/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/src/shadcn/components/ui/sidebar";
import { PropsWithChildren } from "react";
import TabNav from "src/components/tab-nav";
import KeepAlive from "../../router/keep-alive";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <DynamicBreadcrumb />
        </header>
        <TabNav />
        {/* padding */}
        <div className="p-6">
          <KeepAlive>{children}</KeepAlive>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
