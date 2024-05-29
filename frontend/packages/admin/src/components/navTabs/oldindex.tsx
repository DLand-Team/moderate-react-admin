import {
	BlockOutlined,
	CloseCircleOutlined,
	DeleteRowOutlined,
	HeartOutlined,
	ReloadOutlined,
} from "@ant-design/icons";
import { Dropdown, MenuProps, Tabs } from "antd";
import { cloneDeep } from "lodash-es";
import { useMemo, useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useLocationListen from "src/common/hooks/useLocationListen";
import { ROUTE_ID } from "src/router/name";
import { ROUTE_ID_KEY } from "src/router/types";
import { useFlat } from "src/service";
import { AppHelper, RouterHelper } from "src/service/helper";
import Card from "./card";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext, PointerSensor, useSensor } from "@dnd-kit/core";
import {
	arrayMove,
	horizontalListSortingStrategy,
	SortableContext,
	useSortable,
} from "@dnd-kit/sortable";
const DraggableTabNode = ({ className, ...props }: DraggableTabPaneProps) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({
			id: props["data-node-key"],
		});

	const style: React.CSSProperties = {
		...props.style,
		transform: CSS.Translate.toString(transform),
		transition,
		cursor: "move",
	};

	return React.cloneElement(props.children as React.ReactElement, {
		ref: setNodeRef,
		style,
		...attributes,
		...listeners,
	});
};
const NavTabs = () => {
	const [_, setDragId] = useState<string>();
	const {
		setTabItems,
		setActiveTabKey,
		activeTabKey,
		tabItems,
		language,
		setRefreshKey,
	} = useFlat("appStore");
	const navi = useNavigate();
	const { t } = useTranslation();
	const winboxUrlRef = useRef<any>(null);
	const items: MenuProps["items"] = [
		{
			label: (
				<a
					onClick={(e) => {
						e.preventDefault();
					}}
				>
					Refesh
				</a>
			),
			key: "0",
			icon: <ReloadOutlined />,
		},
		{
			label: <a href="https://www.aliyun.com">Favourite</a>,
			key: "1",
			icon: <HeartOutlined />,
		},
		{
			label: <a href="https://www.aliyun.com">Float</a>,
			icon: <BlockOutlined />,
			key: "3",
		},
		{
			label: <a href="https://www.aliyun.com">Close Right</a>,
			icon: <DeleteRowOutlined />,
			key: "4",
		},
		{
			label: <a href="https://www.aliyun.com">Close Other</a>,
			icon: <CloseCircleOutlined />,
			key: "5",
		},
	];
	useLocationListen(
		(location) => {
			const tabItemsTemp = cloneDeep(tabItems).filter((item) => {
				return item;
			});
			if (
				!tabItems.some((item) => {
					return (
						item.location?.pathname.toLocaleLowerCase() ==
						location.pathname.toLocaleLowerCase()
					);
				}) &&
				![ROUTE_ID.NotFundPage, ROUTE_ID.LoadingPage].includes(
					RouterHelper.getRouteIdByPath(location.pathname),
				)
			) {
				const { pathname } = location;
				const id = pathname.split("/").slice(-1)[0];
				tabItemsTemp.push({
					location,
					label:
						RouterHelper.getRouteTitleByKey(id as ROUTE_ID_KEY) ||
						"",
					key: location.pathname,
				});
			}
			let temp = tabItemsTemp.map((item) => {
				if (item.label) {
					item.label = t(item.label);
				}
				return item;
			});
			setTabItems(temp);
			setActiveTabKey(location.pathname);
		},
		[language],
	);

	const onChange = (newActiveKey: string) => {
		setActiveTabKey(newActiveKey);
		navi(newActiveKey);
	};

	const onDragEnd = (dragIndex: number, hoverIndex: number) => {
		const tabsHistoryTemp = [...tabItems];
		const temp = tabsHistoryTemp[dragIndex];
		tabsHistoryTemp[dragIndex] = tabsHistoryTemp[hoverIndex];
		tabsHistoryTemp[hoverIndex] = temp;
		setTabItems(
			tabsHistoryTemp.filter((item) => {
				return item;
			}),
		);
	};
	return (
		<>
			<Tabs
				type="editable-card"
				onChange={onChange}
				items={tabItems.map((item) => {
					return {
						...item,
						key: item.key,
					};
				})}
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
								{(node) => {
									const targetIndex = tabItems.findIndex(
										(item) => {
											return item.key === node.key;
										},
									);
									
									return (
										<div
											style={{
												textAlign: "center",
											}}
										>
											<Card
												winboxUrlRef={winboxUrlRef}
												onEnd={() => {
													setDragId(undefined);
												}}
												index={targetIndex}
												id={node.key}
												data={tabItems[targetIndex]}
												{...node.props}
												key={node.key}
												moveCard={onDragEnd}
											>
												{node}
											</Card>
										</div>
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
