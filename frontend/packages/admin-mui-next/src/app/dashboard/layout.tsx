import { DashboardLayout } from "@/layouts";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
	return <DashboardLayout>{children}</DashboardLayout>;
}
