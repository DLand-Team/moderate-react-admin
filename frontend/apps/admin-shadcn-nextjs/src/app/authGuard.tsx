"use client";
import { useRouter } from "@bprogress/next";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import { useFlat } from "src/service";

const excludeRoutePath = ["/login"];

const AuthGuard = ({ children }: PropsWithChildren) => {
	const { token, getUserPermissionsAct } = useFlat("authStore");
	const router = useRouter();
	const pathName = usePathname();
	useEffect(() => {
		if (token) {
			if (!pathName.includes("dashboard")) {
				router.push("/dashboard");
			}
			getUserPermissionsAct();
		} else {
			// 排除不鉴登录，直接放行的路由
			if (excludeRoutePath.includes(pathName)) {
				return;
			}
			router.push("/login");
		}
	}, [token]);
	return <>{children}</>;
};
export default AuthGuard;
