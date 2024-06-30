import {
	ColumnHeightOutlined,
	DeleteOutlined,
	PlusOutlined,
} from "@ant-design/icons";
import { Menu, Modal, Radio, Typography } from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import { cloneDeep } from "lodash-es";
import { useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useTranslation } from "react-i18next";
import { dpChain, useFlat } from "src/service";
import { itineraryItem } from "src/shapes/index.ts";
import "./index.scss";
import ItineraryItem from "./itineraryItem.tsx";
import { RuleItineraryItem } from "src/service/stores/ruleStore/model.ts";

export interface DragItem {
	rankId: number;
	itineraryId: string;
	itemData: any;
}
// targetRankId
const SliderMenu = (props: any) => {
	const { handleItDelete, handleOpenChange, branchName } = props;
	const { isDetail: isJustShow } = useFlat(["ruleStore", branchName], {
		isDetail: "IN",
	});
	const actionName = useRef(0);
	const handleItSwitch = (dragItem: DragItem, trgetItem: DragItem) => {
		Modal.confirm({
			title: "",
			content: (
				<Radio.Group
					defaultValue={actionName.current}
					onChange={(e) => {
						actionName.current = e.target.value;
					}}
				>
					{itByRankList[dragItem.rankId - 1].length !== 1 && (
						<Radio value={0}>{t("sortItem_move")}</Radio>
					)}
					<Radio value={1}>{t("sortItem_copy")}</Radio>
				</Radio.Group>
			),
			onOk: () => {
				let newItem = cloneDeep(dragItem.itemData);
				if (actionName.current !== 1) {
					deleteItineraryAct(newItem.uid);
				}
				newItem.rankId = trgetItem.rankId;
				delete newItem.id;
				delete newItem.uid;
				addItineraryAct(newItem);
			},
		});
	};
	const { t } = useTranslation("rule");
	const [isSort, setIsSort] = useState(false);
	const {
		setTargetRankId,
		setTargetItineraryId,
		itByRankList,
		targetRankId,
		targetItineraryId,
		addItineraryAct,
		deleteItineraryAct,
		deleteItineraryByRankAct,
	} = useFlat(["ruleStore", branchName]);

	const handleSwitchClick = () => {
		setIsSort(!isSort);
	};
	return (
		<div className="sliderMenu">
			{!isJustShow && (
				<div className="btn">
					<a
						onClick={() => {
							const newItem = itineraryItem();
							newItem.rankId = itByRankList.length + 1;
							dpChain(["ruleStore", branchName]).addItineraryAct(
								newItem,
							);
						}}
					>
						<PlusOutlined />
						<span className="btnLabel">
							{t("rulePage_add2") + t("rulePage_rank")}
						</span>
					</a>
				</div>
			)}

			<DndProvider backend={HTML5Backend}>
				<Menu
					selectedKeys={[`${targetRankId}-${targetItineraryId}`]}
					// openKeys={openKeysTemp}
					className="menuItem"
					mode="inline"
					onClick={({ key, keyPath }) => {
						setTargetRankId(Number(keyPath[keyPath.length - 1]));
						setTargetItineraryId(Number(key.split("-")[1]));
					}}
					onOpenChange={handleOpenChange}
				>
					{itByRankList.map(
						(itArr: RuleItineraryItem[], rankIndex: number) => {
							return (
								<SubMenu
									key={rankIndex}
									title={
										<span>
											<span>
												{t("rulePage_rank")}{" "}
												{rankIndex + 1}
											</span>
											{!isJustShow && !isSort && (
												<Typography.Link
													className="itemClose"
													onClick={(e) => {
														e.stopPropagation();
														deleteItineraryByRankAct(
															itArr[0].rankId,
														);
													}}
												>
													<DeleteOutlined></DeleteOutlined>
												</Typography.Link>
											)}
										</span>
									}
								>
									{!isJustShow && (
										<div className="btn">
											<a
												onClick={() => {
													const newItem =
														itineraryItem();
													newItem.rankId =
														rankIndex + 1;
													addItineraryAct(newItem);
												}}
											>
												<PlusOutlined />
												<span className="btnLabel">
													{t("rulePage_add2") +
														t("rulePage_itinerary")}
												</span>
											</a>
										</div>
									)}
									{/* if you won`t use DndProvider to wraper your component that has processed by useDrop or useDrap,you will never get the context........so try it! */}
									{itArr.map(
										(
											it: RuleItineraryItem,
											itIndex: any,
										) => {
											let params = {
												it,
												itIndex,
												isJustShow,
												handleItDelete,
												rankIndex,
											};
											return isSort ? (
												<ItineraryItem
													{...params}
													handleItSwitch={
														handleItSwitch
													}
													handleSwitchClick={
														handleSwitchClick
													}
													key={itIndex}
												></ItineraryItem>
											) : (
												<Menu.Item
													key={`${rankIndex}-${itIndex}`}
												>
													{t("rulePage_itinerary")}{" "}
													{itIndex + 1}{" "}
													{!isJustShow && (
														<DeleteOutlined
															className="itemClose"
															onClick={(e) => {
																e.stopPropagation();
																deleteItineraryAct(
																	it.uid,
																);
															}}
														/>
													)}
													{!isJustShow && (
														<ColumnHeightOutlined
															onClick={(e) => {
																e.stopPropagation();
																handleSwitchClick();
															}}
														/>
													)}
												</Menu.Item>
											);
										},
									)}
								</SubMenu>
							);
						},
					)}
				</Menu>
			</DndProvider>
		</div>
	);
};

export default SliderMenu;
