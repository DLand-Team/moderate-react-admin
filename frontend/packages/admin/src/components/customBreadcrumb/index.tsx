import { Breadcrumb } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { Location } from "react-router-dom";
import useLocationListen from "src/common/hooks/useLocationListen";
import { ROUTE_ID_KEY } from "src/router";
import { useFlat } from "src/service";
import { routerHelper } from "src/service";

const CustomBreadcrumb = () => {
	const [infoArr, setInfoArr] = useState<
		{ id: string; title: string | JSX.Element }[]
	>([]);
	const { language } = useFlat("appStore");
	const { t } = useTranslation();
	useLocationListen(
		(location: Location) => {
			const { pathname } = location;
			const pathArr = pathname.split("/").filter((item) => {
				return item;
			});
			const temp2 = pathArr.map((path: string, index) => {
				const { meta, path: pathStr } =
					routerHelper.getRoutItemConfigById(path as ROUTE_ID_KEY) ||
					{};
				return {
					id: path,
					title:
						index == pathArr.length - 1 ? (
							t(meta?.title || "")
						) : (
							<a
								target="_blank"
								rel="noopener noreferrer"
								onClick={() => {
									pathStr &&
										routerHelper.jumpToIndexChild(
											path as ROUTE_ID_KEY,
										);
								}}
							>
								{t(meta?.title || "")}
							</a>
						),
				};
			});
			setInfoArr(
				temp2.filter((item) => {
					return item.title;
				}),
			);
		},
		[language],
	);

	return (
		<Breadcrumb
			items={infoArr}
			style={{ margin: "16px 10px" }}
		></Breadcrumb>
	);
};

export default CustomBreadcrumb;
