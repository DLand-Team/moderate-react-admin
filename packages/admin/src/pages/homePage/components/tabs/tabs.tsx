import { Tabs } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocationListen from "src/common/hooks/useLocationListen";
import { useFlat } from "src/reduxService";
import { RouterHelper } from "src/reduxService/helper";
import { TabItem } from "src/reduxService/stores/appStore/modal";
import styles from "./tabs.module.scss";
import { ROUTE_ID_KEY } from "src/config/types";
import { ROUTE_ID } from "src/config/routerConfig";

const TabsComp = () => {
	const {
		deleteTabHistoryAct,
		setTabItems,
		setActiveTabKey,
		tabsHistory,
		activeTabKey,
		tabItems,
		addTabHistoryActionAct,
	} = useFlat("appStore");
	const navi = useNavigate();
	useEffect(() => {
		const tabsHistoryArr = Object.values(tabsHistory);
		setTabItems(
			tabsHistoryArr
				.map((item) => {
					const { pathname } = item;
					const id = pathname.split("/").slice(-1)[0];
					return {
						label: RouterHelper.getRouteTitleByKey(
							id as ROUTE_ID_KEY,
						),
						key: pathname,
					} as TabItem;
				})
				.filter((item) => {
					return item.label;
				}),
		);
	}, [tabsHistory]);
	useLocationListen((location) => {
		// const data = RouterHelper.getRoutItemConfigById(
		// 	location.pathname.split("/").slice(-1)[0] as ROUTE_ID_KEY,
		// );
		// if (data?.depands) {
		// 	const temp = data?.path!?.split("/").slice(0, -1).join("/");
		// 	;
		// 	if (!(temp in tabsHistory)) {
		// 		addTabHistoryActionAct({
		// 			newItem: { ...location, pathname: temp },
		// 		});
		// 		setActiveTabKey(temp);
		// 	}
		// } else {
		// 	addTabHistoryActionAct({ newItem: location });
		// 	setActiveTabKey(location.pathname);
		// }
		if (!location.pathname.includes("notFund")) {
			addTabHistoryActionAct({ newItem: location });
			setActiveTabKey(location.pathname);
		}
	});
	const onChange = (newActiveKey: string) => {
		setActiveTabKey(newActiveKey);
		navi(newActiveKey);
	};

	return (
		<Tabs
			className={styles.content}
			type="editable-card"
			onChange={onChange}
			activeKey={activeTabKey}
			items={tabItems}
			hideAdd={true}
			onEdit={(e, action) => {
				if (action === "remove") {
					if (Object.values(tabsHistory).length > 1) {
						deleteTabHistoryAct({
							pathName: e as string,
						});

						if (activeTabKey == e) {
							const routeId =
								RouterHelper.getRouteIdByPath(activeTabKey);
							const routeItemData =
								RouterHelper.getRoutItemConfigById(
									routeId as ROUTE_ID_KEY,
								);
							if (routeItemData.depands) {
								RouterHelper.jumpTo(
									routeItemData.parentId as ROUTE_ID_KEY,
								);
							} else {
								const item = Object.values(tabsHistory).find(
									(item) => {
										return item.pathname !== e;
									},
								);
								item &&
									RouterHelper.jumpToByPath(item?.pathname);
							}
						}
					}
				}
			}}
		/>
	);
};

export default TabsComp;
