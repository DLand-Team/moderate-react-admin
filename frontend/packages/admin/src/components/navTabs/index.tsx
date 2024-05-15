import { Tabs } from "antd";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useNavigate } from "react-router-dom";
import useLocationListen from "src/common/hooks/useLocationListen";
import { useFlat } from "src/service";
import { AppHelper, RouterHelper } from "src/service/helper";
import { TabItem } from "src/service/stores/appStore/modal";
import { ROUTE_ID } from "src/router/name";
import { ROUTE_ID_KEY } from "src/router/types";
import Card from "./card";
import { useTranslation } from "react-i18next";

const NavTabs = () => {
	const [_, setDragId] = useState<string>();
	const {
		setTabItems,
		setActiveTabKey,
		tabsHistory,
		setTabsHistory,
		activeTabKey,
		tabItems,
		language,
		addTabHistoryActionAct,
	} = useFlat("appStore");
	const navi = useNavigate();
	const { t } = useTranslation();
	useEffect(() => {
		const tabsHistoryArr = tabsHistory;
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
				.map((item) => {
					if (item.label) {
						item.label = t(item.label);
					}
					return item;
				})
				.filter((item) => {
					return item.label;
				}),
		);
	}, [tabsHistory, language]);
	useLocationListen((location) => {
		// 该监听目的监听路由改变进行存储，实现tab数据的设置
		// 仅仅针对homePage的菜单进行存储，排除notFund即可
		if (
			![ROUTE_ID.NotFundPage].includes(
				RouterHelper.getRouteParentIdByPath(location.pathname),
			)
		) {
			addTabHistoryActionAct({ newItem: location });
			setActiveTabKey(location.pathname);
		}
	});
	const onChange = (newActiveKey: string) => {
		setActiveTabKey(newActiveKey);
		navi(newActiveKey);
	};

	const onDragEnd = (dragIndex: number, hoverIndex: number) => {
		const tabsHistoryTemp = [...tabsHistory];
		const temp = tabsHistoryTemp[dragIndex];
		tabsHistoryTemp[dragIndex] = tabsHistoryTemp[hoverIndex];
		tabsHistoryTemp[hoverIndex] = temp;
		setTabsHistory(tabsHistoryTemp);
	};
	return (
		<>
			<Tabs
				type="editable-card"
				onChange={onChange}
				items={tabItems}
				hideAdd={true}
				onEdit={(e, action) => {
					if (action === "remove") {
						AppHelper.closeTabByPath({
							pathName: e as string,
						});
					}
				}}
				activeKey={activeTabKey}
				renderTabBar={(tabBarProps, DefaultTabBar) => {
					return (
						<DndProvider backend={HTML5Backend}>
							<DefaultTabBar {...tabBarProps}>
								{/* {(node) => (
									<DraggableTabNode {...node.props} key={node.key}>
										{node}
									</DraggableTabNode>
								)} */}
								{(node) => {
									// TODO 没给index，我自己去判断顺序
									const targetIndex = tabsHistory.findIndex(
										(item) => {
											return item.pathname === node.key;
										},
									);
									return (
										<Card
											onEnd={() => {
												setDragId(undefined);
											}}
											index={targetIndex}
											id={node.key}
											{...node.props}
											key={node.key}
											moveCard={onDragEnd}
										>
											{node}
										</Card>
									);
								}}
							</DefaultTabBar>
						</DndProvider>
					);
				}}
			/>
		</>
	);
};

export default NavTabs;
