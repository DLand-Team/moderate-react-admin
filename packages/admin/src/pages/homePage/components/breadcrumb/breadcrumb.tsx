import { Breadcrumb } from "antd";
import { useState } from "react";
import type { Location } from "react-router-dom";
import useLocationListen from "src/common/hooks/useLocationListen";
import { ROUTE_ID_KEY } from "src/config/types";
import { RouterHelper } from "src/reduxService/helper";

const BreadcrumbComp = () => {
	const [infoArr, setInfoArr] = useState<{ id: string; title: string }[]>([]);
	useLocationListen((location: Location) => {
		const { pathname } = location;
		const pathArr = pathname.split("/").filter((item) => {
			return item;
		});
		const temp2 = pathArr.map((path: string) => {
			const info = RouterHelper.getRouteTitleByKey(path as ROUTE_ID_KEY);
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
