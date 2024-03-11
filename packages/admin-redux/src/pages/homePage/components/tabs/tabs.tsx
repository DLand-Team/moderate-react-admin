import useLocationListen from "@/common/hooks/useLocationListen";
import { routerHelper, useFlat } from "@/reduxService";
import { Tabs } from "antd";
import { useEffect } from "react";
import { useNavigate, type Location } from "react-router-dom";
import styles from "./tabs.module.scss";

const TabsComp = () => {
	const {
		deleteTabHistoryAct,
		setTabItems,
		setActiveTabKey,
		tabsHistory,
		activeTabKey,
		tabItems,
	} = useFlat("appStore");
	const navi = useNavigate();
	useEffect(() => {
		const tabsHistoryArr = Object.values(tabsHistory);
		setTabItems(
			tabsHistoryArr.map((item) => {
				const { pathname } = item;
				const id = pathname.split("/").slice(-1)[0];
				return {
					label: routerHelper.getRouteTitleByKey(id),
					key: pathname,
				};
			}),
		);
	}, [tabsHistory]);
	useLocationListen((location) => {
		setActiveTabKey(location.pathname);
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
					deleteTabHistoryAct({
						pathName: e as string,
					});
				}
			}}
		/>
	);
};

export default TabsComp;
