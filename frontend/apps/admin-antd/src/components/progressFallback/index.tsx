import nProgress from "nprogress";
import { useEffect } from "react";

// 专用于懒加载路由Suspense的loading
const ProgressFallback = () => {
	useEffect(() => {
		nProgress.start();
		return () => {
			nProgress.done();
		};
	}, []);
	return <div></div>;
};

export default ProgressFallback;
