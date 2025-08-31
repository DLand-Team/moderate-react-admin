"use client";
import { emit, useFlat } from "@/service";
import { useRouter } from "@bprogress/next";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import RiveLoading from "./login/riveLoading";

const excludeRoutePath = ["/login"];

const AuthGuard = ({ children }: PropsWithChildren) => {
	const { isLoading } = useFlat("appStore");
	const { token, getUserPermissionsAct } = useFlat("authStore");
	const router = useRouter();
	const pathName = usePathname();
	useEffect(() => {
		if (token) {
			if (!pathName.includes("dashboard")) {
				router.push("/dashboard");
			}
			debugger;
			getUserPermissionsAct();
		} else {
			// 排除不鉴登录，直接放行的路由
			if (excludeRoutePath.includes(pathName)) {
				return;
			}
			router.push("/login");
		}
	}, [token]);
	return (
		<>
			{children}
			{isLoading && (
				<div className="loading g-glossy">
					<RiveLoading />
				</div>
			)}
		</>
	);
};
export default AuthGuard;
