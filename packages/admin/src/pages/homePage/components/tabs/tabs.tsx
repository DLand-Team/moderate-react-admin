import { Tabs } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocationListen from "src/common/hooks/useLocationListen";
import { useFlat } from "src/reduxService";
import { RouterHelper } from "src/reduxService/helper";
import { TabItem } from "src/reduxService/stores/appStore/modal";
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
			tabsHistoryArr
				.map((item) => {
					const { pathname } = item;
					const id = pathname.split("/").slice(-1)[0];
					return {
						label: RouterHelper.getRouteTitleByKey(id),
						key: pathname,
					} as TabItem;
				})
				.filter((item) => {
					return item.label;
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
