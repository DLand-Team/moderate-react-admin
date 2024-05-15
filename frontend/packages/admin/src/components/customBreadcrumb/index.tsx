import { Breadcrumb } from "antd";
import { useState } from "react";
import type { Location } from "react-router-dom";
import useLocationListen from "src/common/hooks/useLocationListen";
import { RouterHelper } from "src/service/helper";
import { ROUTE_ID_KEY } from "src/router/types";
import { useFlat } from "src/service";
import { useTranslation } from "react-i18next";

const CustomBreadcrumb = () => {
	const [infoArr, setInfoArr] = useState<{ id: string; title: string }[]>([]);
	const { language } = useFlat("appStore");
	const { t } = useTranslation();
	useLocationListen(
		(location: Location) => {
			const { pathname } = location;
			const pathArr = pathname.split("/").filter((item) => {
				return item;
			});
			const temp2 = pathArr.map((path: string) => {
				const info = RouterHelper.getRouteTitleByKey(
					path as ROUTE_ID_KEY,
				);
				return {
					id: path,
					title: t(info!) || "",
				};
			});
			setInfoArr(temp2);
		},
		[language],
	);

	return (
		<Breadcrumb items={infoArr} style={{ margin: "16px 0" }}></Breadcrumb>
	);
};

export default CustomBreadcrumb;
