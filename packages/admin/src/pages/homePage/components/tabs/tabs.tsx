import { useFlatInject } from "@/common/hooks";
import useLocationListen from "@/common/hooks/useLocationListen";
import { routerHelper } from "@/services";
import { Tabs } from "antd";
import { useEffect } from "react";
import { useNavigate, type Location } from "react-router-dom";
import styles from "./tabs.module.scss";

const TabsComp  = () => {
	const {
		deleteTabHistoryAct,
		setTableItemsAct,
		setActiveTabKeyAct,
		tabsHistory,
		activeTabKey,
		tabItems,
	} = useFlatInject('appStore')[0];
	const navi = useNavigate()
	useEffect(() => {
		const tabsHistoryArr = Object.values(tabsHistory);
		setTableItemsAct(
			tabsHistoryArr.map((item: Location) => {
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
		setActiveTabKeyAct(location.pathname);
	});
	const onChange = (newActiveKey: string) => {
		setActiveTabKeyAct(newActiveKey);
		navi(newActiveKey)
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
					deleteTabHistoryAct(e as string);
				}
			}}
		/>
	);
};

export default TabsComp
