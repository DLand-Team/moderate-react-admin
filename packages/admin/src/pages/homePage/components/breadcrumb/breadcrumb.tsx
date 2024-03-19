import { Breadcrumb } from "antd";
import { useState } from "react";
import type { Location } from "react-router-dom";
import useLocationListen from "src/common/hooks/useLocationListen";
import { RouterHelper } from "src/reduxService/helper/routerHelper";

const BreadcrumbComp = () => {
	const [infoArr, setInfoArr] = useState<{ id: string; title: string }[]>([]);
	useLocationListen((location: Location) => {
		const { pathname } = location;
		const pathArr = pathname.split("/").filter((item) => {
			return item;
		});
		const temp2 = pathArr.map((path: string) => {
			const info = RouterHelper.getRouteTitleByKey(path);
			return {
				id: path,
				title: info || "",
			};
		});
		setInfoArr(temp2);
	});

	return (
		<Breadcrumb items={infoArr} style={{ margin: "16px 0" }}></Breadcrumb>
	);
};

export default BreadcrumbComp;
